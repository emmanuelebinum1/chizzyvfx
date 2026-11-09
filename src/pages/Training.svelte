<script>
  import '../app.css';
  import { onMount } from 'svelte';

  export let onNavigate = null;

  let leadName = '';

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

  onMount(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('blueprint_lead_name');
      if (stored) {
        leadName = stored;
      }
    }
  });

  // Resource download link (pointing to Google Drive folder or customizable link)
  const resourceDownloadUrl = 'https://drive.google.com/drive/folders/1yujvmx9yq9DgNXFOsoWGLBriL76W5It9';
</script>

<div class="training-page">
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

        <a 
          href="/content-strategist" 
          class="btn btn-secondary nav-cs-btn"
          on:click={(e) => handleNavigate('/content-strategist', e)}
        >
          Content Strategist Agency &rarr;
        </a>
      </div>
    </div>
  </nav>

  <!-- Main Video Masterclass Section -->
  <main class="training-main">
    <div class="training-container">
      
      <!-- Top Eyebrow Badge -->
      <div class="training-badge">
        <span class="badge-dot"></span>
        <span class="badge-text">
          {#if leadName}
            Welcome, {leadName} &bull; Masterclass Unlocked
          {:else}
            Masterclass Unlocked &bull; Full 1-Hour Breakdown
          {/if}
        </span>
      </div>

      <!-- Main Headline (Identical to Page 1) -->
      <h1 class="training-headline">
        My Content Blueprint for business owners, personal brands. How I create and post 300 pieces of content per month
      </h1>

      <p class="training-subhead">
        Watch the full masterclass below. Follow along with the exact blueprint, distribution frameworks, and system automations used to generate over 300 assets every single month.
      </p>

      <!-- 1-Hour YouTube Video Embed Player Container -->
      <div class="video-masterpiece-wrapper apple-card">
        <div class="video-responsive-frame">
          <!-- Training Masterclass Video -->
          <iframe 
            src="https://www.youtube-nocookie.com/embed/isuHsteB32Y?rel=0&modestbranding=1" 
            title="My Content Blueprint: How I create and post 300 pieces of content per month"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <!-- Dual Call-to-Action Bar -->
      <div class="dual-cta-section apple-card apple-glass">
        <div class="cta-header">
          <h3>Next Steps &bull; Choose Your Track</h3>
          <p>Download the free production template mentioned in the masterclass, or partner directly with our content specialist team.</p>
        </div>

        <div class="cta-buttons-grid">
          <!-- CTA 1: Download The Resource -->
          <a 
            href={resourceDownloadUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-primary cta-btn download-btn"
          >
            <div class="btn-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <div class="btn-text-wrap">
              <span class="btn-title">Download The Resource</span>
              <span class="btn-sub">Templates, Script SOPs &amp; Checklists</span>
            </div>
          </a>

          <!-- CTA 2: Link to Content Strategist Page -->
          <a 
            href="/content-strategist" 
            class="btn btn-secondary cta-btn agency-btn"
            on:click={(e) => handleNavigate('/content-strategist', e)}
          >
            <div class="btn-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </div>
            <div class="btn-text-wrap">
              <span class="btn-title">Content Strategist Agency</span>
              <span class="btn-sub">Let us run the entire engine for you &rarr;</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Video Key Takeaways Summary -->
      <div class="video-summary-grid">
        <div class="summary-card apple-card apple-glass">
          <div class="summary-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h4>One Recording Session</h4>
          <p>Record once for 45-60 minutes per month. We transform that single recording into shorts, long-forms, and carousels.</p>
        </div>

        <div class="summary-card apple-card apple-glass">
          <div class="summary-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <h4>Conversion-First Editing</h4>
          <p>Every cut, hook pattern, and audio drop is tuned to maximize watch time, follower conversion, and inbound pipeline.</p>
        </div>

        <div class="summary-card apple-card apple-glass">
          <div class="summary-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <h4>Omnipresent Distribution</h4>
          <p>Your brand published daily across YouTube, Instagram, TikTok, and LinkedIn without you editing a single frame.</p>
        </div>
      </div>

    </div>
  </main>

  <!-- Minimal Footer -->
  <footer class="training-footer apple-glass">
    <div class="container">
      <p>&copy; 2026 ChizzyVFX &bull; All rights reserved.</p>
    </div>
  </footer>
</div>

<style>
  .training-page {
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
    max-width: 1120px;
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

  .nav-cs-btn {
    padding: 0.55rem 1.2rem;
    font-size: 0.85rem;
    font-weight: 600;
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
  .training-main {
    flex: 1;
    padding: 60px 24px 80px;
  }

  .training-container {
    max-width: 980px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Badge */
  .training-badge {
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

  /* Headline */
  .training-headline {
    font-size: clamp(2rem, 4.2vw, 3.2rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.035em;
    color: var(--text-primary);
    margin-bottom: 20px;
    max-width: 860px;
  }

  .training-subhead {
    font-size: 1.12rem;
    color: var(--text-secondary);
    line-height: 1.65;
    max-width: 720px;
    margin: 0 auto 40px;
  }

  /* Video Frame */
  .video-masterpiece-wrapper {
    width: 100%;
    max-width: 920px;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    margin-bottom: 40px;
    background: #000;
    border: 1px solid var(--border-color);
  }

  .video-responsive-frame {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .video-responsive-frame iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  /* Dual CTA Section */
  .dual-cta-section {
    width: 100%;
    max-width: 920px;
    padding: 38px 34px;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-md);
    margin-bottom: 50px;
    text-align: center;
  }

  .cta-header h3 {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  .cta-header p {
    font-size: 0.98rem;
    color: var(--text-secondary);
    max-width: 580px;
    margin: 0 auto 28px;
    line-height: 1.55;
  }

  .cta-buttons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .cta-btn {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 24px;
    border-radius: var(--radius-xl);
    text-align: left;
    transition: all var(--duration-base) var(--ease-apple);
    text-decoration: none;
  }

  .btn-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .download-btn .btn-icon-wrap {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  .agency-btn .btn-icon-wrap {
    background: rgba(0, 113, 227, 0.1);
    color: var(--accent-blue);
  }

  .btn-text-wrap {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .btn-title {
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .btn-sub {
    font-size: 0.8rem;
    opacity: 0.85;
  }

  .download-btn {
    background: var(--accent-blue);
    color: #ffffff;
    box-shadow: 0 6px 20px var(--accent-blue-glow);
  }

  .download-btn:hover {
    background: var(--accent-blue-hover);
    transform: translateY(-2px);
    box-shadow: 0 10px 28px var(--accent-blue-glow);
  }

  .agency-btn {
    background: var(--card-bg);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
  }

  .agency-btn:hover {
    border-color: var(--accent-blue);
    transform: translateY(-2px);
    background: var(--card-hover-bg);
  }

  /* Summary Grid */
  .video-summary-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 920px;
  }

  .summary-card {
    padding: 26px 22px;
    border-radius: var(--radius-xl);
    text-align: left;
    box-shadow: var(--shadow-sm);
  }

  .summary-icon {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-md);
    background: rgba(0, 113, 227, 0.1);
    color: var(--accent-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .summary-card h4 {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
    letter-spacing: -0.01em;
  }

  .summary-card p {
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0;
  }

  /* Footer */
  .training-footer {
    padding: 24px;
    text-align: center;
    font-size: 0.82rem;
    color: var(--text-tertiary);
    border-top: 1px solid var(--border-color);
  }

  @media (max-width: 768px) {
    .cta-buttons-grid {
      grid-template-columns: 1fr;
    }
    .video-summary-grid {
      grid-template-columns: 1fr;
    }
    .dual-cta-section {
      padding: 28px 20px;
    }
  }
</style>
