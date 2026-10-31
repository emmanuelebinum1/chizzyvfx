<script>
  import '../app.css';

  export let onNavigate = null;

  function handleNavigate(e, path) {
    if (onNavigate) {
      onNavigate(path, e);
    }
  }

  // Theme Management (Light / Dark)
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

  // Active video category filter
  let activeFilter = 'all';

  const filterCategories = [
    { id: 'all', label: 'All' },
    { id: 'saas', label: 'SaaS' },
    { id: 'shortform', label: 'Short-form Reels' },
    { id: 'longform', label: 'Long-form Videos' },
    { id: 'other', label: 'Others' }
  ];

  const videoProjects = [
    {
      id: 1,
      category: 'saas',
      driveId: '12M0Geragz_zyjyR705OApi_1V4o8l-iB',
      url: 'https://drive.google.com/file/d/12M0Geragz_zyjyR705OApi_1V4o8l-iB/view',
      label: 'SaaS',
      title: 'Hook & Retention Reel',
      summary: 'Fast-paced short-form creative engineered for high retention and viewer engagement.'
    },
    {
      id: 2,
      category: 'saas',
      driveId: '1i1qqb6ZoZpEk5nkoIs33bea3Bm-DLu5k',
      url: 'https://drive.google.com/file/d/1i1qqb6ZoZpEk5nkoIs33bea3Bm-DLu5k/view',
      label: 'SaaS',
      title: 'Dynamic Social Edit',
      summary: 'Scroll-stopping visual pacing with kinetic text animation and seamless sound design.'
    },
    {
      id: 3,
      category: 'shortform',
      driveId: '10rbWvbVj8Ll1lVF90GHvoLIAjqkyg4Yv',
      url: 'https://drive.google.com/file/d/10rbWvbVj8Ll1lVF90GHvoLIAjqkyg4Yv/view',
      label: 'Short-form Reels',
      title: 'Viral Short-form Concept',
      summary: 'Punchy transitions and rhythmic cuts optimized for Instagram Reels and TikTok.'
    },
    {
      id: 4,
      category: 'longform',
      driveId: '1tVQcEh4yvOk-3b-phHFt2lj4jrHg_uEC',
      url: 'https://drive.google.com/file/d/1tVQcEh4yvOk-3b-phHFt2lj4jrHg_uEC/view',
      label: 'Long-form Videos',
      title: 'Top 3 VPS for Bot Trading',
      summary: 'Full structured breakdown detailing trading bot infrastructure with clear visual overlays.'
    },
    {
      id: 5,
      category: 'saas',
      driveId: '1SitdphOcuoYCNINLrWZlkAQP2ISZEMju',
      url: 'https://drive.google.com/file/d/1SitdphOcuoYCNINLrWZlkAQP2ISZEMju/view',
      label: 'SaaS',
      title: 'Perfect Motion Showcase',
      summary: 'High-end motion design, fluid graphics, and kinetic typography showcase.'
    },
    {
      id: 6,
      category: 'saas',
      driveId: '1c7eWaEmwBKCPHt-25BSwIMeIgVHvmkZP',
      url: 'https://drive.google.com/file/d/1c7eWaEmwBKCPHt-25BSwIMeIgVHvmkZP/view',
      label: 'SaaS',
      title: 'High-Converting Onboarding VSL',
      summary: 'Persuasive product onboarding video sales letter built to maximize conversion and clarity.'
    },
    {
      id: 7,
      category: 'saas',
      driveId: '1NQK4x6I0pmN1q_fzRJGzXMWXfXvU9ZY_',
      url: 'https://drive.google.com/file/d/1NQK4x6I0pmN1q_fzRJGzXMWXfXvU9ZY_/view',
      label: 'SaaS',
      title: 'Learnable Full Composition',
      summary: 'Comprehensive motion sequence blending 3D assets, UI elements, and branded motion.'
    },
    {
      id: 8,
      category: 'saas',
      youtubeId: '9fBqXX94hxY',
      url: 'https://www.youtube.com/watch?v=9fBqXX94hxY',
      label: 'SaaS',
      title: 'ShopBot Product Demo',
      summary: 'Sleek product walkthrough demonstrating software features with crisp timing and branded graphics.'
    },
    {
      id: 9,
      category: 'longform',
      youtubeId: 'iOw7PYt4OD8',
      url: 'https://youtube.com/@cashpracticesolution?si=TrferiFxA1oF7wkl',
      label: 'Long-form Videos',
      title: 'Cash Practice Solution — AI in Healthcare',
      summary: 'Comprehensive video essay and breakdown detailing AI systems and modern practice workflows.'
    },
    {
      id: 10,
      category: 'shortform',
      instagramId: 'Dew8nbkNXY7',
      url: 'https://www.instagram.com/reel/Dew8nbkNXY7/?xtok=MXBnMzl1dXRkeWpwdw==',
      label: 'Short-form Reels',
      title: 'High-Retention Instagram Reel #1',
      summary: 'Short-form viral reel featuring dynamic zooms, seamless typography, and sound design.'
    },
    {
      id: 11,
      category: 'shortform',
      instagramId: 'DeglmgPN3OH',
      url: 'https://www.instagram.com/reel/DeglmgPN3OH/?cplk=MThrbHZ6M212enY5Mw==',
      label: 'Short-form Reels',
      title: 'High-Retention Instagram Reel #2',
      summary: 'Scroll-stopping Instagram reel edit engineered for high hook rate and audience watch time.'
    }
  ];

  $: filteredVideos = activeFilter === 'all' 
    ? videoProjects 
    : videoProjects.filter(p => p.category === activeFilter);
</script>

<div class="portfolio-page">
  <!-- Dynamic Apple Wallpaper Background (Same as previous page) -->
  <div class="apple-bg-container" aria-hidden="true">
    <div class="apple-bg-image"></div>
    <div class="apple-bg-overlay"></div>
  </div>

  <!-- NAVBAR (APPLE FROSTED GLASS) -->
  <nav class="apple-glass">
    <div class="container">
      <div class="nav-inner">
        <a href="/" class="nav-logo" on:click={(e) => handleNavigate(e, '/')}>
          Chizuruoke<span class="logo-accent">.</span>
        </a>

        <ul class="nav-links">
          <li><a href="#video-editing">Video</a></li>
          <li><a href="#about">About</a></li>
        </ul>

        <div class="nav-actions">
          <!-- Light / Dark Theme Switcher -->
          <button 
            type="button"
            class="theme-toggle" 
            on:click={toggleTheme} 
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {#if isDarkMode}
              <!-- Sun Icon -->
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
              <!-- Moon Icon -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            {/if}
          </button>

          <a 
            href="https://www.instagram.com/chizzyvfx/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-secondary nav-cta"
          >
            Follow on IG
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- MAIN CONTAINER -->
  <div class="container">
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-badge">
        <span class="status-dot"></span>
        <span>Video Editor &amp; Content Specialist • UTC+1</span>
      </div>

      <h1>Video Editor &amp; Content Specialist</h1>

      <p class="hero-tagline">
        I'm <strong>Chizuruoke Amaefule</strong>. I craft high-impact videos and visual content that capture attention, engage audiences, and drive high-converting action.
      </p>

      <div class="hero-actions">
        <a href="#video-editing" class="btn btn-primary hero-btn">
          <span>Explore My Work</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"></path>
          </svg>
        </a>

        <a 
          href="https://www.instagram.com/chizzyvfx/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn btn-secondary hero-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span>Follow on IG</span>
        </a>
      </div>
    </section>

    <!-- STATS BAR (APPLE GLASS METRICS) -->
    <div class="stats-bar apple-card apple-glass">
      <div class="stat-item">
        <div class="stat-number">10<span class="accent-color">+</span></div>
        <div class="stat-label">Video Projects</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">3<span class="accent-color">y</span></div>
        <div class="stat-label">Timeline Craft</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">100<span class="accent-color">%</span></div>
        <div class="stat-label">Conversion Focus</div>
      </div>
    </div>

    <!-- VIDEO EDITING SECTION -->
    <section id="video-editing">
      <div class="section-header">
        <span class="section-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
          Showcase
        </span>
        <h2 class="section-title">Video Editing</h2>
        <div class="section-line"></div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="video-filters-wrapper">
        <div class="video-filters apple-glass">
          {#each filterCategories as cat}
            <button 
              type="button"
              class="filter-btn {activeFilter === cat.id ? 'active' : ''}" 
              on:click={() => activeFilter = cat.id}
            >
              {cat.label}
            </button>
          {/each}
        </div>
      </div>

      <!-- Video Grid -->
      <div class="video-grid">
        {#each filteredVideos as video (video.id)}
          <div class="video-card apple-card">
            <div class="video-wrap">
              {#if video.driveId}
                <iframe 
                  src="https://drive.google.com/file/d/{video.driveId}/preview" 
                  title={video.title}
                  allow="autoplay; fullscreen" 
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              {:else if video.youtubeId}
                <iframe 
                  src="https://www.youtube-nocookie.com/embed/{video.youtubeId}?rel=0&modestbranding=1" 
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              {:else if video.instagramId}
                <iframe 
                  src="https://www.instagram.com/reel/{video.instagramId}/embed" 
                  title={video.title}
                  allowtransparency="true"
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              {:else}
                <div class="video-placeholder">
                  <div class="placeholder-play-circle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span class="placeholder-text">Video Link Ready</span>
                </div>
              {/if}
            </div>
            <div class="video-info">
              <div class="video-info-top">
                <span class="video-label">{video.label}</span>
                {#if video.url}
                  <a 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="video-ext-link"
                    title={video.driveId ? 'Open on Google Drive' : video.instagramId ? 'Open on Instagram' : 'Open on YouTube'}
                    aria-label={`Open ${video.title}`}
                  >
                    <span>{video.driveId ? 'Drive' : video.instagramId ? 'Instagram' : 'YouTube'}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                {/if}
              </div>
              <h3 class="video-title">{video.title}</h3>
              <p class="video-summary">{video.summary}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section id="about">
      <div class="section-header">
        <span class="section-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Profile
        </span>
        <h2 class="section-title">About Me</h2>
        <div class="section-line"></div>
      </div>

      <div class="about-card apple-card apple-glass">
        <div class="about-content">
          <p>Hi, I'm <strong>Chizuruoke Amaefule</strong> — a video editor and content specialist with years of hands-on experience behind the timeline.</p>
          <p>I don't just cut footage for aesthetic appeal — every cut, hook, and pacing decision is crafted with one guiding principle: <span class="conversion-glow">CONVERSION</span> and viewer retention.</p>
          <p><strong>Tools I use:</strong> <span class="tools-pill">Adobe Premiere Pro</span> <span class="tools-pill">After Effects</span> <span class="tools-pill">DaVinci Resolve</span></p>
          <p>When I'm not editing high-converting assets, you'll find me analyzing media trends, refining storytelling frameworks, and exploring new creative directions.</p>
        </div>
      </div>
    </section>
  </div>

  <!-- FOOTER -->
  <footer class="apple-glass">
    <div class="container">
      <p>Crafted with care by <strong>Chizuruoke Amaefule</strong> — Video Editor &amp; Content Specialist</p>
      <div class="footer-links">
        <a href="#video-editing">Video</a>
        <span class="sep">•</span>
        <a href="#about">About</a>
        <span class="sep">•</span>
        <a href="/content-strategist" on:click={(e) => handleNavigate(e, '/content-strategist')}>Content Strategist</a>
      </div>
    </div>
  </footer>
</div>

<style>
  /* =========================================
     APPLE DESIGN SYSTEM - SITE COLOR PALETTE
  ========================================= */
  .portfolio-page {
    position: relative;
    min-height: 100vh;
    color: var(--text-primary);
    line-height: 1.65;
    overflow-x: hidden;
  }

  /* LAYOUT & CONTAINER */
  .container {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  /* NAVBAR */
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 12px 0;
    border-bottom: 1px solid var(--border-color);
    transition: all var(--transition);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: opacity var(--duration-fast) var(--ease-apple);
  }

  .nav-logo:hover {
    opacity: 0.85;
  }

  .logo-accent {
    color: var(--accent-blue);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
  }

  .nav-links a {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-apple);
    letter-spacing: -0.01em;
  }

  .nav-links a:hover {
    color: var(--text-primary);
  }


  .nav-actions {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .theme-toggle {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    width: 38px;
    height: 38px;
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

  .nav-cta {
    padding: 0.5rem 1.15rem;
    font-size: 0.86rem;
  }

  /* HERO SECTION */
  .hero {
    padding: 6.5rem 0 4.5rem;
    text-align: center;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.4rem 1.15rem;
    border-radius: var(--radius-pill);
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-sm);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--accent-green);
    box-shadow: 0 0 10px rgba(52, 199, 89, 0.6);
    animation: pulse-dot 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse-dot {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.4;
      transform: scale(0.85);
    }
  }

  .hero h1 {
    font-size: clamp(2.4rem, 5.5vw, 4.2rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    color: var(--text-primary);
  }

  .hero-tagline {
    font-size: 1.15rem;
    color: var(--text-secondary);
    max-width: 620px;
    margin: 0 auto 2.8rem;
    line-height: 1.7;
    letter-spacing: -0.01em;
  }

  .hero-tagline strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.1rem;
    flex-wrap: wrap;
  }

  .hero-btn {
    padding: 0.85rem 1.85rem;
    font-size: 0.95rem;
  }

  /* STATS BAR */
  .stats-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3.5rem;
    padding: 2.2rem 2rem;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-md);
    margin-bottom: 5.5rem;
    flex-wrap: wrap;
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: 2.3rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: var(--text-primary);
    line-height: 1.1;
  }

  .accent-color {
    color: var(--accent-blue);
  }

  .stat-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 0.35rem;
  }

  /* SECTION HEADERS */
  .section-header {
    display: flex;
    align-items: center;
    gap: 1.1rem;
    margin-bottom: 2.5rem;
  }

  .section-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.38rem 1rem;
    border-radius: var(--radius-pill);
    background: rgba(0, 113, 227, 0.08);
    border: 1px solid rgba(0, 113, 227, 0.25);
    font-size: 0.74rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-blue);
    white-space: nowrap;
  }

  .section-title {
    font-size: 1.9rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text-primary);
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--border-color) 0%, rgba(0, 113, 227, 0.2) 40%, transparent 100%);
  }

  /* VIDEO SECTION & SEGMENTED FILTER */
  #video-editing {
    margin-bottom: 6rem;
  }

  .video-filters-wrapper {
    display: flex;
    justify-content: center;
  }

  .video-filters {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.4rem;
    border-radius: var(--radius-pill);
    margin: 0 auto 3rem;
    box-shadow: var(--shadow-sm);
  }

  .filter-btn {
    font-size: 0.86rem;
    font-weight: 600;
    color: var(--text-secondary);
    background: transparent;
    border: none;
    border-radius: var(--radius-pill);
    padding: 0.55rem 1.3rem;
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-apple);
    letter-spacing: -0.01em;
  }

  .filter-btn:hover {
    color: var(--text-primary);
    background: var(--bg-secondary);
  }

  .filter-btn.active {
    color: #ffffff;
    background: var(--accent-blue);
    box-shadow: 0 4px 14px var(--accent-blue-glow);
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.75rem;
  }

  /* Project Card */
  .video-card {
    position: relative;
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: transform var(--duration-base) var(--ease-apple), box-shadow var(--duration-base) var(--ease-apple), border-color var(--duration-fast) var(--ease-apple);
  }

  .video-card:hover {
    border-color: var(--accent-blue);
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
  }

  .video-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: var(--bg-tertiary);
    overflow: hidden;
  }

  .video-wrap iframe {
    width: 100%;
    height: 100%;
    display: block;
    border: none;
  }

  .video-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.45) 100%);
    backdrop-filter: blur(8px);
    transition: all var(--duration-fast) var(--ease-apple);
  }

  .placeholder-play-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--accent-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 3px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    transition: transform var(--duration-fast) var(--ease-apple);
  }

  .video-card:hover .placeholder-play-circle {
    transform: scale(1.1);
    background: var(--accent-blue);
    color: #ffffff;
    box-shadow: 0 6px 20px var(--accent-blue-glow);
  }

  .placeholder-text {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  .video-info {
    padding: 1.35rem 1.5rem 1.5rem;
    position: relative;
  }

  .video-info-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.7rem;
  }

  .video-label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-pill);
    background: rgba(0, 113, 227, 0.08);
    border: 1px solid rgba(0, 113, 227, 0.22);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--accent-blue);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 0;
  }

  .video-ext-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-apple), transform var(--duration-fast) var(--ease-apple);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
  }

  .video-ext-link:hover {
    color: var(--accent-blue);
    transform: translateX(1px);
  }

  .video-title {
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 0.45rem;
    color: var(--text-primary);
  }

  .video-summary {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* ABOUT SECTION */
  #about {
    margin-bottom: 6.5rem;
  }

  .about-card {
    border-radius: var(--radius-2xl);
    padding: 3rem 3.2rem;
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
  }

  .about-content {
    max-width: 820px;
    color: var(--text-secondary);
    font-size: 1.1rem;
    line-height: 1.85;
    letter-spacing: -0.01em;
  }

  .about-content p {
    margin-bottom: 1.5rem;
  }

  .about-content p:last-child {
    margin-bottom: 0;
  }

  .about-content strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  .conversion-glow {
    color: var(--accent-blue);
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .tools-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0.85rem;
    border-radius: var(--radius-pill);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0 0.25rem;
  }

  /* FOOTER */
  footer {
    text-align: center;
    padding: 3.5rem 0;
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  footer strong {
    color: var(--text-primary);
  }

  .footer-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    margin-top: 0.8rem;
    font-size: 0.84rem;
  }

  .footer-links a {
    color: var(--accent-blue);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--duration-fast) var(--ease-apple);
  }

  .footer-links a:hover {
    color: var(--accent-blue-hover);
    text-decoration: underline;
  }

  .sep {
    color: var(--text-tertiary);
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .container {
      padding: 0 1.25rem;
    }

    .nav-links {
      display: none;
    }

    .hero {
      padding: 4.5rem 0 3.5rem;
    }

    .stats-bar {
      gap: 1.8rem;
      padding: 1.75rem 1rem;
    }

    .about-card {
      padding: 2rem 1.5rem;
    }

    .video-filters {
      border-radius: 18px;
    }
  }
</style>
