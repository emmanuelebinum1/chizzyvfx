<script>
  import '../app.css';

  export let onNavigate = null;

  let name = '';
  let email = '';
  let phone = '';
  let isSubmitting = false;
  let errorMessage = '';

  // Theme Management
  let isDarkMode = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark';

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  function handleNavigate(path, e) {
    if (onNavigate) {
      onNavigate(path, e);
    }
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    errorMessage = '';

    if (!email || !email.includes('@')) {
      errorMessage = 'Please provide a valid email address.';
      return;
    }

    if (!phone || phone.trim().length < 6) {
      errorMessage = 'Please provide a valid phone number.';
      return;
    }

    isSubmitting = true;

    try {
      const response = await fetch('/api/optin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim()
        })
      });

      const data = await response.json();

      if (!response.ok && data.error) {
        throw new Error(data.error);
      }

      // Store lead info in sessionStorage for personalized experience on the training page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('blueprint_lead_name', name.trim());
        sessionStorage.setItem('blueprint_lead_email', email.trim());
      }

      // Immediately navigate to the training page
      handleNavigate('/training');
    } catch (err) {
      console.error('Opt-in error:', err);
      // Even if email notification has an issue, ensure lead gets access
      handleNavigate('/training');
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="optin-page">
  <!-- Dynamic Apple Wallpaper Background -->
  <div class="apple-bg-container" aria-hidden="true">
    <div class="apple-bg-image"></div>
    <div class="apple-bg-overlay"></div>
  </div>

  <!-- Apple Minimal Navigation -->
  <nav class="navbar apple-glass">
    <div class="nav-container">
      <a href="/" class="brand" on:click={(e) => handleNavigate('/', e)}>
        <span class="brand-text">Chizzy<span class="brand-accent">VFX</span></span>
      </a>

      <div class="nav-actions">
        <button 
          type="button"
          class="theme-toggle" 
          on:click={toggleTheme} 
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {#if isDarkMode}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          {:else}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </nav>

  <!-- Main Hero & Optin Section -->
  <main class="optin-main">
    <div class="optin-container">
      
      <!-- Top Eyebrow Badge -->
      <div class="optin-badge">
        <span class="badge-dot"></span>
        <span class="badge-text">Free Masterclass &bull; Instant Access</span>
      </div>

      <!-- Main Headline -->
      <h1 class="optin-headline">
        My Content Blueprint for business owners, personal brands. How I create and post 300 pieces of content per month
      </h1>

      <p class="optin-subhead">
        Step-by-step masterclass and systems walkthrough. Enter your details below to unlock the complete 1-hour breakdown video and downloadable resource stack.
      </p>

      <!-- Glass Opt-in Card -->
      <div class="optin-card apple-card apple-glass">
        <div class="card-header">
          <div class="lock-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <div>
            <h3 class="card-title">Where should we grant access?</h3>
            <p class="card-subtitle">Takes less than 15 seconds. Unlocks immediately on the next page.</p>
          </div>
        </div>

        {#if errorMessage}
          <div class="optin-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{errorMessage}</span>
          </div>
        {/if}

        <form class="optin-form" on:submit|preventDefault={handleSubmit}>
          <!-- Name Field -->
          <div class="form-group">
            <label for="lead-name">Your Full Name</label>
            <div class="input-container">
              <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input 
                id="lead-name"
                type="text" 
                bind:value={name}
                placeholder="e.g. Alex Sterling"
                required
                disabled={isSubmitting}
                autocomplete="name"
              />
            </div>
          </div>

          <!-- Email Field -->
          <div class="form-group">
            <label for="lead-email">Your Best Email Address</label>
            <div class="input-container">
              <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input 
                id="lead-email"
                type="email" 
                bind:value={email}
                placeholder="alex@company.com"
                required
                disabled={isSubmitting}
                autocomplete="email"
              />
            </div>
          </div>

          <!-- Phone Number Field -->
          <div class="form-group">
            <label for="lead-phone">WhatsApp / Phone Number</label>
            <div class="input-container">
              <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <input 
                id="lead-phone"
                type="tel" 
                bind:value={phone}
                placeholder="+1 (555) 000-0000 or +234..."
                required
                disabled={isSubmitting}
                autocomplete="tel"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn btn-primary optin-submit-btn" 
            disabled={isSubmitting}
          >
            {#if isSubmitting}
              <span class="apple-spinner"></span>
              <span>Unlocking Blueprint...</span>
            {:else}
              <span>Get Instant Access to Blueprint &rarr;</span>
            {/if}
          </button>
        </form>

        <!-- Trust Features -->
        <div class="trust-row">
          <div class="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>1-Hour Masterclass</span>
          </div>
          <div class="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Resource Template Stack</span>
          </div>
          <div class="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>No Spam Ever</span>
          </div>
        </div>
      </div>

      <!-- Quick Bullet Points -->
      <div class="blueprint-perks">
        <div class="perk-card apple-card apple-glass">
          <div class="perk-num">01</div>
          <div class="perk-info">
            <h4>The Single Recording Multiplier</h4>
            <p>How 1 recorded interview or podcast turns into 30+ tailored video assets across YouTube, Instagram, and LinkedIn.</p>
          </div>
        </div>

        <div class="perk-card apple-card apple-glass">
          <div class="perk-num">02</div>
          <div class="perk-info">
            <h4>Frictionless Editing Framework</h4>
            <p>The hook pacing, editing frameworks, and retention algorithms that drive actual viewer conversion.</p>
          </div>
        </div>

        <div class="perk-card apple-card apple-glass">
          <div class="perk-num">03</div>
          <div class="perk-info">
            <h4>Complete Resource Stack</h4>
            <p>Direct download links to our scripting SOPs, production checklists, and asset distribution workflows.</p>
          </div>
        </div>
      </div>

    </div>
  </main>

  <!-- Minimal Footer -->
  <footer class="optin-footer apple-glass">
    <div class="container">
      <p>&copy; 2026 ChizzyVFX &bull; All rights reserved.</p>
    </div>
  </footer>
</div>

<style>
  .optin-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: var(--text-primary);
    position: relative;
    overflow-x: clip;
  }

  /* Navbar */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    border-bottom: 1px solid var(--border-color);
  }

  .nav-container {
    max-width: 1080px;
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    text-decoration: none;
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }

  .brand-accent {
    color: var(--accent-blue);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .nav-link-subtle {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-apple);
    font-weight: 500;
  }

  .nav-link-subtle:hover {
    color: var(--text-primary);
  }

  .theme-toggle {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    width: 36px;
    height: 36px;
    border-radius: var(--radius-pill);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-apple);
  }

  .theme-toggle:hover {
    background: var(--bg-secondary);
    border-color: var(--text-secondary);
  }

  /* Main Stage */
  .optin-main {
    flex: 1;
    padding: 60px 24px 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .optin-container {
    max-width: 780px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Badge */
  .optin-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 18px;
    border-radius: var(--radius-pill);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    margin-bottom: 24px;
    box-shadow: var(--shadow-sm);
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--accent-green);
    box-shadow: 0 0 10px rgba(52, 199, 89, 0.6);
  }

  .badge-text {
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
  }

  /* Headlines */
  .optin-headline {
    font-size: clamp(2rem, 4.2vw, 3.2rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.035em;
    color: var(--text-primary);
    margin-bottom: 20px;
    max-width: 760px;
  }

  .optin-subhead {
    font-size: 1.15rem;
    color: var(--text-secondary);
    line-height: 1.65;
    max-width: 620px;
    margin: 0 auto 40px;
  }

  /* Glass Card */
  .optin-card {
    width: 100%;
    max-width: 580px;
    padding: 38px 34px;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-lg);
    text-align: left;
    margin-bottom: 48px;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 24px;
  }

  .lock-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    background: rgba(0, 113, 227, 0.1);
    border: 1px solid rgba(0, 113, 227, 0.2);
    color: var(--accent-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .card-title {
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0 0 4px;
  }

  .card-subtitle {
    font-size: 0.88rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .optin-error {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 59, 48, 0.1);
    border: 1px solid rgba(255, 59, 48, 0.25);
    color: var(--accent-red);
    padding: 10px 14px;
    border-radius: var(--radius-md);
    font-size: 0.88rem;
    font-weight: 500;
    margin-bottom: 20px;
  }

  /* Form */
  .optin-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  .input-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 16px;
    color: var(--text-tertiary);
    pointer-events: none;
  }

  .input-container input {
    width: 100%;
    padding: 13px 16px 13px 44px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 0.96rem;
    font-family: inherit;
    transition: all var(--duration-fast) var(--ease-apple);
    outline: none;
  }

  .input-container input:focus {
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 4px var(--accent-blue-glow);
    background: var(--bg-primary);
  }

  .input-container input::placeholder {
    color: var(--text-tertiary);
  }

  .optin-submit-btn {
    width: 100%;
    padding: 16px;
    font-size: 1.05rem;
    font-weight: 600;
    margin-top: 8px;
    border-radius: var(--radius-pill);
    box-shadow: 0 6px 20px var(--accent-blue-glow);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .optin-submit-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  /* Spinner */
  .apple-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .trust-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 22px;
    padding-top: 18px;
    border-top: 1px solid var(--border-color);
    flex-wrap: wrap;
    gap: 8px;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    color: var(--text-tertiary);
    font-weight: 500;
  }

  .trust-item svg {
    color: var(--accent-green);
  }

  /* Perks List */
  .blueprint-perks {
    width: 100%;
    max-width: 680px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .perk-card {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 22px 24px;
    border-radius: var(--radius-xl);
    text-align: left;
    box-shadow: var(--shadow-sm);
  }

  .perk-num {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--accent-blue);
    font-family: monospace;
    opacity: 0.85;
    line-height: 1.2;
  }

  .perk-info h4 {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 6px;
    letter-spacing: -0.015em;
  }

  .perk-info p {
    font-size: 0.92rem;
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0;
  }

  /* Footer */
  .optin-footer {
    padding: 24px;
    text-align: center;
    font-size: 0.82rem;
    color: var(--text-tertiary);
    border-top: 1px solid var(--border-color);
  }

  @media (max-width: 640px) {
    .optin-card {
      padding: 28px 20px;
    }
    .trust-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .perk-card {
      padding: 18px;
      gap: 14px;
    }
  }
</style>
