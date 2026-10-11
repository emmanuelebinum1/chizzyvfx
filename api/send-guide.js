import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

/**
 * HTML template for sending the free guide to the lead
 */
function createGuideEmailHtml({ recipientEmail, guideUrl }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Free Video Editor Hiring & AI Scripting Guide</title>
  <style>
    :root { color-scheme: light dark; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; color: #1d1d1f; margin: 0; padding: 36px 16px; -webkit-font-smoothing: antialiased; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 24px; border: 1px solid rgba(0, 0, 0, 0.08); overflow: hidden; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06); }
    .header { padding: 40px 36px 32px; background: #000000; text-align: left; }
    .badge-pill { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #2997ff; background: rgba(0, 113, 227, 0.16); padding: 5px 14px; border-radius: 980px; text-transform: uppercase; margin-bottom: 12px; }
    .title { font-size: 28px; font-weight: 700; color: #ffffff; margin: 0; letter-spacing: -0.025em; line-height: 1.2; }
    .subtitle { font-size: 15px; color: #a1a1a6; margin: 8px 0 0; line-height: 1.5; }
    .content { padding: 36px; }
    .intro { font-size: 15px; line-height: 1.6; color: #515154; margin: 0 0 26px; }
    
    /* Apple Bento Blueprint Grid */
    .bento-card { background: #fbfbfd; border: 1px solid #e5e5ea; border-radius: 18px; padding: 22px 24px; margin-bottom: 28px; }
    .bento-header { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #86868b; margin-bottom: 14px; }
    .module-item { display: flex; gap: 14px; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid #f0f0f2; }
    .module-item:last-child { border-bottom: none; padding-bottom: 4px; }
    .module-num { width: 24px; height: 24px; border-radius: 50%; background: #0071e3; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
    .module-text h4 { font-size: 14px; font-weight: 700; color: #1d1d1f; margin: 0 0 4px; }
    .module-text p { font-size: 13px; color: #6e6e73; line-height: 1.45; margin: 0; }
    
    /* Apple Pill CTA Box */
    .cta-box { text-align: center; margin: 32px 0 24px; }
    .btn { display: inline-block; background: #0071e3; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 15px; padding: 14px 34px; border-radius: 980px; box-shadow: 0 4px 18px rgba(0, 113, 227, 0.35); letter-spacing: -0.01em; }
    .alt-link { font-size: 12px; color: #86868b; word-break: break-all; margin-top: 14px; line-height: 1.5; }
    .alt-link a { color: #0071e3; text-decoration: none; font-weight: 500; }
    
    /* Pro Tip Callout */
    .tip-box { background: rgba(0, 113, 227, 0.05); border: 1px solid rgba(0, 113, 227, 0.18); border-radius: 14px; padding: 18px 20px; margin: 28px 0 10px; font-size: 13px; color: #1d1d1f; line-height: 1.55; }
    .tip-box strong { color: #0071e3; }
    
    .footer { padding: 26px 36px; background: #fbfbfd; text-align: center; font-size: 12px; color: #86868b; border-top: 1px solid #e5e5ea; line-height: 1.6; }

    @media (prefers-color-scheme: dark) {
      body { background-color: #000000; color: #f5f5f7; }
      .container { background: #161618; border-color: rgba(255, 255, 255, 0.1); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
      .content { color: #f5f5f7; }
      .intro { color: #a1a1a6; }
      .bento-card { background: rgba(255, 255, 255, 0.04); border-color: rgba(255, 255, 255, 0.08); }
      .bento-header { color: #a1a1a6; }
      .module-item { border-color: rgba(255, 255, 255, 0.05); }
      .module-text h4 { color: #ffffff; }
      .module-text p { color: #a1a1a6; }
      .tip-box { background: rgba(0, 113, 227, 0.12); border-color: rgba(0, 113, 227, 0.3); color: #f5f5f7; }
      .tip-box strong { color: #2997ff; }
      .alt-link a { color: #2997ff; }
      .footer { background: #111113; border-color: rgba(255, 255, 255, 0.08); color: #6e6e73; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge-pill">Free In-House Playbook</span>
      <h1 class="title">The Video Editor Hiring & AI Scripting Guide</h1>
      <p class="subtitle">The operational playbook we use to vet high-retention editors and script videos at scale.</p>
    </div>

    <div class="content">
      <p class="intro">
        Thank you for requesting our guide. If you're building your content production machine in-house for now, here is the exact framework we follow to test editors, avoid template traps, and script with AI.
      </p>

      <div class="bento-card">
        <div class="bento-header">What's Inside The Document</div>
        
        <div class="module-item">
          <div class="module-num">01</div>
          <div class="module-text">
            <h4>Where to Actually Find Editors</h4>
            <p>Underground talent pools and specialized video communities beyond saturated freelance marketplaces.</p>
          </div>
        </div>

        <div class="module-item">
          <div class="module-num">02</div>
          <div class="module-text">
            <h4>How to Scrutinize a Portfolio</h4>
            <p>Separating real retention editors from flashy template users with no narrative discipline.</p>
          </div>
        </div>

        <div class="module-item">
          <div class="module-num">03</div>
          <div class="module-text">
            <h4>Two Paid Test Tasks</h4>
            <p>The 2-part paid evaluation task to benchmark speed, revision communication, and pacing hooks.</p>
          </div>
        </div>

        <div class="module-item">
          <div class="module-num">04</div>
          <div class="module-text">
            <h4>Script Faster with AI</h4>
            <p>The prompt engineering framework we use to turn raw notes into retention-engineered scripts in minutes.</p>
          </div>
        </div>
      </div>

      <div class="cta-box">
        <a href="${guideUrl}" target="_blank" class="btn">Open Document in Google Docs →</a>
        <div class="alt-link">
          Or copy and paste this link into your browser:<br>
          <a href="${guideUrl}" target="_blank">${guideUrl}</a>
        </div>
      </div>

      <div class="tip-box">
        <strong>Pro-Tip:</strong> Bookmark the Google Doc link above. We frequently update the AI prompt formulas and editor vetting rubrics as social algorithms evolve.
      </div>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} Chizzy VFX. High-performance video & content distribution engines.<br>
      You requested this free guide on our website.
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * HTML template for notifying the owner about a new lead guide request (Apple Design)
 */
function createGuideAdminEmailHtml({ recipientEmail, guideUrl }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Guide Request</title>
  <style>
    :root { color-scheme: dark light; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000000; color: #f5f5f7; margin: 0; padding: 32px 16px; -webkit-font-smoothing: antialiased; }
    .container { max-width: 560px; margin: 0 auto; background: #161618; border-radius: 22px; border: 1px solid rgba(255, 255, 255, 0.12); overflow: hidden; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6); }
    .header { padding: 36px 32px 28px; background: linear-gradient(180deg, #1c1c1e 0%, #161618 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
    .badge-pill { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #2997ff; background: rgba(0, 113, 227, 0.2); padding: 4px 12px; border-radius: 980px; text-transform: uppercase; margin-bottom: 12px; border: 1px solid rgba(0, 113, 227, 0.35); }
    .title { font-size: 24px; font-weight: 700; color: #ffffff; margin: 0; letter-spacing: -0.02em; }
    .subtitle { font-size: 14px; color: #86868b; margin: 6px 0 0; }
    .content { padding: 32px; }
    .bento-card { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 20px 22px; margin-bottom: 24px; }
    .bento-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #86868b; margin-bottom: 6px; }
    .email-display { font-size: 18px; font-weight: 700; color: #ffffff; }
    .email-display a { color: #2997ff; text-decoration: none; }
    .status-note { font-size: 13px; color: #30d158; font-weight: 500; margin-top: 8px; display: flex; align-items: center; gap: 6px; }
    .action-wrap { text-align: center; margin-top: 24px; }
    .btn { display: inline-block; background: #0071e3; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 14px; padding: 13px 28px; border-radius: 980px; box-shadow: 0 4px 18px rgba(0, 113, 227, 0.4); letter-spacing: -0.01em; }
    .footer { padding: 22px 32px; background: #111113; text-align: center; font-size: 12px; color: #6e6e73; border-top: 1px solid rgba(255, 255, 255, 0.06); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge-pill">Inbound Lead Magnet</span>
      <h1 class="title">New Guide Download</h1>
      <p class="subtitle">A visitor requested the In-House Hiring & AI Scripting Guide on your landing page.</p>
    </div>

    <div class="content">
      <div class="bento-card">
        <div class="bento-label">Requester Work Email</div>
        <div class="email-display"><a href="mailto:${recipientEmail}">${recipientEmail}</a></div>
        <div class="status-note">✓ Google Docs guide link automatically delivered to their inbox</div>
      </div>

      <div class="action-wrap">
        <a href="mailto:${recipientEmail}?subject=Quick%20question%20about%20your%20video%20workflow" class="btn">Reach Out Directly to Lead →</a>
      </div>
    </div>

    <div class="footer">
      Automated lead notification powered by Resend & Apple Design Architecture.
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Main handler to process guide request
 */
export async function handleSendGuide(payload) {
  const { email } = payload || {};

  if (!email || !email.trim()) {
    throw new Error('Email address is required.');
  }

  const recipientEmail = email.trim();
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || 'ifeanyichukwu892@gmail.com';
  const senderEmail = process.env.SENDER_EMAIL || 'Chizzy VFX <onboarding@resend.dev>';
  const guideUrl = process.env.GUIDE_DOC_URL || 'https://docs.google.com/document/d/1YSwXEPACpG1911hAzZsBEuWAE4EmW9if/edit?usp=sharing';

  // Mock mode if no key configured
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_api_key')) {
    console.log(`\n[Mock Send Guide] Sending guide to ${recipientEmail} with link: ${guideUrl}`);
    console.log(`[Mock Send Guide Alert] Notifying owner at: ${ownerEmail}\n`);
    return {
      success: true,
      mock: true,
      message: 'Guide link sent in mock mode.'
    };
  }

  const resend = new Resend(apiKey.trim());

  const guideHtml = createGuideEmailHtml({ recipientEmail, guideUrl });
  const adminHtml = createGuideAdminEmailHtml({ recipientEmail, guideUrl });

  let clientRes = null;
  let adminRes = null;

  // 1. Send the guide to the user
  try {
    clientRes = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      subject: 'Your Free Video Editor Hiring & AI Scripting Guide (Google Docs)',
      html: guideHtml
    });
    console.log('[Resend Guide Client Email]:', clientRes);
  } catch (err) {
    console.error('[Resend Guide Client Error]:', err);
    clientRes = { error: { message: err.message } };
  }

  // 2. Notify the owner about the new lead
  try {
    adminRes = await resend.emails.send({
      from: senderEmail,
      to: ownerEmail,
      subject: ` New Guide Download: ${recipientEmail}`,
      html: adminHtml,
      replyTo: recipientEmail
    });
    console.log('[Resend Guide Admin Email]:', adminRes);
  } catch (err) {
    console.error('[Resend Guide Admin Error]:', err);
    adminRes = { error: { message: err.message } };
  }

  const clientError = clientRes?.error;
  const adminError = adminRes?.error;

  if (clientError && adminError) {
    throw new Error(`Failed to deliver guide: ${clientError.message || adminError.message}`);
  }

  return {
    success: true,
    guideSent: !clientError,
    adminNotified: !adminError,
    warning: clientError ? clientError.message : null
  };
}

/**
 * Serverless export for Vercel
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
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

    const result = await handleSendGuide(body);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Error in /api/send-guide handler:', err);
    return res.status(500).json({ error: err.message || 'Failed to send guide' });
  }
}
