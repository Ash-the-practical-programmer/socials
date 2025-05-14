import MailerLite from '@mailerlite/mailerlite-nodejs';
// api/subscribe-mailerlite.js

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

  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
  });

  try {
    // Check if subscriber exists. The SDK doesn't have a direct "add to group if exists"
    // We might try to add directly, or check first.
    // Let's try adding/updating directly to the group.
    // The `createOrUpdateSubscriber` method is more robust.
    // However, the MailerLite SDK seems to focus on `subscribers.createOrUpdate` for general subscriber data
    // and then `groups.assignSubscriber` for adding to a group.

    // Option 1: Create/Update subscriber, then add to group (more explicit)
    let subscriber;
    try {
        const response = await mailerlite.subscribers.createOrUpdate({
            email: email,
            // fields: { name: 'Optional Name' }, // Add custom fields if needed
            status: 'active' // 'active' or 'unconfirmed'
        });
        subscriber = response.data.data; // SDK wraps responses
    } catch (error) {
        // Handle cases where the subscriber might already exist but couldn't be updated for some reason
        // or other API errors during create/update.
        if (error.response && error.response.data && error.response.data.message) {
            // Check if it's an "email has already been taken" but couldn't be updated,
            // or if the SDK handles this by trying to fetch the existing one.
            // For simplicity, if createOrUpdate fails with specific error, we might assume it exists.
             if (error.response.status === 422 && error.response.data.message.toLowerCase().includes("email has already been taken")) {
                 // If "taken", try to find the subscriber to get their ID
                 try {
                     const existingSubscriberResponse = await mailerlite.subscribers.find(email);
                     subscriber = existingSubscriberResponse.data.data;
                 } catch (findError) {
                    console.error('MailerLite SDK: Error finding existing subscriber after create/update failed:', findError.response ? findError.response.data : findError.message);
                    throw new Error(error.response.data.message || 'Could not process existing subscriber.');
                 }
             } else {
                console.error('MailerLite SDK: Error creating/updating subscriber:', error.response ? error.response.data : error.message);
                const errorMessage = (error.response && error.response.data && error.response.data.message) ? error.response.data.message : 'Failed to add or update subscriber.';
                return res.status(error.response ? error.response.status : 500).json({ error: errorMessage });
             }
        } else {
            console.error('MailerLite SDK: Unknown error creating/updating subscriber:', error.message);
            return res.status(500).json({ error: 'Failed to add or update subscriber due to an unknown error.' });
        }
    }

    if (!subscriber || !subscriber.id) {
        return res.status(500).json({ error: 'Could not retrieve subscriber ID.' });
    }

    // Now add the subscriber to the specified group
    await mailerlite.groups.assignSubscriber(MAILERLITE_GROUP_ID, subscriber.id);

    return res.status(200).json({ // 200 as the assign operation doesn't return content typically
      message: 'Successfully subscribed and added to the group!',
      subscriber: subscriber
    });

  } catch (error) {
    console.error('MailerLite SDK Error:', error.response ? error.response.data : error.message);
    let errorMessage = 'Could not subscribe. Please try again.';
    let statusCode = 500;

    if (error.response && error.response.data) {
        const errors = error.response.data.errors;
        if (errors && typeof errors === 'object' && Object.keys(errors).length > 0) {
            // Get the first error message from the errors object
            const firstErrorField = Object.keys(errors)[0];
            errorMessage = errors[firstErrorField][0] || error.response.data.message || errorMessage;
        } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        statusCode = error.response.status || 500;
    } else if (error.message) {
        errorMessage = error.message;
    }
    
    // Specific check for "subscriber already in group" - SDK might throw an error or MailerLite API might.
    // The `assignSubscriber` often doesn't error if already assigned but just returns success.
    // If it does error specifically for this, you could catch it.
    // e.g. if (errorMessage.includes("already a member of this group")) {
    //    return res.status(200).json({ message: "You are already in the waitlist group." });
    // }


    return res.status(statusCode).json({ error: errorMessage });
  }
}