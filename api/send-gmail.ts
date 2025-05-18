// Assuming this file is api/send-gmail.ts or similar

import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next'; // For Vercel functions (Next.js API routes style)
// If not using Next.js API routes structure, you might need types from 'http' or a Vercel-specific package if available.
// For a generic Vercel function (not Next.js), the req/res types are simpler.
// Let's assume a generic Vercel function structure for now, but NextApiRequest/Response are common.
// If it's a pure Vercel Serverless Function not tied to Next.js, `req` and `res` are closer to Node's http.IncomingMessage and http.ServerResponse.
// For simplicity and broad Vercel compatibility, let's use basic types and you can refine if needed.

// --- SECURITY WARNING: Store these in Environment Variables! ---
// const EMAIL: string = process.env.GMAIL_EMAIL || 'socialresearcherai@gmail.com';
// const APP_PASSWORD: string = process.env.GMAIL_APP_PASSWORD || 'ylye mrmk hpst sbdq';
// For now, using your hardcoded values as per the original script for direct conversion:
const EMAIL: string = 'socialresearcherai@gmail.com';
const APP_PASSWORD: string = 'ylye mrmk hpst sbdq';
// --- END SECURITY WARNING ---

// Type for Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL, pass: APP_PASSWORD },
});

// Type for Google Script URL
const GOOGLE_SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbxleXwfm6iywt2fHRjCIT-3M8l5eKOjwEy7zCvbR7DXqoJdNudFdStgrsy0of9gwKMC-A/exec';

// Define interfaces for request body and response data
interface RequestBody {
  emails?: string; // emails is a comma-separated string
}

interface EmailResult {
  email: string;
  status: 'success' | 'error';
  message?: string; // Only if status is 'error'
}

interface GoogleSheetResult {
  status: string; // e.g., 'success', 'error', or 'unknown'
  message?: string;
  data?: any; // Or more specific if you know the structure
  raw?: string; // For non-JSON responses
}

interface ResponseData {
  status?: string;
  error?: string;
  results?: EmailResult[];
  sheetResult?: GoogleSheetResult;
}

// Vercel Serverless Function handler signature
// Adjust req/res types if you have more specific ones for your Vercel setup (e.g., from @vercel/node)
export default async function handler(
  req: NextApiRequest, // Or import type { VercelRequest } from '@vercel/node';
  res: NextApiResponse<ResponseData> // Or import type { VercelResponse } from '@vercel/node';
): Promise<void> {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Be more specific in production if possible
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { emails } = req.body as RequestBody;

  if (!emails || typeof emails !== 'string') {
    res.status(400).json({ error: 'Please provide a valid email string.' });
    return;
  }

  const emailList: string[] = emails
    .split(',')
    .map((e: string) => e.trim())
    .filter((e: string) => /^\S+@\S+\.\S+$/.test(e));

  if (emailList.length === 0) {
    res.status(400).json({ error: 'No valid email addresses provided.' });
    return;
  }

  const results: EmailResult[] = [];

  for (const email of emailList) {
    const mailOptions: nodemailer.SendMailOptions = { // Type for mailOptions
      from: `"DeepSocial AI Waitlist!" <${EMAIL}>`, // Recommended to set a name for the sender
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
    } catch (error: any) { // Catch error as 'any' then access message
      console.error(`Failed to send email to ${email}:`, error);
      results.push({ email, status: 'error', message: error?.message || 'Unknown error sending email' });
    }
  }

  // Save emails to Google Sheet via Apps Script
  let sheetResult: GoogleSheetResult;
  try {
    const googleSheetResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', // Good practice to include Accept
      },
      body: JSON.stringify({ emails }), // Sending the original comma-separated string
    });

    const responseText: string = await googleSheetResponse.text();

    if (!googleSheetResponse.ok) {
        console.warn(`Google Apps Script responded with status ${googleSheetResponse.status}:`, responseText);
        // Try to parse JSON even on error, as Apps Script might return JSON errors
        try {
            const errorData = JSON.parse(responseText);
            sheetResult = { status: 'error', message: errorData.error || errorData.message || 'Google Sheet update failed', raw: responseText };
        } catch {
            sheetResult = { status: 'error', message: 'Google Sheet update failed and returned non-JSON error', raw: responseText };
        }
    } else {
        try {
            sheetResult = JSON.parse(responseText) as GoogleSheetResult; // Assume success response is JSON
            if (!sheetResult.status) sheetResult.status = 'success'; // Default status if not provided
        } catch (e) {
            console.warn('Non-JSON success response from Google Apps Script:', responseText);
            sheetResult = { status: 'success_unknown_format', raw: responseText };
        }
    }

  } catch (error: any) {
    console.error('Error communicating with Google Apps Script:', error);
    sheetResult = { status: 'error', message: error?.message || 'Failed to connect to Google Sheet' };
  }

  res.status(200).json({
    status: 'emails processed',
    results,
    sheetResult,
  });
}