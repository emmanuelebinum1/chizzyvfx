<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { trackPageView, trackViewContent } from '../lib/metaPixel.js';

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

  // Floating Mini-Player State
  // We use a separate sentinel anchor to avoid reflow-triggered flicker.
  let videoAnchor = null;       // stable layout sentinel div — never repositioned
  let isFloating = false;
  let isVideoDismissed = false;
  let hasInteractedWithVideo = false;

  function handleDismissFloating() {
    isVideoDismissed = true;
    isFloating = false;
  }

  function scrollToMainPlayer() {
    if (videoAnchor) {
      videoAnchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onMount(() => {
    trackPageView();
    trackViewContent();

    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('blueprint_lead_name');
      if (stored) leadName = stored;

      // Detect when user clicks inside the iframe (indicating they started the video)
      const onBlur = () => {
        if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
          hasInteractedWithVideo = true;
        }
      };
      window.addEventListener('blur', onBlur);

      // Use requestAnimationFrame to avoid reflow cycles causing flicker.
      // We read from the ANCHOR div (which is always in layout flow, never repositioned)
      // so its bounding rect is stable and doesn't react to the floating state change.
      let rafPending = false;
      const onScroll = () => {
        if (isVideoDismissed || !videoAnchor || rafPending) return;
        rafPending = true;
        requestAnimationFrame(() => {
          rafPending = false;
          if (isVideoDismissed || !videoAnchor) return;
          const rect = videoAnchor.getBoundingClientRect();
          // Anchor is always in flow. If its bottom goes above the viewport top → float.
          const shouldFloat = rect.bottom < 80;
          if (shouldFloat && hasInteractedWithVideo && !isFloating) {
            isFloating = true;
          } else if (!shouldFloat && isFloating) {
            isFloating = false;
          }
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        window.removeEventListener('blur', onBlur);
        window.removeEventListener('scroll', onScroll);
      };
    }
  });

  // Resource download link
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
          <span class="cs-btn-full">Content Strategist Agency &rarr;</span>
          <span class="cs-btn-short">Agency &rarr;</span>
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

      <!-- Video: anchor div stays in layout flow (never repositioned), wrapper floats independently -->
      <div 
        class="video-slot-anchor"
        bind:this={videoAnchor}
      >
        <!-- The inner wrapper is what gets fixed-positioned when floating -->
        <div 
          class="video-masterpiece-wrapper apple-card"
          class:floating-docked={isFloating && !isVideoDismissed}
        >
          {#if isFloating && !isVideoDismissed}
            <div class="floating-dock-header">
              <button 
                type="button" 
                class="dock-scroll-btn"
                on:click={scrollToMainPlayer}
                title="Scroll to main video"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
                <span>Now Playing</span>
              </button>
              <button 
                type="button" 
                class="dock-dismiss-btn"
                on:click={handleDismissFloating}
                aria-label="Dismiss floating video"
              >
                &times;
              </button>
            </div>
          {/if}

          <div class="video-responsive-frame">
            <iframe 
              src="https://www.youtube-nocookie.com/embed/isuHsteB32Y?rel=0&modestbranding=1" 
              title="My Content Blueprint: How I create and post 300 pieces of content per month"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
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

  <!-- Floating Picture-in-Picture Mini Video Player Dock -->
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
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .brand {
    text-decoration: none;
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    white-space: nowrap;
  }

  .brand-accent {
    color: var(--accent-blue);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-cs-btn {
    padding: 0.5rem 1rem;
    font-size: 0.84rem;
    font-weight: 600;
    white-space: nowrap;
    border-radius: var(--radius-pill);
  }

  .cs-btn-short {
    display: none;
  }

  .cs-btn-full {
    display: inline;
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
    flex-shrink: 0;
    transition: all var(--duration-fast) var(--ease-apple);
  }

  .theme-toggle:hover {
    background: var(--bg-secondary);
    border-color: var(--text-secondary);
  }

  /* Main Stage */
  .training-main {
    flex: 1;
    padding: 40px 16px 64px;
    width: 100%;
  }

  .training-container {
    max-width: 980px;
    width: 100%;
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
    padding: 6px 16px;
    border-radius: var(--radius-pill);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    margin-bottom: 20px;
    box-shadow: var(--shadow-sm);
    max-width: 100%;
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--accent-green);
    box-shadow: 0 0 10px rgba(52, 199, 89, 0.6);
    flex-shrink: 0;
  }

  .badge-text {
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
    white-space: normal;
    line-height: 1.4;
  }

  /* Headline */
  .training-headline {
    font-size: clamp(1.6rem, 5.5vw, 3rem);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin-bottom: 16px;
    max-width: 880px;
    word-break: normal;
    overflow-wrap: break-word;
  }

  .training-subhead {
    font-size: clamp(0.95rem, 2.5vw, 1.12rem);
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 720px;
    margin: 0 auto 30px;
    padding: 0 8px;
  }

  /* Video slot: anchor stays in layout always, holds space to prevent page-jump */
  .video-slot-anchor {
    width: 100%;
    max-width: 920px;
    aspect-ratio: 16 / 9;   /* mirrors the iframe ratio so layout doesn't jump */
    margin-bottom: 32px;
    position: relative;      /* wrapper is positioned relative to this */
  }

  /* Video Frame & Seamless Continuous Floating Dock */
  .video-masterpiece-wrapper {
    width: 100%;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    background: #000;
    border: 1px solid var(--border-color);
    /* Only transition shadow/radius, NOT position/size (causes flicker) */
    transition: border-radius 300ms var(--ease-apple), box-shadow 300ms var(--ease-apple);
  }

  /* When docked: lifts out of flow into a fixed corner — no layout reflow */
  .video-masterpiece-wrapper.floating-docked {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 340px;
    z-index: 10000;
    border-radius: var(--radius-lg);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
    border: 1px solid var(--glass-border);
    background: var(--nav-bg);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    animation: popIn 280ms var(--ease-apple) forwards;
    /* Crucially: anchor div above keeps layout space — no page jump */
  }

  .floating-dock-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--border-color);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .dock-scroll-btn {
    background: transparent;
    border: none;
    color: var(--text-primary);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.74rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }

  .dock-dismiss-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    padding: 0 4px;
    transition: color var(--duration-fast) var(--ease-apple);
  }

  .dock-dismiss-btn:hover {
    color: var(--text-primary);
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

  @keyframes popIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .animate-pop-in {
    animation: popIn 300ms var(--ease-apple) forwards;
  }

  /* Dual CTA Section */
  .dual-cta-section {
    width: 100%;
    max-width: 920px;
    padding: 34px 28px;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-md);
    margin-bottom: 40px;
    text-align: center;
  }

  .cta-header h3 {
    font-size: clamp(1.2rem, 3.2vw, 1.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  .cta-header p {
    font-size: 0.95rem;
    color: var(--text-secondary);
    max-width: 580px;
    margin: 0 auto 24px;
    line-height: 1.55;
  }

  .cta-buttons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    width: 100%;
  }

  .cta-btn {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
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
    .nav-container {
      padding: 10px 16px;
    }

    .brand {
      font-size: 1.12rem;
    }

    .cs-btn-full {
      display: none;
    }

    .cs-btn-short {
      display: inline;
    }

    .nav-cs-btn {
      padding: 0.42rem 0.8rem;
      font-size: 0.8rem;
    }

    .training-main {
      padding: 24px 14px 48px;
    }

    .training-headline {
      font-size: 1.45rem;
      line-height: 1.25;
      margin-bottom: 14px;
      letter-spacing: -0.025em;
    }

    .training-subhead {
      font-size: 0.92rem;
      line-height: 1.5;
      margin-bottom: 22px;
      padding: 0 4px;
    }

    /* Video Player - Full edge-to-edge frame on mobile */
    .video-masterpiece-wrapper {
      border-radius: var(--radius-lg);
      margin-bottom: 24px;
      box-shadow: var(--shadow-md);
    }

    .dual-cta-section {
      padding: 24px 16px;
      border-radius: var(--radius-xl);
      margin-bottom: 30px;
    }

    .cta-header h3 {
      font-size: 1.2rem;
      line-height: 1.3;
    }

    .cta-header p {
      font-size: 0.88rem;
      margin-bottom: 18px;
    }

    .cta-buttons-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .cta-btn {
      padding: 14px 16px;
      gap: 12px;
      border-radius: var(--radius-lg);
    }

    .btn-icon-wrap {
      width: 38px;
      height: 38px;
    }

    .btn-title {
      font-size: 0.95rem;
    }

    .btn-sub {
      font-size: 0.75rem;
    }

    .video-summary-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .summary-card {
      padding: 20px 16px;
      border-radius: var(--radius-lg);
    }

    .summary-card h4 {
      font-size: 0.98rem;
    }

    .summary-card p {
      font-size: 0.84rem;
    }

    /* Floating Player on Mobile */
    .video-masterpiece-wrapper.floating-docked {
      bottom: 16px;
      right: 14px;
      left: 14px;
      width: auto;
      max-width: 320px;
      margin-left: auto;
    }
  }

  @media (max-width: 420px) {
    .nav-container {
      padding: 8px 12px;
    }

    .training-main {
      padding: 20px 10px 40px;
    }

    .training-headline {
      font-size: 1.32rem;
      line-height: 1.25;
    }

    .video-masterpiece-wrapper {
      border-radius: var(--radius-md);
      margin-bottom: 20px;
    }

    .video-masterpiece-wrapper.floating-docked {
      bottom: 12px;
      right: 10px;
      left: 10px;
      max-width: 290px;
    }
  }
</style>
