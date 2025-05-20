import nodemailer from 'nodemailer';

const EMAIL = 'socialresearcherai@gmail.com';
const APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL, pass: APP_PASSWORD },
});

// const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL; // Moved into handler
// console.log('[send-gmail.js] GOOGLE_SCRIPT_URL at module level:', GOOGLE_SCRIPT_URL, typeof GOOGLE_SCRIPT_URL); // Debug log

export default async function handler(req, res) {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL; // Read fresh from env
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { emails } = req.body;

  if (!emails || typeof emails !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid email string.' });
  }

  const emailList = emails
    .split(',')
    .map(e => e.trim())
    .filter(e => /^\S+@\S+\.\S+$/.test(e));

  if (emailList.length === 0) {
    return res.status(400).json({ error: 'No valid email addresses provided.' });
  }

  const results = [];

  for (const email of emailList) {
    const mailOptions = {
      from: "DeepSocial AI Waitlist!",
      to: email,
      subject: 'You’re on the list ✅',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #121212; color: #fff; padding: 20px; border-radius: 10px;">
          <h2 style="color: #00ff99;">🎉 You're on the list!</h2>
          <p>Thanks for signing up. We'll reach out as soon as we're live.</p>
          <hr style="border: 0; height: 1px; background: #444;" />
          <p style="font-size: 0.9em;">If you didn’t request this, you can safely ignore this email.</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      results.push({ email, status: 'success' });
    } catch (error) {
      results.push({ email, status: 'error', message: error.message });
    }
  }

  // Default sheet result in case of early exit or unhandled error
  let sheetResult = { status: 'unknown', message: 'Sheet processing did not complete.' };
  let finalStatus = 200; // Assume success initially
  let overallStatusMessage = 'emails processed';

  try {
    // ✅ Save emails to Google Sheet via Apps Script
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === "undefined") { // Check the handler-scoped variable
      // This console.error is useful for server logs, not typically asserted in tests unless behavior changes
      console.error('Google Apps Script URL is not defined or is the string "undefined". Skipping sheet save.');
      sheetResult = { status: 'error', message: 'Configuration error: Google Apps Script URL missing.' };
    } else {
      const scriptResponse = await fetch(GOOGLE_SCRIPT_URL, { // Use the handler-scoped variable
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ emails }), // `emails` is the string of comma-separated emails
      });

      if (!scriptResponse.ok) {
        const errorText = await scriptResponse.text();
        // This console.error is useful for server logs
        console.error(`Google Apps Script request failed with status ${scriptResponse.status}: ${errorText}`);
        sheetResult = { status: 'error', message: `Google Apps Script request failed: ${scriptResponse.status} - ${errorText}` };
      } else {
        const text = await scriptResponse.text();
        try {
          const parsedResponse = JSON.parse(text);
          sheetResult = parsedResponse;
          if (parsedResponse.status !== 'success') {
            // This console.warn is useful for server logs
            console.warn('Google Apps Script reported an error or unexpected status:', parsedResponse);
          }
        } catch (e) {
          // This console.warn is useful for server logs
          console.warn('Non-JSON response from Google Apps Script:', text);
          sheetResult = { status: 'error', message: 'Non-JSON response from Google Apps Script.', raw: text };
        }
      }
    }
  } catch (error) {
    // This console.error is useful for server logs
    console.error('Error during fetch to Google Apps Script:', error);
    sheetResult = { status: 'error', message: `Network error or issue fetching from Google Apps Script: ${error.message}` };
  }

  const anyEmailFailed = results.some(r => r.status === 'error');
  const sheetSaveFailed = sheetResult.status !== 'success';

  if (sheetSaveFailed) {
    finalStatus = 500;
    if (anyEmailFailed) {
      overallStatusMessage = 'Some emails failed to send, and a critical issue occurred with Google Sheet operation.';
    } else {
      overallStatusMessage = 'Emails sent successfully, but a critical issue occurred with Google Sheet operation.';
    }
  } else if (anyEmailFailed) {
    finalStatus = 500;
    overallStatusMessage = 'Some emails failed to send. Google Sheet operation was successful.';
  } else {
    overallStatusMessage = 'Emails processed and Google Sheet updated successfully.';
  }

  return res.status(finalStatus).json({
    status: overallStatusMessage,
    emailResults: results,
    googleSheetResult: sheetResult,
  });
}
