import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
// Google Meet link shown in booking emails (can be overridden via .env)
const MEET_LINK = process.env.MEET_LINK || 'https://meet.google.com/ovj-ouuv-ufh';
// "Watch this first" prep video (can be overridden via .env)
const PREP_VIDEO_LINK = process.env.PREP_VIDEO_LINK || 'https://drive.google.com/file/d/1UR0QWSS2rak9RUouboA6nyECjgX1_aal/view?usp=drivesdk';
/**
 * Formats qualification answers into readable labels
 */
function getOfferLabel(val) {
  if (val === 'yes') return 'Yes — validated high-ticket offer';
  if (val === 'refining') return 'Testing or refining offer / messaging';
  return 'Not yet — starting from scratch';
}

function getSystemLabel(val) {
  if (val === 'ads') return 'Running paid ads';
  if (val === 'organic') return 'Organic content & social';
  return 'Network, referrals & word-of-mouth';
}

function getGoalLabel(val) {
  if (val === 'leads') return 'Direct Leads & Revenue Growth';
  if (val === 'authority') return 'Authority & Brand Stature';
  return 'Followers & FYP Algorithmic Reach';
}

/**
 * Generates the HTML template for the Admin Notification email
 */
function createAdminEmailHtml({ userName, userEmail, userHandle, dateStr, timeSlot, hasOffer, leadSystem, contentGoal }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Strategy Call Booked</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0d; color: #f5f5f7; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #161618; border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.12); overflow: hidden; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5); }
    .header { background: linear-gradient(135deg, #0071e3 0%, #1d1d1f 100%); padding: 32px 28px; text-align: left; }
    .eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255, 255, 255, 0.85); margin-bottom: 6px; }
    .title { font-size: 24px; font-weight: 700; color: #ffffff; margin: 0; }
    .content { padding: 28px; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #86868b; margin: 20px 0 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 6px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-size: 14px; }
    .label { color: #a1a1a6; font-weight: 500; }
    .value { color: #f5f5f7; font-weight: 600; text-align: right; }
    .value-highlight { color: #2997ff; font-weight: 700; }
    .card-box { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; margin: 12px 0; }
    .btn { display: inline-block; background: #0071e3; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 980px; margin-top: 20px; }
    .footer { padding: 20px 28px; background: #111113; text-align: center; font-size: 12px; color: #86868b; border-top: 1px solid rgba(255, 255, 255, 0.08); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="eyebrow">CHIZZY VFX • STRATEGY CALL INBOUND</div>
      <h1 class="title">New Call Booked with ${userName}</h1>
    </div>
    <div class="content">
      <div class="card-box">
        <div style="font-size: 12px; color: #86868b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 4px;">Scheduled Session</div>
        <div style="font-size: 18px; font-weight: 700; color: #ffffff;">${dateStr}</div>
        <div style="font-size: 15px; color: #2997ff; font-weight: 600; margin-top: 2px;">${timeSlot} (WAT / GMT+1)</div>
        <div style="font-size: 13px; color: #a1a1a6; margin-top: 10px;">Meet: <a href="${MEET_LINK}" style="color: #2997ff; text-decoration: none;">${MEET_LINK.replace('https://', '')}</a></div>
      </div>

      <div class="section-title">Lead Information</div>
      <div class="row">
        <span class="label">Full Name</span>
        <span class="value">${userName}</span>
      </div>
      <div class="row">
        <span class="label">Work Email</span>
        <span class="value"><a href="mailto:${userEmail}" style="color: #2997ff; text-decoration: none;">${userEmail}</a></span>
      </div>
      <div class="row">
        <span class="label">Website / Social</span>
        <span class="value">${userHandle ? `<a href="${userHandle.startsWith('http') ? userHandle : `https://${userHandle}`}" target="_blank" style="color: #2997ff;">${userHandle}</a>` : 'Not provided'}</span>
      </div>

      <div class="section-title">Qualification Profile</div>
      <div class="row">
        <span class="label">Validated Offer</span>
        <span class="value">${getOfferLabel(hasOffer)}</span>
      </div>
      <div class="row">
        <span class="label">Lead Gen System</span>
        <span class="value">${getSystemLabel(leadSystem)}</span>
      </div>
      <div class="row">
        <span class="label">Primary Goal</span>
        <span class="value value-highlight">${getGoalLabel(contentGoal)}</span>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${userEmail}?subject=Re:%20Strategy%20Session%20with%20Chizzy" class="btn">Reply Directly to ${userName}</a>
      </div>
    </div>
    <div class="footer">
      Automated booking notification powered by Resend & Chizzy VFX Landing Engine.
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generates the HTML template for the Client Thank You email
 */
function createClientEmailHtml({ userName, dateStr, timeSlot, contentGoal }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Strategy Session is Confirmed</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; color: #1d1d1f; margin: 0; padding: 24px; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid rgba(0, 0, 0, 0.08); overflow: hidden; box-shadow: 0 10px 36px rgba(0, 0, 0, 0.06); }
    .header { background: #000000; padding: 36px 32px; text-align: left; }
    .brand { font-size: 13px; font-weight: 700; letter-spacing: 0.12em; color: #2997ff; text-transform: uppercase; margin-bottom: 8px; }
    .title { font-size: 26px; font-weight: 700; color: #ffffff; margin: 0; line-height: 1.25; }
    .content { padding: 32px; }
    .salutation { font-size: 16px; font-weight: 600; color: #1d1d1f; margin-bottom: 12px; }
    .intro { font-size: 15px; line-height: 1.6; color: #515154; margin-bottom: 24px; }
    .booking-card { background: #fbfbfd; border: 1px solid #e5e5ea; border-radius: 14px; padding: 20px; margin: 20px 0; }
    .booking-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f2; font-size: 14px; }
    .booking-row:last-child { border-bottom: none; }
    .b-label { color: #86868b; font-weight: 500; }
    .b-val { color: #1d1d1f; font-weight: 600; }
    .agenda-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #1d1d1f; margin: 24px 0 12px 0; }
    .agenda-item { display: flex; gap: 12px; margin-bottom: 12px; font-size: 14px; line-height: 1.5; color: #424245; }
    .agenda-num { background: #0071e3; color: #ffffff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
    .meet-card { background: rgba(0, 113, 227, 0.06); border: 1px solid rgba(0, 113, 227, 0.2); border-radius: 14px; padding: 22px 20px; margin: 20px 0; text-align: center; }
    .meet-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0071e3; margin-bottom: 6px; }
    .meet-text { font-size: 14px; line-height: 1.5; color: #515154; margin: 0 0 16px 0; }
    .meet-url { font-size: 12px; color: #86868b; margin-top: 12px; word-break: break-all; }
    @media (max-width: 480px) {
      body { padding: 12px; }
      .content { padding: 24px 20px; }
      .meet-btn { display: block !important; }
    }
    .prep-card { background: #000000; border-radius: 14px; padding: 24px 22px; margin: 20px 0; text-align: center; }
    .prep-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #2997ff; margin-bottom: 8px; }
    .prep-title { font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; line-height: 1.3; }
    .prep-text { font-size: 14px; line-height: 1.6; color: #a1a1a6; margin: 0 0 18px 0; }
    @media (max-width: 480px) {
      .prep-card { padding: 22px 16px; }
      .prep-btn { display: block !important; }
    }  
    .note-box { background: rgba(0, 113, 227, 0.06); border-left: 3px solid #0071e3; border-radius: 6px; padding: 12px 16px; margin: 24px 0 16px 0; font-size: 13px; color: #1d1d1f; line-height: 1.5; }
    .footer { padding: 24px 32px; background: #fbfbfd; text-align: center; font-size: 12px; color: #86868b; border-top: 1px solid #e5e5ea; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">Chizzy VFX</div>
      <h1 class="title">You're Confirmed, ${userName}</h1>
    </div>
    <div class="content">
      <div class="salutation">Hi ${userName},</div>
      <p class="intro">
        Thank you for booking a session with us. Your 20-minute content strategy call with Chizzy is officially confirmed on our calendar.
      </p>

      <div class="booking-card">
        <div class="booking-row">
          <span class="b-label">Date</span>
          <span class="b-val"> ${dateStr}</span>
        </div>
        <div class="booking-row">
          <span class="b-label">Time</span>
          <span class="b-val">: ${timeSlot} (WAT / GMT+1)</span>
        </div>
        <div class="booking-row">
          <span class="b-label">Platform</span>
          <span class="b-val"><a href="${MEET_LINK}" style="color: #0071e3; text-decoration: none;">Google Meet</a></span>
        </div>
        <div class="booking-row">
          <span class="b-label">Session Focus</span>
          <span class="b-val">${getGoalLabel(contentGoal)}</span>
        </div>
      </div>
      <div class="meet-card">
        <div class="meet-eyebrow">Your Meeting Link</div>
        <p class="meet-text">Click the button below at your scheduled time to join the call.</p>
        <a href="${MEET_LINK}" target="_blank" class="meet-btn" style="display: inline-block; background: #0071e3; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; padding: 13px 28px; border-radius: 980px; text-align: center;">Join Google Meet</a>
        <div class="meet-url">${MEET_LINK.replace('https://', '')}</div>
      </div>
      <div class="prep-card">
        <div class="prep-eyebrow">Watch This First • 90 seconds</div>
        <h3 class="prep-title">See how the call will go</h3>
        <p class="prep-text">Before we meet, watch this 90-second video on how the call will go. It helps us use the time well.</p>
        <a href="${PREP_VIDEO_LINK}" target="_blank" class="prep-btn" style="display: inline-block; background: #ffffff; color: #000000; text-decoration: none; font-weight: 600; font-size: 15px; padding: 13px 28px; border-radius: 980px; text-align: center;">&#9654;&nbsp; Watch the video</a>
      </div>
      <div class="agenda-title">What We'll Cover on the Call</div>
      <div class="agenda-item">
        <div class="agenda-num">1</div>
        <div><strong>Content Diagnostics:</strong> Reviewing your current video pipeline and identifying retention & distribution bottlenecks.</div>
      </div>
      <div class="agenda-item">
        <div class="agenda-num">2</div>
        <div><strong>The Omni-Channel Engine:</strong> How we turn 1 single recording into long-form YouTube authority, FYP algorithmic reels, and high-save carousel graphics.</div>
      </div>
      <div class="agenda-item">
        <div class="agenda-num">3</div>
        <div><strong>Economic Feasibility & Roadmap:</strong> Exact timelines and pricing for a turnkey content system that delivers qualified leads.</div>
      </div>

      <div class="note-box">
        <strong>Calendar Invite:</strong> A Google Meet calendar invitation has been generated for your scheduled slot. If you need to reschedule or have prior notes, simply reply directly to this email.
      </div>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} Chizzy VFX. High-performance video & content distribution engines.
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Main handler for processing booking submission and sending emails via Resend
 */
export async function handleBooking(payload) {
  const {
    userName,
    userEmail,
    userHandle = '',
    selectedDate,
    selectedTimeSlot,
    hasOffer = 'yes',
    leadSystem = 'ads',
    contentGoal = 'leads'
  } = payload || {};

  // Basic validation
  if (!userName || !userName.trim()) {
    throw new Error('Full Name is required.');
  }
  if (!userEmail || !userEmail.trim()) {
    throw new Error('Work Email is required.');
  }
  if (!selectedTimeSlot) {
    throw new Error('Time slot is required.');
  }

  // Format date display
  const parsedDate = selectedDate ? new Date(selectedDate) : new Date();
  const dateStr = parsedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || 'chizzyvfx@gmail.com';
  const senderEmail = process.env.SENDER_EMAIL || 'Chizzy VFX <onboarding@resend.dev>';

  // Check if Resend API key is configured
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_api_key')) {
    console.warn('\n[Resend Notice] No RESEND_API_KEY found in .env. Mocking email delivery.');
    console.log(`[Mock Admin Email] To: ${ownerEmail} | Subject: New Strategy Call: ${userName} (${dateStr} @ ${selectedTimeSlot})`);
    console.log(`[Mock Client Email] To: ${userEmail} | Subject: Confirmed: Strategy Session with Chizzy (${dateStr} @ ${selectedTimeSlot})\n`);

    return {
      success: true,
      mock: true,
      message: 'Booking recorded in mock mode. Add RESEND_API_KEY to .env to send real emails.',
      lead: { userName, userEmail, dateStr, selectedTimeSlot }
    };
  }

  const resend = new Resend(apiKey.trim());

  // Prepare both emails
  const adminHtml = createAdminEmailHtml({
    userName: userName.trim(),
    userEmail: userEmail.trim(),
    userHandle: userHandle.trim(),
    dateStr,
    timeSlot: selectedTimeSlot,
    hasOffer,
    leadSystem,
    contentGoal
  });

  const clientHtml = createClientEmailHtml({
    userName: userName.trim(),
    dateStr,
    timeSlot: selectedTimeSlot,
    contentGoal
  });

  // Send admin notification and client thank-you
  let adminRes = null;
  let clientRes = null;

  try {
    adminRes = await resend.emails.send({
      from: senderEmail,
      to: ownerEmail,
      subject: ` New Strategy Call Booked: ${userName} (${dateStr} @ ${selectedTimeSlot} WAT)`,
      html: adminHtml,
      replyTo: userEmail.trim()
    });
    console.log('[Resend Admin Email]:', adminRes);
  } catch (err) {
    console.error('[Resend Admin Email Error]:', err);
    adminRes = { error: { message: err.message } };
  }

  try {
    clientRes = await resend.emails.send({
      from: senderEmail,
      to: userEmail.trim(),
      subject: `Confirmed: Your Strategy Session with Chizzy (${dateStr} @ ${selectedTimeSlot})`,
      html: clientHtml
    });
    console.log('[Resend Client Email]:', clientRes);
  } catch (err) {
    console.error('[Resend Client Email Error]:', err);
    clientRes = { error: { message: err.message } };
  }

  const adminError = adminRes?.error;
  const clientError = clientRes?.error;

  if (adminError && clientError) {
    throw new Error(`Failed to send emails via Resend: ${adminError.message || clientError.message}`);
  }

  return {
    success: true,
    adminEmailSent: !adminError,
    clientEmailSent: !clientError,
    adminId: adminRes?.data?.id,
    clientId: clientRes?.data?.id,
    warning: clientError ? clientError.message : null
  };
}

/**
 * Default export for Vercel / serverless runtime
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON payload' });
      }
    }

    const result = await handleBooking(body);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in /api/book-call handler:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process booking'
    });
  }
}
