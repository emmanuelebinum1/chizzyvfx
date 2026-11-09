/**
 * Meta (Facebook) Pixel — loaded lazily, only on the pages that use it (/optin and /training).
 *
 * Set the pixel ID in your environment as VITE_META_PIXEL_ID (see .env.example).
 * If the variable is empty the module is a no-op, so the site keeps working without it.
 */

const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID || '').trim();
const SCRIPT_FLAG = '__metaPixelScriptRequested';

let isInitialized = false;

export const isMetaPixelEnabled = () => Boolean(PIXEL_ID);

function ensurePixel() {
  if (typeof window === 'undefined' || !PIXEL_ID) return false;

  // Standard Meta Pixel queue stub (must exist before fbevents.js loads).
  if (!window.fbq) {
    const fbq = function (...args) {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, args);
      } else {
        fbq.queue.push(args);
      }
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
  }

  if (!window[SCRIPT_FLAG]) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
    window[SCRIPT_FLAG] = true;
  }

  if (!isInitialized) {
    window.fbq('init', PIXEL_ID);
    isInitialized = true;
  }

  return true;
}

/**
 * Fire a standard PageView. Call once per page mount on /optin and /training.
 */
export function trackPageView() {
  if (!ensurePixel()) return;
  window.fbq('track', 'PageView');
}

/**
 * Attach lead details for Advanced Matching. The browser pixel hashes these values
 * automatically, so pass them as plain text.
 */
function setAdvancedMatching({ name, email, phone } = {}) {
  if (!ensurePixel()) return;
  const userData = {};

  if (email) userData.em = email.trim().toLowerCase();
  if (phone) {
    const digits = phone.replace(/[^\d]/g, '');
    if (digits) userData.ph = digits;
  }
  if (name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts[0]) userData.fn = parts[0].toLowerCase();
    if (parts.length > 1) userData.ln = parts[parts.length - 1].toLowerCase();
  }

  if (Object.keys(userData).length) {
    window.fbq('init', PIXEL_ID, userData);
  }
}

/**
 * Fire a Lead event after a successful opt-in submission.
 */
export function trackLead({ name, email, phone } = {}) {
  if (!ensurePixel()) return;
  setAdvancedMatching({ name, email, phone });
  window.fbq('track', 'Lead', {
    content_name: 'Content Blueprint Masterclass',
    content_category: 'optin',
  });
}

/**
 * Fire a ViewContent event when the training/masterclass page is viewed.
 */
export function trackViewContent() {
  if (!ensurePixel()) return;
  window.fbq('track', 'ViewContent', {
    content_name: 'Content Blueprint Masterclass',
    content_category: 'training',
  });
}
