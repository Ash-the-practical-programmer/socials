// api/subscribe-mailerlite.js
const fetch = require('node-fetch'); // Or use native fetch if Node.js v18+ on Vercel

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const MAILERLITE_API_KEY = process.env.VITE_MAILERLITE_API_KEY;
  const MAILERLITE_GROUP_ID = process.env.VITE_MAILERLITE_GROUP_ID;

  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    console.error('MailerLite environment variables not set.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  // MailerLite API v2 endpoint
  const endpoint = 'https://connect.mailerlite.com/api/subscribers';

  try {
    const mailerliteResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        groups: [MAILERLITE_GROUP_ID],
        status: 'active', // Use 'active' for direct subscription.
                           // Use 'unconfirmed' if you have double opt-in enabled at the account/group level in MailerLite.
        // You can add custom fields here if needed:
        // fields: {
        //   name: 'FirstName', // Make sure 'name' is a defined custom field in MailerLite
        // }
      }),
    });

    const data = await mailerliteResponse.json();

    if (!mailerliteResponse.ok) {
      console.error('MailerLite API Error:', data);
      let errorMessage = 'Could not subscribe. Please try again.';

      // Handle common MailerLite errors (check their API docs for specifics)
      if (data && data.errors) {
        // Example: Check if email is already subscribed (might manifest differently)
        // Often, if an email exists, MailerLite will update it (e.g., add to group) and return a 200 or 201.
        // So, a non-ok response is likely a more significant issue.
        const firstErrorKey = Object.keys(data.errors)[0];
        if (firstErrorKey && data.errors[firstErrorKey] && data.errors[firstErrorKey][0]) {
            errorMessage = data.errors[firstErrorKey][0];
        } else if (data.message) {
            errorMessage = data.message;
        }
      } else if (data && data.message) {
        errorMessage = data.message;
      }

      // If subscriber already exists and is active in the group, MailerLite might return 200 OK with the subscriber data,
      // or it might have specific error codes for certain conditions.
      // The `POST /api/subscribers` endpoint generally creates or updates.
      // If the user is already subscribed and active, it should just add them to the group if not already in it.
      // A 422 error usually means validation issues.
      if (mailerliteResponse.status === 422 && data.message && data.message.toLowerCase().includes("email has already been taken")) {
         // This specific error message might indicate the email exists globally but not necessarily in your desired state.
         // However, for a simple waitlist, if it's "taken", assume they're on some list.
         return res.status(200).json({ message: "You're already on our list or your email is in use!" });
      }


      return res.status(mailerliteResponse.status).json({ error: errorMessage });
    }

    // Success
    return res.status(mailerliteResponse.status === 201 ? 201 : 200).json({ // 201 for new, 200 for update
      message: 'Successfully subscribed! Keep an eye on your inbox.',
      subscriber: data.data // MailerLite often wraps successful response in a `data` object
    });

  } catch (error) {
    console.error('Subscription function error:', error);
    return res.status(500).json({ error: 'An unexpected error occurred on our end.' });
  }
}