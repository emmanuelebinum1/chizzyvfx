import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Strategy Call Booked</title>
  <style>
    :root { color-scheme: dark light; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000000; color: #f5f5f7; margin: 0; padding: 32px 16px; -webkit-font-smoothing: antialiased; }
    .container { max-width: 580px; margin: 0 auto; background: #161618; border-radius: 22px; border: 1px solid rgba(255, 255, 255, 0.12); overflow: hidden; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6); }
    .header { padding: 36px 32px 28px; background: linear-gradient(180deg, #1c1c1e 0%, #161618 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
    .badge-wrap { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
    .pill { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 12px; border-radius: 980px; }
    .pill-brand { background: rgba(0, 113, 227, 0.2); color: #2997ff; border: 1px solid rgba(0, 113, 227, 0.35); }
    .pill-status { background: rgba(48, 209, 88, 0.15); color: #30d158; border: 1px solid rgba(48, 209, 88, 0.3); }
    .title { font-size: 26px; font-weight: 700; color: #ffffff; margin: 0; letter-spacing: -0.02em; line-height: 1.2; }
    .subtitle { font-size: 14px; color: #86868b; margin: 6px 0 0; }
    .content { padding: 32px; }
    .bento-card { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 22px; margin-bottom: 24px; }
    .bento-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #86868b; margin-bottom: 6px; }
    .bento-date { font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em; }
    .bento-time { font-size: 15px; font-weight: 600; color: #2997ff; margin-top: 4px; }
    .section-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #86868b; margin: 24px 0 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding-bottom: 6px; }
    .detail-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.04); font-size: 14px; }
    .detail-row:last-child { border-bottom: none; }
    .d-label { color: #a1a1a6; font-weight: 500; }
    .d-val { color: #f5f5f7; font-weight: 600; text-align: right; }
    .d-val a { color: #2997ff; text-decoration: none; }
    .d-val a:hover { text-decoration: underline; }
    .highlight-pill { background: rgba(0, 113, 227, 0.15); color: #2997ff; padding: 3px 10px; border-radius: 980px; font-size: 12px; font-weight: 600; }
    .action-wrap { text-align: center; margin-top: 32px; }
    .btn { display: inline-block; background: #0071e3; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 14px; padding: 13px 28px; border-radius: 980px; box-shadow: 0 4px 18px rgba(0, 113, 227, 0.4); letter-spacing: -0.01em; }
    .footer { padding: 22px 32px; background: #111113; text-align: center; font-size: 12px; color: #6e6e73; border-top: 1px solid rgba(255, 255, 255, 0.06); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge-wrap">
        <span class="pill pill-brand">Chizzy VFX</span>
        <span class="pill pill-status">Inbound Strategy Call</span>
      </div>
      <h1 class="title">${userName} booked a call</h1>
      <p class="subtitle">A new qualified partner discovery session has been locked on the calendar.</p>
    </div>

    <div class="content">
      <div class="bento-card">
        <div class="bento-label">Selected Session Window</div>
        <div class="bento-date">${dateStr}</div>
        <div class="bento-time">🕒 ${timeSlot} (WAT / GMT+1) • Google Meet</div>
      </div>

      <div class="section-eyebrow">Contact Details</div>
      <div class="detail-row">
        <span class="d-label">Full Name</span>
        <span class="d-val">${userName}</span>
      </div>
      <div class="detail-row">
        <span class="d-label">Work Email</span>
        <span class="d-val"><a href="mailto:${userEmail}">${userEmail}</a></span>
      </div>
      <div class="detail-row">
        <span class="d-label">Website / Social</span>
        <span class="d-val">${userHandle ? `<a href="${userHandle.startsWith('http') ? userHandle : `https://${userHandle}`}" target="_blank">${userHandle}</a>` : '<span style="color:#6e6e73;">Not provided</span>'}</span>
      </div>

      <div class="section-eyebrow">Qualification Profile</div>
      <div class="detail-row">
        <span class="d-label">High-Ticket Offer</span>
        <span class="d-val">${getOfferLabel(hasOffer)}</span>
      </div>
      <div class="detail-row">
        <span class="d-label">Acquisition Motion</span>
        <span class="d-val">${getSystemLabel(leadSystem)}</span>
      </div>
      <div class="detail-row">
        <span class="d-label">Primary Goal</span>
        <span class="d-val"><span class="highlight-pill">${getGoalLabel(contentGoal)}</span></span>
      </div>

      <div class="action-wrap">
        <a href="mailto:${userEmail}?subject=Re:%20Strategy%20Session%20with%20Chizzy" class="btn">Reply Directly to ${userName} →</a>
      </div>
    </div>

    <div class="footer">
      Automated booking notification powered by Resend & Apple Design Architecture.
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generates the HTML template for the Client Thank You email (Apple Design System)
 */
function createClientEmailHtml({ userName, dateStr, timeSlot, contentGoal }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Strategy Session is Confirmed</title>
  <style>
    :root { color-scheme: light dark; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; color: #1d1d1f; margin: 0; padding: 36px 16px; -webkit-font-smoothing: antialiased; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 24px; border: 1px solid rgba(0, 0, 0, 0.08); overflow: hidden; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06); }
    .header { padding: 40px 36px 32px; background: #000000; text-align: left; }
    .badge-pill { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #2997ff; background: rgba(0, 113, 227, 0.16); padding: 5px 14px; border-radius: 980px; text-transform: uppercase; margin-bottom: 12px; }
    .title { font-size: 28px; font-weight: 700; color: #ffffff; margin: 0; letter-spacing: -0.025em; line-height: 1.2; }
    .subtitle { font-size: 15px; color: #a1a1a6; margin: 8px 0 0; line-height: 1.5; }
    .content { padding: 36px; }
    .intro { font-size: 15px; line-height: 1.6; color: #515154; margin: 0 0 24px; }
    
    /* Apple Bento Meeting Card */
    .bento-card { background: #fbfbfd; border: 1px solid #e5e5ea; border-radius: 18px; padding: 22px 24px; margin-bottom: 28px; }
    .bento-header { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #86868b; margin-bottom: 10px; }
    .meeting-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid #f0f0f2; font-size: 14px; }
    .meeting-row:last-child { border-bottom: none; }
    .m-label { color: #86868b; font-weight: 500; }
    .m-val { color: #1d1d1f; font-weight: 600; text-align: right; }
    .m-val-highlight { color: #0071e3; font-weight: 700; }
    
    /* Agenda Bento Items */
    .agenda-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #86868b; margin: 28px 0 14px; }
    .agenda-grid { display: flex; flex-direction: column; gap: 10px; }
    .agenda-card { background: #ffffff; border: 1px solid #e5e5ea; border-radius: 14px; padding: 16px 18px; display: flex; gap: 14px; align-items: flex-start; }
    .agenda-num { width: 24px; height: 24px; border-radius: 50%; background: #0071e3; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
    .agenda-text h4 { font-size: 14px; font-weight: 700; color: #1d1d1f; margin: 0 0 4px; }
    .agenda-text p { font-size: 13px; color: #6e6e73; line-height: 1.45; margin: 0; }
    
    /* Preparation Box */
    .prep-box { background: rgba(0, 113, 227, 0.05); border: 1px solid rgba(0, 113, 227, 0.18); border-radius: 14px; padding: 18px 20px; margin: 28px 0; font-size: 13px; color: #1d1d1f; line-height: 1.55; }
    .prep-box strong { color: #0071e3; }
    
    /* Action Button */
    .action-wrap { text-align: center; margin: 28px 0 10px; }
    .btn { display: inline-block; background: #0071e3; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 14px; padding: 13px 30px; border-radius: 980px; box-shadow: 0 4px 18px rgba(0, 113, 227, 0.35); letter-spacing: -0.01em; }
    
    .footer { padding: 26px 36px; background: #fbfbfd; text-align: center; font-size: 12px; color: #86868b; border-top: 1px solid #e5e5ea; line-height: 1.6; }

    @media (prefers-color-scheme: dark) {
      body { background-color: #000000; color: #f5f5f7; }
      .container { background: #161618; border-color: rgba(255, 255, 255, 0.1); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
      .content { color: #f5f5f7; }
      .intro { color: #a1a1a6; }
      .bento-card { background: rgba(255, 255, 255, 0.04); border-color: rgba(255, 255, 255, 0.08); }
      .bento-header { color: #a1a1a6; }
      .meeting-row { border-color: rgba(255, 255, 255, 0.05); }
      .m-label { color: #86868b; }
      .m-val { color: #f5f5f7; }
      .m-val-highlight { color: #2997ff; }
      .agenda-title { color: #a1a1a6; }
      .agenda-card { background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08); }
      .agenda-text h4 { color: #ffffff; }
      .agenda-text p { color: #a1a1a6; }
      .prep-box { background: rgba(0, 113, 227, 0.12); border-color: rgba(0, 113, 227, 0.3); color: #f5f5f7; }
      .prep-box strong { color: #2997ff; }
      .footer { background: #111113; border-color: rgba(255, 255, 255, 0.08); color: #6e6e73; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge-pill">Strategy Session Confirmed</span>
      <h1 class="title">You're all set, ${userName}.</h1>
      <p class="subtitle">Your 20-minute content distribution session with Chizzy is officially confirmed.</p>
    </div>

    <div class="content">
      <p class="intro">
        Thank you for booking. We have blocked off your dedicated window on our production calendar. Here are the session details:
      </p>

      <div class="bento-card">
        <div class="bento-header">Session Overview</div>
        <div class="meeting-row">
          <span class="m-label">Scheduled Date</span>
          <span class="m-val">${dateStr}</span>
        </div>
        <div class="meeting-row">
          <span class="m-label">Selected Slot</span>
          <span class="m-val m-val-highlight">${timeSlot} (WAT / GMT+1)</span>
        </div>
        <div class="meeting-row">
          <span class="m-label">Platform</span>
          <span class="m-val">Google Meet</span>
        </div>
        <div class="meeting-row">
          <span class="m-label">Growth Focus</span>
          <span class="m-val">${getGoalLabel(contentGoal)}</span>
        </div>
      </div>

      <div class="agenda-title">What We Will Cover on the Call</div>
      <div class="agenda-grid">
        <div class="agenda-card">
          <div class="agenda-num">1</div>
          <div class="agenda-text">
            <h4>Content Diagnostics & Dropoff Audit</h4>
            <p>Rapid review of your current video assets, pacing hooks, and audience retention bottlenecks.</p>
          </div>
        </div>

        <div class="agenda-card">
          <div class="agenda-num">2</div>
          <div class="agenda-text">
            <h4>The Omni-Channel Engine</h4>
            <p>How we engineer 1 single recording into 16:9 YouTube authority, 9:16 FYP reels, and 1:1 saveable carousels.</p>
          </div>
        </div>

        <div class="agenda-card">
          <div class="agenda-num">3</div>
          <div class="agenda-text">
            <h4>Turnkey Roadmap & Production Capacity</h4>
            <p>Concrete timelines, delivery cadences, and pricing for a content system that generates inbound pipeline.</p>
          </div>
        </div>
      </div>

      <div class="prep-box">
        <strong>Calendar Sync:</strong> A Google Meet calendar invitation has been generated for this time slot. If you'd like to share an existing video or draft you'd like us to review ahead of the call, simply reply directly to this email.
      </div>

      <div class="action-wrap">
        <a href="mailto:ifeanyichukwu892@gmail.com?subject=Prep%20Notes%20for%20Strategy%20Call%20with%20Chizzy" class="btn">Reply with Any Notes or Questions →</a>
      </div>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} Chizzy VFX. High-performance video & omni-channel distribution engines.<br>
      You are receiving this because you booked a discovery call on our website.
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
    console.log(`[Mock Admin Email] To: ${ownerEmail} | Subject: 🔥 New Strategy Call: ${userName} (${dateStr} @ ${selectedTimeSlot})`);
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
      subject: `🔥 New Strategy Call Booked: ${userName} (${dateStr} @ ${selectedTimeSlot} WAT)`,
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
