import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Lead notification email sent to the website owner
 */
function createLeadNotificationEmailHtml({ name, email, phone, submittedAt }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Blueprint Opt-In Lead</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f7; color: #1d1d1f; margin: 0; padding: 32px 16px; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid rgba(0, 0, 0, 0.08); overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); }
    .header { padding: 32px; background: #000000; color: #ffffff; }
    .pill { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #2997ff; background: rgba(41, 151, 255, 0.15); padding: 4px 12px; border-radius: 980px; margin-bottom: 10px; }
    .title { font-size: 22px; font-weight: 700; margin: 0; letter-spacing: -0.02em; }
    .body { padding: 32px; }
    .detail-card { background: #fbfbfd; border: 1px solid #e5e5ea; border-radius: 14px; padding: 18px 20px; margin-bottom: 20px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f2; font-size: 14px; }
    .row:last-child { border-bottom: none; }
    .label { color: #86868b; font-weight: 500; }
    .val { color: #1d1d1f; font-weight: 600; text-align: right; word-break: break-all; }
    .val a { color: #0071e3; text-decoration: none; }
    .cta { display: inline-block; background: #0071e3; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 980px; margin-top: 10px; }
    .footer { padding: 20px 32px; background: #fbfbfd; text-align: center; font-size: 12px; color: #86868b; border-top: 1px solid #e5e5ea; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="pill">New Lead</span>
      <h1 class="title">Content Blueprint Opt-In</h1>
    </div>
    <div class="body">
      <p style="margin-top: 0; font-size: 15px; color: #515154;">Someone just opted in to access your <strong>300 pieces of content per month</strong> blueprint video:</p>
      <div class="detail-card">
        <div class="row">
          <span class="label">Name:</span>
          <span class="val">${name || 'Not provided'}</span>
        </div>
        <div class="row">
          <span class="label">Email:</span>
          <span class="val"><a href="mailto:${email}">${email}</a></span>
        </div>
        <div class="row">
          <span class="label">Phone:</span>
          <span class="val"><a href="tel:${phone}">${phone}</a></span>
        </div>
        <div class="row">
          <span class="label">Time:</span>
          <span class="val">${submittedAt}</span>
        </div>
      </div>
      <a href="mailto:${email}?subject=Your%20Content%20Blueprint%20Access" class="cta">Reply to Lead</a>
    </div>
    <div class="footer">
      Chizzy VFX Lead Engine &bull; Automatic Opt-in Alert
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Handle opt-in submission
 */
export async function handleOptin(body) {
  const { name, email, phone } = body || {};

  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  if (!phone || phone.trim().length < 6) {
    throw new Error('Please enter a valid phone number.');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || 'ifeanyichukwu892@gmail.com';
  const senderEmail = process.env.SENDER_EMAIL || 'Chizzy VFX <onboarding@resend.dev>';

  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'medium',
    timeStyle: 'short',
  }) + ' UTC';

  if (!apiKey || apiKey === 'your_api_key_here') {
    console.log('[MOCK OPTIN] Received lead:', { name, email, phone, submittedAt });
    return { success: true, mock: true, lead: { name, email, phone } };
  }

  const resend = new Resend(apiKey);

  try {
    const adminNotificationHtml = createLeadNotificationEmailHtml({
      name: name ? name.trim() : 'Anonymous Lead',
      email: email.trim(),
      phone: phone.trim(),
      submittedAt,
    });

    const adminResult = await resend.emails.send({
      from: senderEmail,
      to: [ownerEmail],
      subject: `🎯 New Blueprint Lead: ${name ? name.trim() : email.trim()} (${phone.trim()})`,
      html: adminNotificationHtml,
      replyTo: email.trim(),
    });

    return {
      success: true,
      leadNotified: true,
      adminEmailId: adminResult?.data?.id || null,
      lead: { name, email, phone }
    };
  } catch (err) {
    console.error('Error delivering opt-in email with Resend:', err);
    // Don't block the user's redirect flow if Resend has a sandbox limitation
    return {
      success: true,
      delivered: false,
      warning: err.message,
      lead: { name, email, phone }
    };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const result = await handleOptin(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Opt-in API Handler Error:', error);
    res.status(400).json({ error: error.message || 'Something went wrong.' });
  }
}
