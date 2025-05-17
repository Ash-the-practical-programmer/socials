import nodemailer from 'nodemailer';

const EMAIL = 'socialresearcherai@gmail.com';
const APP_PASSWORD = 'ylye mrmk hpst sbdq';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL, pass: APP_PASSWORD },
});

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxleXwfm6iywt2fHRjCIT-3M8l5eKOjwEy7zCvbR7DXqoJdNudFdStgrsy0of9gwKMC-A/exec';

export default async function handler(req, res) {
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

  // ✅ Save emails to Google Sheet via Apps Script
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ emails }),
  });

  const text = await response.text();

  let sheetResult;
  try {
    sheetResult = JSON.parse(text);
  } catch {
    console.warn('Non-JSON response from Google Apps Script:', text);
    sheetResult = { status: 'unknown', raw: text };
  }

  return res.status(200).json({
    status: 'emails processed',
    results,
    sheetResult,
  });
}
