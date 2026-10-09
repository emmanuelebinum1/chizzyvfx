<script>
  import './app.css';

  // Theme Management (Light / Dark)
  let isDarkMode = false;
  function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }


  // Active pricing tier selection
  let selectedTier = 0;
  const tiers = [
    {
      price: '₦250k',
      period: '/mo',
      name: 'Starting tier',
      metric: 'Where every client begins',
      scope: 'Full scope, from day one',
      popular: true
    },
    {
      price: '₦350k',
      period: '/mo',
      name: 'Tier 2',
      metric: 'After 50k views across platforms + 50 tracked leads in a month',
      scope: 'Same scope, proven results',
      popular: false
    },
    {
      price: '₦500k',
      period: '/mo',
      name: 'Tier 3',
      metric: 'After 150k views across platforms + 150 tracked leads in a month',
      scope: 'Full rate, full engine',
      popular: false
    },
    {
      price: '₦700k',
      period: '/mo',
      name: 'Tier 4',
      metric: 'After 400k views across platforms + 400 tracked leads in a month',
      scope: 'Scaled engine, scaled rate',
      popular: false
    },
    {
      price: '₦950k',
      period: '/mo',
      name: 'Tier 5',
      metric: 'After 1M views across platforms + 1,000 tracked leads in a month',
      scope: 'Top tier, full team behind it',
      popular: false
    }
  ];

  // Lead magnet email submission
  let emailInput = '';
  let emailSubmitted = false;
  function handleEmailSubmit() {
    if (emailInput.trim()) {
      emailSubmitted = true;
      setTimeout(() => {
        emailSubmitted = false;
        emailInput = '';
      }, 4000);
    }
  }

  // Active Video/Showcase Modal
  let activeWork = null;

  const espreHero = {
    id: 'youtube-main',
    type: 'youtube',
    platform: 'YouTube',
    category: 'YouTube Pillar Video',
    badge: 'YouTube Long-Form • 16:9 4K',
    title: "Healthcare Doesn't Understand the Patient",
    subtitle: "Episode 1 • Esprē Health Podcast",
    description: "Complete end-to-end production: dynamic multi-camera switching, narrative pacing hooks, b-roll insertions, custom graphics, and engineered sound design that command high-ticket healthcare authority.",
    thumbnail: '/espre-youtube.jpg',
    url: 'https://youtu.be/iOw7PYt4OD8?si=Ye4NyHF9UTWmJuAV',
    embedUrl: 'https://www.youtube.com/embed/iOw7PYt4OD8?autoplay=1',
    features: [
      'Multi-Cam 4K Switching & Grade',
      'Dynamic B-Roll & Visual Hooks',
      'Engineered Broadcast Audio Master'
    ]
  };

  const espreSocialItems = [
    {
      id: 'reel-short',
      type: 'instagram',
      platform: 'Instagram',
      format: 'Short Form Reel',
      badge: 'Instagram Reel • 9:16',
      title: 'High-Retention Algorithmic Cut',
      description: 'A 45-second micro-story engineered for the FYP explore algorithm with kinetic typography, audio soundscapes, and rapid zoom transitions.',
      url: 'https://www.instagram.com/reel/DagHXkEj0SW/?stkn=MW9qYXI3YTkwOHAzbg==',
      embedUrl: 'https://www.instagram.com/reel/DagHXkEj0SW/embed/',
      tag: 'Explore Algorithm Hook',
      aspectRatio: '9/16'
    },
    {
      id: 'reel-engagement',
      type: 'instagram',
      platform: 'Instagram',
      format: 'Engagement Reel',
      badge: 'Instagram Reel • 9:16',
      title: 'Founder Perspective & Discussion',
      description: 'Core thought-leadership moment extracted from the interview, formatted to spark debate, founder DMs, and community shares.',
      url: 'https://www.instagram.com/reel/DadXBqaDmnx/?stkn=MWd6NXd1eDVtZ2V1eQ==',
      embedUrl: 'https://www.instagram.com/reel/DadXBqaDmnx/embed/',
      tag: 'Clinical Insight & Debate',
      aspectRatio: '9/16'
    },
    {
      id: 'carousel-post',
      type: 'instagram',
      platform: 'Instagram',
      format: 'Carousel Post',
      badge: 'Instagram Carousel • 1:1',
      title: 'Key Takeaways & Framework Slides',
      description: 'Multi-slide educational deck breaking down complex healthcare systems into digestible, bookmark-worthy infographics that drive profile visits.',
      url: 'https://www.instagram.com/p/DZDmyn_kjDN/?stkn=MWJ2bDRjMXByNDNjMQ==',
      embedUrl: 'https://www.instagram.com/p/DZDmyn_kjDN/embed/',
      tag: 'Save-Optimized Deck',
      aspectRatio: '1/1'
    }
  ];

  // Booking Qualification Modal State
  let isBookingOpen = false;
  let bookingStep = 1; // 1 = questions, 2 = calendar/contact, 3 = confirmed

  // Qualification Questions
  let hasOffer = 'yes'; // 'yes', 'refining', 'no'
  let leadSystem = 'ads'; // 'ads', 'organic', 'none'
  let contentGoal = 'leads'; // 'leads', 'authority', 'followers'

  // Booking user details
  let userName = '';
  let userEmail = '';
  let userHandle = '';

  // Calendar dates helper (14 upcoming business days)
  function getCalendarDays() {
    const start = new Date(2026, 9, 6);
    const days = [];
    let cur = new Date(start);
    while (days.length < 14) {
      if (cur.getDay() !== 0 && cur.getDay() !== 6) {
        days.push(new Date(cur));
      }
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  }

  const calendarDays = getCalendarDays();
  let selectedDate = calendarDays[0];
  let selectedTimeSlot = '2:00 PM';
  const timeSlots = ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'];

  function openBookingModal() {
    isBookingOpen = true;
    bookingStep = 1;
  }

  function closeBookingModal() {
    isBookingOpen = false;
  }

  function formatDate(d) {
    if (!d) return '';
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function formatFullDate(d) {
    if (!d) return '';
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }
</script>

<div class="site-wrapper">
  <!-- Dynamic Apple Wallpaper Background (Light: Blue Wave / Dark: Abstract Grey/Dark Wave) -->
  <div class="apple-bg-container" aria-hidden="true">
    <div class="apple-bg-image"></div>
    <div class="apple-bg-overlay"></div>
  </div>

  <!-- Apple-Style Navigation Bar -->
  <nav class="navbar apple-glass">
    <div class="nav-container">
      <a href="/" class="brand">
        <span class="brand-text">Chizzy<span class="brand-accent">VFX</span></span>
      </a>

      <div class="nav-links">
        <a href="#services" class="nav-item">Services</a>
        <a href="#process" class="nav-item">Process</a>
        <a href="#pricing" class="nav-item">Pricing</a>
        <a href="#work" class="nav-item">Work</a>
      </div>

      <div class="nav-actions">
        <!-- Apple-style Light/Dark Mode Switcher -->
        <button 
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

        <button type="button" class="btn btn-primary nav-cta" on:click={openBookingModal}>
          Book a Call
        </button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="hero-section">
    <div class="hero-container">
      <div class="status-pill animate-fade-in">
        <span class="status-dot"></span>
        <span class="status-label">ChizzyVFX — Content Specialist Team</span>
      </div>

      <h1 class="hero-title animate-fade-in">
        Don't just hire an editor.<br>
        Hire a content <span class="gradient-text">specialist.</span>
      </h1>

      <p class="hero-description animate-fade-in">
        Get a specialist team that strategizes, scripts, edits, repurposes, and schedules your content — for roughly half of what a traditional setup costs. We only raise our price after your content hits specific, agreed numbers.
      </p>

      <div class="hero-actions animate-fade-in">
        <button type="button" class="btn btn-primary hero-btn" on:click={openBookingModal}>
          <span>Book a strategy call</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        <a href="#work" class="btn btn-secondary hero-btn">
          <span>See our work</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Video Showcase Section -->
  <section class="video-section" id="video">
    <div class="section-container">
      <div class="video-card apple-card">
        <div class="video-card-header">
          <div class="video-meta">
            <span class="badge-pill">Overview</span>
            <span class="video-author">A message from Chizzy — 2 min</span>
          </div>
        </div>

        <div class="video-frame-container">
          <iframe 
            src="https://drive.google.com/file/d/1YSwXEPACpG1911hAzZsBEuWAE4EmW9if/preview" 
            title="A message from Chizzy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- The Problem Section (Apple Bento Style) -->
  <section class="problem-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-eyebrow">Reality Check</span>
        <h2>The problem, if you're honest about it.</h2>
        <p class="section-sub">Content should create leverage for your business, not become another full-time management headache.</p>
      </div>

      <div class="problem-grid">
        <div class="problem-card apple-card">
          <div class="problem-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
          </div>
          <h4>Disconnected from Sales</h4>
          <p>You know content should be driving your sales, but it's sitting separate from your ads and outreach instead of reinforcing them.</p>
        </div>

        <div class="problem-card apple-card">
          <div class="problem-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h4>Manager Burnout</h4>
          <p>You're either doing it all yourself between actual client work, or paying for pieces of it — an editor here, a scriptwriter there — and still managing all of them.</p>
        </div>

        <div class="problem-card apple-card">
          <div class="problem-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          </div>
          <h4>Wasted Longform Footage</h4>
          <p>You have long-form content sitting on YouTube that never gets repurposed into shorts, reels, or text content across other channels.</p>
        </div>

        <div class="problem-card apple-card">
          <div class="problem-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h4>Zero Lead Capture</h4>
          <p>You don't have a lead magnet funnel turning your content into an actual list, so views come and go with nothing captured.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- What We Actually Do (Apple Bento Grid) -->
  <section id="services" class="services-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-eyebrow">End-to-End Engine</span>
        <h2>What we actually do.</h2>
        <p class="section-sub">A complete production system built to transform raw footage into consistent authority and inbound leads.</p>
      </div>

      <div class="services-bento">
        <!-- 1: Strategy & scripts -->
        <div class="bento-card bento-wide apple-card">
          <div class="bento-badge">01</div>
          <div class="bento-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h3>Strategy & scripts</h3>
          <p>We plan what gets said and why, before a camera or timeline is touched. Every script has a hook, a retention arc, and a clear business call-to-action.</p>
        </div>

        <!-- 2: Long-form editing -->
        <div class="bento-card apple-card">
          <div class="bento-badge">02</div>
          <div class="bento-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
          </div>
          <h3>Long-form editing</h3>
          <p>Your YouTube longs, edited for retention — not just superficial polish. Pacing, graphics, and sound design tailored to keep watch time high.</p>
        </div>

        <!-- 3: Repurposing -->
        <div class="bento-card apple-card">
          <div class="bento-badge">03</div>
          <div class="bento-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </div>
          <h3>Repurposing</h3>
          <p>Every longform video becomes shorts, high-engagement reels, carousels, and tweets formatted natively for each channel's algorithm.</p>
        </div>

        <!-- 4: Platform management -->
        <div class="bento-card apple-card">
          <div class="bento-badge">04</div>
          <div class="bento-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3>Platform management</h3>
          <p>YouTube, Instagram, LinkedIn, and Twitter — scheduled, formatted, and published on time without you having to lift a finger.</p>
        </div>

        <!-- 5: Lead magnet funnels -->
        <div class="bento-card apple-card">
          <div class="bento-badge">05</div>
          <div class="bento-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </div>
          <h3>Lead magnet funnels</h3>
          <p>2–3 custom lead capture funnels built directly into your content, turning fleeting views into subscribers and booked calls.</p>
        </div>

        <!-- 6: You approve, we run it -->
        <div class="bento-card bento-wide apple-card highlight-card">
          <div class="bento-badge">06</div>
          <div class="bento-icon accent-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3>You approve, we run it</h3>
          <p>Your weekly commitment is minimal: you review source prompts, shoot your raw footage, and click approve on the deliverables. That's it.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Who This Is For (Apple Comparison Format) -->
  <section class="audience-section">
    <div class="section-container">
      <div class="audience-container apple-card">
        <div class="audience-header">
          <span class="section-eyebrow">Qualification</span>
          <h2>Who this is for.</h2>
          <p>We work best with companies and creators who already have validated market traction.</p>
        </div>

        <div class="audience-list">
          <div class="audience-item fit">
            <div class="check-icon">✓</div>
            <div>
              <strong>You already have an offer that sells</strong>
              <p>This system reinforces and scales your existing product or service — it doesn't invent product-market fit.</p>
            </div>
          </div>

          <div class="audience-item fit">
            <div class="check-icon">✓</div>
            <div>
              <strong>You're already running lead generation</strong>
              <p>You have ads, active outreach, or a proven system of lead generation and closing ready to receive more traffic.</p>
            </div>
          </div>

          <div class="audience-item fit">
            <div class="check-icon">✓</div>
            <div>
              <strong>You want content pushing leads toward conversion</strong>
              <p>You care about qualified pipeline and revenue — not vanity metrics or views for their own sake.</p>
            </div>
          </div>

          <div class="audience-item not-fit">
            <div class="cross-icon">✕</div>
            <div>
              <strong>Not for you yet if you have no sales motion at all</strong>
              <p>Content cannot be your only business mechanism. If you don't know how to sell your offer yet, pause and build that first.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How We Do It (Numbered Progressive Flow) -->
  <section id="process" class="process-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-eyebrow">Methodology</span>
        <h2>How we do it.</h2>
        <p class="section-sub">A streamlined five-step protocol designed for zero friction and predictable outputs.</p>
      </div>

      <div class="process-steps">
        <div class="process-card apple-card">
          <div class="step-num">1</div>
          <div class="step-body">
            <h4>You shoot, we script</h4>
            <p>You send raw footage and source prompts. We turn that into scripted, structured longform ready to produce.</p>
          </div>
        </div>

        <div class="process-card apple-card">
          <div class="step-num">2</div>
          <div class="step-body">
            <h4>We edit and repurpose</h4>
            <p>Longform gets edited with retention pacing, then cut into shorts, reels, carousels, and tweets.</p>
          </div>
        </div>

        <div class="process-card apple-card">
          <div class="step-num">3</div>
          <div class="step-body">
            <h4>We build the funnel</h4>
            <p>A lead magnet funnel is built and tracked, giving your engaged audience somewhere clear to convert.</p>
          </div>
        </div>

        <div class="process-card apple-card">
          <div class="step-num">4</div>
          <div class="step-body">
            <h4>We post and manage</h4>
            <p>Everything goes out across your platforms on schedule, formatted natively without you touching it.</p>
          </div>
        </div>

        <div class="process-card apple-card">
          <div class="step-num">5</div>
          <div class="step-body">
            <h4>You get a report</h4>
            <p>Views and leads tracked through our own funnel and links — no guessing, no disputed numbers.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section (Apple Style Tiers) -->
  <section id="pricing" class="pricing-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-eyebrow">Fair Performance Model</span>
        <h2>Pricing — we start low, and earn our way up.</h2>
        <p class="section-sub">We're result-focused, so we start below our normal rate and only increase it once your content hits specific, tracked metrics.</p>
      </div>

      <!-- Comparison Callout -->
      <div class="pricing-comparison apple-card">
        <div class="comp-col traditional">
          <span class="comp-tag">Traditional Setup</span>
          <div class="strikethrough-price">₦450k+</div>
          <p>SMM + Video Editor + Scriptwriter, separately managed & paid.</p>
        </div>

        <div class="comp-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>

        <div class="comp-col chizzy">
          <span class="comp-tag active-tag">Starting With Us</span>
          <div class="chizzy-price">₦250k<span>/mo</span></div>
          <p>One unified specialist team, zero management overhead, full execution.</p>
        </div>
      </div>

      <!-- Tier Selection Cards -->
      <div class="tiers-container">
        {#each tiers as tier, index}
          <button 
            type="button"
            class="tier-row apple-card {selectedTier === index ? 'selected' : ''}"
            on:click={() => selectedTier = index}
          >
            <div class="tier-price-col">
              <span class="tier-amount">{tier.price}</span>
              <span class="tier-period">{tier.period}</span>
            </div>

            <div class="tier-info-col">
              <div class="tier-title-row">
                <span class="tier-name">{tier.name}</span>
                {#if tier.popular}
                  <span class="tier-pill">Current Starting Tier</span>
                {/if}
              </div>
              <p class="tier-metric">{tier.metric}</p>
            </div>

            <div class="tier-scope-col">
              <span class="scope-text">{tier.scope}</span>
            </div>
          </button>
        {/each}
      </div>

      <p class="pricing-disclaimer">
        Leads are tracked through the funnel and links we build and run for you — you get a report showing exactly where every view and lead came from.
      </p>
    </div>
  </section>

  <!-- Proof of Work / Portfolio Showcase (Apple Bento Grid Showcase) -->
  <section id="work" class="work-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-eyebrow">Client Case Study</span>
        <h2>Proof of work: Esprē Health.</h2>
        <p class="section-sub">
          One long-form podcast conversation engineered into an omnipresent multi-channel distribution engine across YouTube and Instagram.
        </p>
      </div>

      <!-- Apple Bento Grid for Esprē Health -->
      <div class="espre-bento-grid">
        <!-- Hero Bento Card: YouTube Pillar Video (16:9 Anchor) -->
        <div class="bento-hero-card apple-card">
          <div class="bento-hero-grid">
            <!-- Left: Video Thumbnail Container with Apple Play Badge -->
            <div 
              class="hero-media-wrapper" 
              role="button" 
              tabindex="0"
              on:click={() => activeWork = espreHero}
              on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (activeWork = espreHero)}
              aria-label="Play Esprē Health YouTube Full Episode"
            >
              <img 
                src={espreHero.thumbnail} 
                alt="Esprē Health Episode 1 YouTube Thumbnail" 
                class="hero-media-img" 
                loading="lazy"
              />
              <div class="media-overlay-gradient"></div>
              
              <div class="media-top-badge">
                <span class="pill-badge apple-glass">
                  <span class="status-dot yt-dot"></span>
                  {espreHero.badge}
                </span>
              </div>

              <div class="bento-play-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>

              <div class="media-bottom-info">
                <span class="media-hint">Click to preview inside player</span>
              </div>
            </div>

            <!-- Right: Production Details and Conversion System -->
            <div class="bento-hero-content">
              <div class="hero-content-eyebrow">
                <span class="category-pill">{espreHero.category}</span>
                <span class="client-pill">Esprē Health</span>
              </div>

              <h3 class="hero-episode-title">{espreHero.title}</h3>
              <p class="hero-episode-subtitle">{espreHero.subtitle}</p>
              
              <p class="hero-episode-desc">{espreHero.description}</p>

              <div class="hero-features-list">
                {#each espreHero.features as feat}
                  <div class="feature-chip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{feat}</span>
                  </div>
                {/each}
              </div>

              <div class="hero-action-buttons">
                <button 
                  type="button" 
                  class="btn btn-primary hero-watch-btn" 
                  on:click={() => activeWork = espreHero}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Watch Episode</span>
                </button>

                <a 
                  href={espreHero.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-secondary hero-link-btn"
                >
                  <span>Open on YouTube</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Transition Banner: Repurposing Breakdown -->
        <div class="bento-divider-header">
          <div class="divider-line"></div>
          <span class="divider-text">Downstream Repurposed Assets (From The Same Recording)</span>
          <div class="divider-line"></div>
        </div>

        <!-- 3 Social Assets Grid (Short Form Reels, Engagement Reels, Carousel Posts) -->
        <div class="bento-social-grid">
          {#each espreSocialItems as item}
            <div class="social-bento-card apple-card">
              <!-- Card Media Mockup -->
              <div 
                class="social-mockup-wrap" 
                role="button" 
                tabindex="0"
                on:click={() => activeWork = item}
                on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (activeWork = item)}
                aria-label={`Preview ${item.title}`}
              >
                <!-- Visual Background Mockup Canvas -->
                <div class="social-canvas {item.format === 'Carousel Post' ? 'canvas-carousel' : 'canvas-reel'}">
                  <div class="social-backdrop-blur"></div>
                  
                  <!-- Format Indicator -->
                  <div class="social-top-row">
                    <span class="pill-badge apple-glass ig-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      {item.format}
                    </span>
                    <span class="ratio-pill">{item.aspectRatio}</span>
                  </div>

                  <!-- Center Graphic Preview -->
                  {#if item.format === 'Carousel Post'}
                    <div class="carousel-deck-preview">
                      <div class="slide-stack slide-3"></div>
                      <div class="slide-stack slide-2"></div>
                      <div class="slide-main">
                        <div class="slide-header-mini">
                          <span class="slide-espre-tag">Esprē Health</span>
                          <span class="slide-num">1 / 7</span>
                        </div>
                        <p class="slide-mock-headline">Why Traditional Healthcare Misses The Patient Voice</p>
                        <div class="slide-bar-decor"></div>
                      </div>
                    </div>
                  {:else}
                    <div class="reel-mockup-frame">
                      <div class="reel-play-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <div class="audio-wave-bars">
                        <span></span><span></span><span></span><span></span><span></span>
                      </div>
                    </div>
                  {/if}

                  <!-- Bottom Tag -->
                  <div class="social-bottom-tag">
                    <span class="strategy-tag">{item.tag}</span>
                  </div>
                </div>
              </div>

              <!-- Card Meta & Content -->
              <div class="social-card-body">
                <span class="social-badge-text">{item.badge}</span>
                <h4 class="social-title">{item.title}</h4>
                <p class="social-desc">{item.description}</p>
                
                <div class="social-card-footer">
                  <button 
                    type="button" 
                    class="btn btn-secondary social-preview-btn" 
                    on:click={() => activeWork = item}
                  >
                    <span>Preview</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>

                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="social-external-link"
                    aria-label={`Open ${item.title} on Instagram`}
                  >
                    <span>Instagram</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive Project Video / Embed Modal -->
  {#if activeWork}
    <div 
      class="modal-backdrop" 
      role="presentation"
      on:click={() => activeWork = null}
      on:keydown={(e) => e.key === 'Escape' && (activeWork = null)}
    >
      <div 
        class="modal-dialog apple-glass apple-card showcase-modal {activeWork.type === 'instagram' ? 'modal-instagram' : 'modal-youtube'}" 
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        on:click|stopPropagation
        on:keydown|stopPropagation
      >
        <button class="modal-close-btn" on:click={() => activeWork = null} aria-label="Close dialog">✕</button>
        
        <div class="modal-header">
          <div class="modal-header-pills">
            <span class="badge-pill">Esprē Health</span>
            <span class="badge-pill platform-badge {activeWork.platform === 'YouTube' ? 'badge-yt' : 'badge-ig'}">
              {activeWork.badge}
            </span>
          </div>
          <h3>{activeWork.title}</h3>
        </div>

        <div class="modal-embed-container">
          {#if activeWork.type === 'youtube'}
            <div class="video-iframe-wrapper">
              <iframe 
                src={activeWork.embedUrl} 
                title={activeWork.title}
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
              ></iframe>
            </div>
          {:else}
            <div class="instagram-iframe-wrapper">
              <iframe 
                src={activeWork.embedUrl} 
                title={activeWork.title}
                frameborder="0" 
                scrolling="no" 
                allowtransparency="true"
              ></iframe>
            </div>
          {/if}
        </div>

        <div class="modal-footer-custom">
          <a 
            href={activeWork.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-secondary modal-ext-btn"
          >
            <span>Open on {activeWork.platform}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>

          <button 
            type="button" 
            class="btn btn-primary modal-cta-btn" 
            on:click={() => { activeWork = null; openBookingModal(); }}
          >
            <span>Book Strategy Call</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Apple-Style Qualification & Calendar Booking Modal -->
  {#if isBookingOpen}
    <div 
      class="modal-backdrop booking-backdrop" 
      role="presentation"
      on:click={closeBookingModal}
      on:keydown={(e) => e.key === 'Escape' && closeBookingModal()}
    >
      <div 
        class="modal-dialog booking-dialog apple-glass apple-card" 
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        on:click|stopPropagation
        on:keydown|stopPropagation
      >
        <button class="modal-close-btn" on:click={closeBookingModal} aria-label="Close booking modal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Apple Segmented Step Indicator -->
        <div class="booking-header">
          <div class="apple-step-bar" role="tablist">
            <button 
              type="button" 
              class="step-segment {bookingStep === 1 ? 'active' : ''} {bookingStep > 1 ? 'completed' : ''}"
              on:click={() => { if (bookingStep === 2) bookingStep = 1; }}
              disabled={bookingStep === 3}
            >
              <span class="step-num">
                {#if bookingStep > 1}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                {:else}
                  1
                {/if}
              </span>
              <span class="step-text">Qualification</span>
            </button>

            <button 
              type="button" 
              class="step-segment {bookingStep === 2 ? 'active' : ''} {bookingStep > 2 ? 'completed' : ''}"
              disabled={bookingStep !== 2}
            >
              <span class="step-num">
                {#if bookingStep > 2}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                {:else}
                  2
                {/if}
              </span>
              <span class="step-text">Date & Time</span>
            </button>

            <div class="step-segment {bookingStep === 3 ? 'active completed' : ''}">
              <span class="step-num">
                {#if bookingStep === 3}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                {:else}
                  3
                {/if}
              </span>
              <span class="step-text">Confirmed</span>
            </div>
          </div>

          <div class="booking-header-text">
            {#if bookingStep === 1}
              <h3 class="booking-title">Book a Strategy Call</h3>
              <p class="booking-sub">Let's quickly confirm our content engine fits your current business setup.</p>
            {:else if bookingStep === 2}
              <h3 class="booking-title">Choose Your Time</h3>
              <p class="booking-sub">Select an available slot for a 20-minute strategy session on Google Meet.</p>
            {/if}
          </div>
        </div>

        {#if bookingStep === 1}
          <!-- Step 1: Qualification Questions -->
          <div class="qualification-questions">
            
            <!-- Question 1: Offer -->
            <div class="q-block">
              <span class="q-label">
                <span class="q-num">1</span>
                <span>Do you currently have an offer that sells?</span>
              </span>
              <div class="options-grid">
                <button 
                  type="button" 
                  class="option-card {hasOffer === 'yes' ? 'selected' : ''}" 
                  on:click={() => hasOffer = 'yes'}
                >
                  <div class="opt-check {hasOffer === 'yes' ? 'selected' : ''}">
                    {#if hasOffer === 'yes'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    {/if}
                  </div>
                  <div class="opt-text">
                    <strong>Yes, validated offer</strong>
                    <span>I already have paying customers / clients.</span>
                  </div>
                  <span class="opt-badge fit-badge">Best Fit</span>
                </button>

                <button 
                  type="button" 
                  class="option-card {hasOffer === 'refining' ? 'selected' : ''}" 
                  on:click={() => hasOffer = 'refining'}
                >
                  <div class="opt-check {hasOffer === 'refining' ? 'selected' : ''}">
                    {#if hasOffer === 'refining'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    {/if}
                  </div>
                  <div class="opt-text">
                    <strong>Offer in progress</strong>
                    <span>Testing or refining the pricing & messaging.</span>
                  </div>
                </button>

                <button 
                  type="button" 
                  class="option-card {hasOffer === 'no' ? 'selected' : ''}" 
                  on:click={() => hasOffer = 'no'}
                >
                  <div class="opt-check {hasOffer === 'no' ? 'selected' : ''}">
                    {#if hasOffer === 'no'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    {/if}
                  </div>
                  <div class="opt-text">
                    <strong>Not yet</strong>
                    <span>Starting from scratch / no sales motion yet.</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Question 2: Ads / Lead Generation System -->
            <div class="q-block">
              <span class="q-label">
                <span class="q-num">2</span>
                <span>Are you currently running ads or have a system of lead generation?</span>
              </span>
              <div class="options-grid">
                <button 
                  type="button" 
                  class="option-card {leadSystem === 'ads' ? 'selected' : ''}" 
                  on:click={() => leadSystem = 'ads'}
                >
                  <div class="opt-check {leadSystem === 'ads' ? 'selected' : ''}">
                    {#if leadSystem === 'ads'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    {/if}
                  </div>
                  <div class="opt-text">
                    <strong>Running ads / outbound</strong>
                    <span>Actively driving traffic through paid or outreach.</span>
                  </div>
                  <span class="opt-badge fit-badge">Ready to Scale</span>
                </button>

                <button 
                  type="button" 
                  class="option-card {leadSystem === 'organic' ? 'selected' : ''}" 
                  on:click={() => leadSystem = 'organic'}
                >
                  <div class="opt-check {leadSystem === 'organic' ? 'selected' : ''}">
                    {#if leadSystem === 'organic'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    {/if}
                  </div>
                  <div class="opt-text">
                    <strong>Referrals & organic</strong>
                    <span>Generating leads through network & word-of-mouth.</span>
                  </div>
                </button>

                <button 
                  type="button" 
                  class="option-card {leadSystem === 'none' ? 'selected' : ''}" 
                  on:click={() => leadSystem = 'none'}
                >
                  <div class="opt-check {leadSystem === 'none' ? 'selected' : ''}">
                    {#if leadSystem === 'none'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    {/if}
                  </div>
                  <div class="opt-text">
                    <strong>No active system yet</strong>
                    <span>Need to build a repeatable pipeline from zero.</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Question 3: Content Goal -->
            <div class="q-block">
              <span class="q-label">
                <span class="q-num">3</span>
                <span>What do you want your content to do?</span>
              </span>
              <div class="options-grid">
                <button 
                  type="button" 
                  class="option-card {contentGoal === 'leads' ? 'selected' : ''}" 
                  on:click={() => contentGoal = 'leads'}
                >
                  <div class="opt-check {contentGoal === 'leads' ? 'selected' : ''}">
                    {#if contentGoal === 'leads'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    {/if}
                  </div>
                  <div class="opt-text">
                    <strong>Leads and paying clients</strong>
                    <span>Turn viewers into tracked pipeline & real revenue.</span>
                  </div>
                  <span class="opt-badge fit-badge">Core Focus</span>
                </button>

                <button 
                  type="button" 
                  class="option-card {contentGoal === 'followers' ? 'selected' : ''}" 
                  on:click={() => contentGoal = 'followers'}
                >
                  <div class="opt-check {contentGoal === 'followers' ? 'selected' : ''}">
                    {#if contentGoal === 'followers'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    {/if}
                  </div>
                  <div class="opt-text">
                    <strong>Followers and likes</strong>
                    <span>Focus primarily on vanity reach & engagement.</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Realtime Alignment Note -->
            {#if hasOffer === 'yes' && contentGoal === 'leads'}
              <div class="fit-callout ideal">
                <div class="fit-callout-icon">✨</div>
                <div>
                  <strong>Ideal Match:</strong> You already have an offer and want direct leads. That's the exact blueprint we use to scale from ₦250k to high performance.
                </div>
              </div>
            {:else if contentGoal === 'followers' || hasOffer === 'no'}
              <div class="fit-callout guidance">
                <div class="fit-callout-icon">💡</div>
                <div>
                  <strong>Strategic Note:</strong> We prioritize business conversion over vanity metrics. On the call, we'll map out how to build a real lead funnel around your content.
                </div>
              </div>
            {/if}

            <div class="modal-actions">
              <button type="button" class="btn btn-primary next-btn" on:click={() => bookingStep = 2}>
                <span>Select Call Date & Time</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

        {:else if bookingStep === 2}
          <!-- Step 2: Apple Calendar & Time Slots -->
          <div class="calendar-step">
            <div class="calendar-layout">
              <!-- Dates Column -->
              <div class="cal-col">
                <span class="cal-section-title">Select Day (October 2026)</span>
                <div class="dates-scroll-grid">
                  {#each calendarDays as day}
                    <button 
                      type="button"
                      class="date-pill {selectedDate && selectedDate.getTime() === day.getTime() ? 'selected' : ''}"
                      on:click={() => selectedDate = day}
                    >
                      <span class="day-name">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <span class="day-num">{day.getDate()}</span>
                      <span class="day-month">{day.toLocaleDateString('en-US', { month: 'short' })}</span>
                    </button>
                  {/each}
                </div>
              </div>

              <!-- Times Column -->
              <div class="time-col">
                <span class="cal-section-title">Available Slots (WAT / GMT+1)</span>
                <div class="times-grid">
                  {#each timeSlots as slot}
                    <button 
                      type="button"
                      class="time-pill {selectedTimeSlot === slot ? 'selected' : ''}"
                      on:click={() => selectedTimeSlot = slot}
                    >
                      {slot}
                    </button>
                  {/each}
                </div>
              </div>
            </div>

            <!-- Contact Inputs -->
            <div class="booking-inputs">
              <span class="cal-section-title">Your Details for Calendar Invite</span>
              <div class="inputs-grid">
                <div class="input-field">
                  <label for="booking-name" class="input-label">Full Name <span class="required">*</span></label>
                  <input 
                    id="booking-name"
                    type="text" 
                    placeholder="e.g. Alex Morgan" 
                    bind:value={userName} 
                    required 
                    class="apple-input" 
                  />
                </div>
                <div class="input-field">
                  <label for="booking-email" class="input-label">Work Email <span class="required">*</span></label>
                  <input 
                    id="booking-email"
                    type="email" 
                    placeholder="alex@company.com" 
                    bind:value={userEmail} 
                    required 
                    class="apple-input" 
                  />
                </div>
                <div class="input-field full-width">
                  <label for="booking-handle" class="input-label">Website or Social Profile <span class="optional">(Optional)</span></label>
                  <input 
                    id="booking-handle"
                    type="text" 
                    placeholder="https://instagram.com/alex or company.com" 
                    bind:value={userHandle} 
                    class="apple-input" 
                  />
                </div>
              </div>
            </div>

            <div class="modal-actions-split">
              <button type="button" class="btn btn-secondary back-btn" on:click={() => bookingStep = 1}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Back</span>
              </button>
              <button 
                type="button" 
                class="btn btn-primary confirm-btn" 
                disabled={!userName.trim() || !userEmail.trim()} 
                on:click={() => { if (userName.trim() && userEmail.trim()) bookingStep = 3; }}
              >
                <span>Confirm Strategy Call</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

        {:else if bookingStep === 3}
          <!-- Step 3: Success Confirmation -->
          <div class="booking-confirmed animate-fade-in">
            <div class="confirmed-check">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h3 class="confirmed-title">You're All Set, {userName}!</h3>
            <p class="confirmed-sub">Your strategy session with Chizzy is officially confirmed.</p>

            <div class="booking-summary-card apple-card">
              <div class="summary-row">
                <span class="sum-label">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span>Date</span>
                </span>
                <strong>{formatFullDate(selectedDate)}</strong>
              </div>
              <div class="summary-row">
                <span class="sum-label">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span>Time</span>
                </span>
                <strong>{selectedTimeSlot} (WAT)</strong>
              </div>
              <div class="summary-row">
                <span class="sum-label">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                  <span>Focus</span>
                </span>
                <strong>{contentGoal === 'leads' ? 'Leads & Revenue Growth' : 'Followers & Brand Reach'}</strong>
              </div>
              <div class="summary-row">
                <span class="sum-label">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <span>Invitation</span>
                </span>
                <span class="summary-email">Sent to <strong>{userEmail}</strong></span>
              </div>
            </div>

            <div class="meet-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              <span>Google Meet link and calendar invitation sent to your email.</span>
            </div>

            <button type="button" class="btn btn-primary done-btn" on:click={closeBookingModal}>
              Done
            </button>
          </div>
        {/if}
      </div>
    </div>
  {/if}


  <!-- Free Guide / Lead Magnet Section -->
  <section id="contact" class="guide-section">
    <div class="section-container">
      <div class="guide-box apple-card">
        <div class="guide-content">
          <span class="section-eyebrow">In-House Alternative</span>
          <h2>Not ready to hand it off yet?</h2>
          <p class="guide-intro">
            If you'd rather keep this in-house for now, here's a free guide on how to find, test, and hire a video editor properly — plus how to use AI to script faster so you're not stuck doing it all by hand.
          </p>

          <div class="guide-grid">
            <div class="guide-item">
              <span class="guide-bullet">01</span>
              <div>
                <h5>Where to actually find editors</h5>
                <p>Beyond the obvious job boards — where the high-retention editors actually hang out.</p>
              </div>
            </div>

            <div class="guide-item">
              <span class="guide-bullet">02</span>
              <div>
                <h5>How to scrutinize a portfolio</h5>
                <p>What separates a real retention editor from someone with a nice reel and nothing behind it.</p>
              </div>
            </div>

            <div class="guide-item">
              <span class="guide-bullet">03</span>
              <div>
                <h5>Two paid test tasks</h5>
                <p>Task 1: short edit. Task 2: longform edit. Pay a small fee (~₦20k) for real usable work while you evaluate.</p>
              </div>
            </div>

            <div class="guide-item">
              <span class="guide-bullet">04</span>
              <div>
                <h5>Script faster with AI</h5>
                <p>The exact prompting system we use ourselves to turn a raw topic into a full script in minutes.</p>
              </div>
            </div>
          </div>

          <!-- Apple Style Email Input Form -->
          <form class="email-form" on:submit|preventDefault={handleEmailSubmit}>
            <div class="input-wrapper">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                bind:value={emailInput}
                required
                aria-label="Email address"
              />
              <button type="submit" class="btn btn-primary form-btn">
                {#if emailSubmitted}
                  <span>✓ Guide Sent!</span>
                {:else}
                  <span>Send me the guide</span>
                {/if}
              </button>
            </div>
          </form>
          {#if emailSubmitted}
            <p class="success-note animate-fade-in">Check your inbox — we just sent over the hiring blueprint and AI prompt templates!</p>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Apple Minimalist Footer -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="brand-text">Chizzy<span class="brand-accent">VFX</span></span>
          <p class="brand-slogan">A small team, run by Chizzy, built to do the job of four hires.</p>
        </div>
        <div class="footer-links">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 ChizzyVFX. All rights reserved.</p>
        <p class="footer-disclaimer">All pricing subject to agreed performance metrics.</p>
      </div>
    </div>
  </footer>
</div>

<style>
  /* App-level Layout & Apple Styling */
  .site-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .section-container {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* Navigation Bar */
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

  .nav-links {
    display: flex;
    gap: 32px;
  }

  .nav-item {
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: color var(--duration-fast) var(--ease-apple);
  }

  .nav-item:hover {
    color: var(--text-primary);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
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
    padding: 0.6rem 1.25rem;
    font-size: 0.875rem;
  }

  /* Hero Section */
  .hero-section {
    padding: 100px 24px 70px;
    text-align: center;
  }

  .hero-container {
    max-width: 860px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: var(--radius-pill);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    margin-bottom: 28px;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--accent-green);
    box-shadow: 0 0 10px rgba(52, 199, 89, 0.6);
  }

  .status-label {
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
  }

  .hero-title {
    font-size: clamp(2.75rem, 5.8vw, 4.85rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.035em;
    color: var(--text-primary);
    margin-bottom: 24px;
  }

  .hero-description {
    font-size: clamp(1.1rem, 2vw, 1.28rem);
    line-height: 1.6;
    max-width: 720px;
    margin-bottom: 40px;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero-btn {
    padding: 0.95rem 2rem;
    font-size: 1.05rem;
  }

  /* Video Showcase Section */
  .video-section {
    padding: 20px 0 60px;
  }

  .video-card {
    padding: 24px;
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  .video-card-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .video-meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .badge-pill {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 3px 10px;
    border-radius: var(--radius-pill);
    background: rgba(0, 113, 227, 0.12);
    color: var(--accent-blue);
  }

  .video-author {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .video-frame-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: #000000;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
  }

  .video-frame-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  /* Section Header */
  .section-header {
    text-align: center;
    max-width: 680px;
    margin: 0 auto 56px;
  }

  .section-eyebrow {
    display: inline-block;
    font-size: 0.8125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-blue);
    margin-bottom: 12px;
  }

  .section-sub {
    margin-top: 14px;
    font-size: 1.1rem;
  }

  /* Problem Section */
  .problem-section {
    padding: 80px 0;
    background: var(--bg-secondary);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }

  .problem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  .problem-card {
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .problem-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    background: rgba(255, 59, 48, 0.1);
    color: var(--accent-red);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }

  .problem-card h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .problem-card p {
    font-size: 0.95rem;
  }

  /* Services Bento Grid */
  .services-section {
    padding: 100px 0;
  }

  .services-bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .bento-card {
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    overflow: hidden;
  }

  .bento-wide {
    grid-column: span 2;
  }

  .bento-badge {
    position: absolute;
    top: 24px;
    right: 28px;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--text-tertiary);
    opacity: 0.6;
  }

  .bento-icon {
    width: 54px;
    height: 54px;
    border-radius: var(--radius-md);
    background: var(--bg-secondary);
    color: var(--accent-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }

  .highlight-card {
    background: linear-gradient(135deg, var(--card-bg) 60%, rgba(0, 113, 227, 0.08) 100%);
    border-color: rgba(0, 113, 227, 0.2);
  }

  .accent-icon {
    background: var(--accent-blue);
    color: #ffffff;
    box-shadow: 0 4px 14px var(--accent-blue-glow);
  }

  /* Audience Spec Section */
  .audience-section {
    padding: 50px 0 90px;
  }

  .audience-container {
    padding: 54px 44px;
  }

  .audience-header {
    margin-bottom: 40px;
  }

  .audience-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .audience-item {
    display: flex;
    align-items: flex-start;
    gap: 18px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .audience-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .check-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(52, 199, 89, 0.15);
    color: var(--accent-green);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .cross-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255, 59, 48, 0.15);
    color: var(--accent-red);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .audience-item strong {
    display: block;
    font-size: 1.125rem;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  /* Process Steps */
  .process-section {
    padding: 80px 0;
    background: var(--bg-secondary);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid var(--border-color);
  }

  .process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 20px;
  }

  .process-card {
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .step-num {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--accent-blue);
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px var(--accent-blue-glow);
  }

  .step-body h4 {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
  }

  .step-body p {
    font-size: 0.925rem;
  }

  /* Pricing Section */
  .pricing-section {
    padding: 100px 0;
  }

  .pricing-comparison {
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 48px;
    gap: 32px;
    background: linear-gradient(135deg, var(--card-bg) 0%, var(--bg-secondary) 100%);
  }

  .comp-col {
    flex: 1;
  }

  .comp-tag {
    font-size: 0.8125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-tertiary);
    margin-bottom: 8px;
    display: block;
  }

  .active-tag {
    color: var(--accent-blue);
  }

  .strikethrough-price {
    font-size: 2.25rem;
    font-weight: 700;
    text-decoration: line-through;
    color: var(--text-secondary);
    margin-bottom: 8px;
    opacity: 0.7;
  }

  .chizzy-price {
    font-size: 3rem;
    font-weight: 800;
    color: var(--accent-blue);
    line-height: 1;
    margin-bottom: 8px;
  }

  .chizzy-price span {
    font-size: 1.125rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .comp-arrow {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    flex-shrink: 0;
  }

  .tiers-container {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 32px;
  }

  .tier-row {
    padding: 24px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    gap: 24px;
  }

  .tier-row.selected {
    border-color: var(--accent-blue);
    background: var(--card-hover-bg);
    box-shadow: 0 6px 20px var(--accent-blue-glow);
  }

  .tier-price-col {
    width: 150px;
    flex-shrink: 0;
  }

  .tier-amount {
    font-size: 1.85rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .tier-period {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .tier-info-col {
    flex: 1;
  }

  .tier-title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
  }

  .tier-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .tier-pill {
    font-size: 0.75rem;
    font-weight: 700;
    background: var(--accent-blue);
    color: #ffffff;
    padding: 2px 10px;
    border-radius: var(--radius-pill);
  }

  .tier-metric {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .tier-scope-col {
    text-align: right;
  }

  .scope-text {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .pricing-disclaimer {
    text-align: center;
    font-size: 0.95rem;
    color: var(--text-secondary);
  }

  /* Proof of Work - Apple Bento Grid Showcase */
  .work-section {
    padding: 100px 0;
    background: var(--bg-secondary);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid var(--border-color);
  }

  .espre-bento-grid {
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-top: 8px;
  }

  /* Bento Hero Card (YouTube 16:9 Anchor) */
  .bento-hero-card {
    border-radius: var(--radius-2xl);
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 28px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform var(--duration-base) var(--ease-apple), box-shadow var(--duration-base) var(--ease-apple);
  }

  .bento-hero-card:hover {
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  }

  .bento-hero-grid {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 36px;
    padding: 28px;
    align-items: center;
  }

  @media (max-width: 960px) {
    .bento-hero-grid {
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 20px;
    }
  }

  /* Video Thumbnail Container */
  .hero-media-wrapper {
    position: relative;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-xl);
    overflow: hidden;
    background: #09090b;
    cursor: pointer;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  }

  .hero-media-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s var(--ease-apple);
  }

  .hero-media-wrapper:hover .hero-media-img {
    transform: scale(1.04);
  }

  .media-overlay-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.75) 100%);
    pointer-events: none;
  }

  .media-top-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 2;
  }

  .pill-badge {
    font-size: 0.75rem;
    font-weight: 600;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 4px 12px;
    border-radius: var(--radius-pill);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .status-dot.yt-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ff0000;
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.8);
  }

  .bento-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 66px;
    height: 66px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.4);
    transition: transform var(--duration-fast) var(--ease-apple), background var(--duration-fast) var(--ease-apple), color var(--duration-fast) var(--ease-apple);
  }

  .hero-media-wrapper:hover .bento-play-button {
    transform: translate(-50%, -50%) scale(1.12);
    background: var(--accent-blue);
    color: #ffffff;
  }

  .media-bottom-info {
    position: absolute;
    bottom: 14px;
    left: 16px;
    z-index: 2;
  }

  .media-hint {
    font-size: 0.76rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(8px);
    padding: 3px 10px;
    border-radius: var(--radius-pill);
  }

  /* Hero Content Right */
  .bento-hero-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .hero-content-eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .category-pill {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-blue);
    background: rgba(0, 113, 227, 0.1);
    padding: 3px 10px;
    border-radius: var(--radius-pill);
    border: 1px solid rgba(0, 113, 227, 0.2);
  }

  .client-pill {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    padding: 3px 10px;
    border-radius: var(--radius-pill);
  }

  .hero-episode-title {
    font-size: clamp(1.4rem, 2.4vw, 1.85rem);
    font-weight: 700;
    line-height: 1.25;
    color: var(--text-primary);
    margin: 2px 0 0 0;
    letter-spacing: -0.015em;
  }

  .hero-episode-subtitle {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin: 0;
  }

  .hero-episode-desc {
    font-size: 0.96rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin: 4px 0 8px 0;
  }

  .hero-features-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 6px;
  }

  .feature-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .feature-chip svg {
    color: var(--accent-green);
    flex-shrink: 0;
  }

  .hero-action-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .hero-watch-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    font-weight: 600;
  }

  .hero-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    font-weight: 600;
    text-decoration: none;
  }

  /* Bento Divider Header */
  .bento-divider-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 16px 0 4px;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: var(--border-color);
  }

  .divider-text {
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-secondary);
    text-align: center;
  }

  /* 3 Social Bento Cards Grid */
  .bento-social-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  @media (max-width: 960px) {
    .bento-social-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  .social-bento-card {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-xl);
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: transform var(--duration-base) var(--ease-apple), box-shadow var(--duration-base) var(--ease-apple);
  }

  .social-bento-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  }

  .social-mockup-wrap {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .social-canvas {
    height: 220px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    overflow: hidden;
    background: #111113;
  }

  .social-canvas.canvas-reel {
    background: radial-gradient(circle at 85% 15%, rgba(225, 48, 108, 0.28) 0%, #0d0d10 65%);
  }

  .social-canvas.canvas-carousel {
    background: radial-gradient(circle at 20% 20%, rgba(0, 113, 227, 0.3) 0%, #0d0d10 65%);
  }

  .social-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
  }

  .ig-badge {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.18);
  }

  .ratio-pill {
    font-size: 0.68rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(0, 0, 0, 0.4);
    padding: 3px 8px;
    border-radius: var(--radius-pill);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Reel Mockup Frame */
  .reel-mockup-frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    z-index: 2;
    margin: auto 0;
  }

  .reel-play-icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    transition: transform var(--duration-fast) var(--ease-apple), background var(--duration-fast) var(--ease-apple), color var(--duration-fast) var(--ease-apple);
  }

  .social-mockup-wrap:hover .reel-play-icon {
    transform: scale(1.12);
    background: #e1306c;
    color: #ffffff;
  }

  .audio-wave-bars {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 20px;
  }

  .audio-wave-bars span {
    width: 3px;
    background: rgba(255, 255, 255, 0.75);
    border-radius: 2px;
    animation: waveBar 1.2s ease-in-out infinite alternate;
  }

  .audio-wave-bars span:nth-child(1) { height: 8px; animation-delay: 0.1s; }
  .audio-wave-bars span:nth-child(2) { height: 16px; animation-delay: 0.3s; }
  .audio-wave-bars span:nth-child(3) { height: 10px; animation-delay: 0.2s; }
  .audio-wave-bars span:nth-child(4) { height: 18px; animation-delay: 0.4s; }
  .audio-wave-bars span:nth-child(5) { height: 12px; animation-delay: 0.15s; }

  @keyframes waveBar {
    0% { transform: scaleY(0.4); }
    100% { transform: scaleY(1.2); }
  }

  /* Carousel Deck Mockup */
  .carousel-deck-preview {
    position: relative;
    width: 170px;
    height: 120px;
    margin: auto auto;
    z-index: 2;
  }

  .slide-stack {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .slide-stack.slide-3 {
    top: -8px;
    right: -8px;
    transform: rotate(3deg);
    opacity: 0.3;
  }

  .slide-stack.slide-2 {
    top: -4px;
    right: -4px;
    transform: rotate(1.5deg);
    opacity: 0.6;
  }

  .slide-main {
    position: absolute;
    inset: 0;
    border-radius: var(--radius-md);
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    transition: transform var(--duration-fast) var(--ease-apple);
  }

  .social-mockup-wrap:hover .slide-main {
    transform: translateY(-2px);
    border-color: var(--accent-blue);
  }

  .slide-header-mini {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .slide-espre-tag {
    font-size: 0.62rem;
    font-weight: 700;
    color: var(--accent-blue);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .slide-num {
    font-size: 0.62rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
  }

  .slide-mock-headline {
    font-size: 0.72rem;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.3;
    margin: 0;
  }

  .slide-bar-decor {
    height: 3px;
    width: 40%;
    background: var(--accent-blue);
    border-radius: 2px;
  }

  .social-bottom-tag {
    z-index: 2;
  }

  .strategy-tag {
    font-size: 0.72rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    padding: 3px 10px;
    border-radius: var(--radius-pill);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  /* Social Card Body */
  .social-card-body {
    padding: 22px 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .social-badge-text {
    font-size: 0.74rem;
    font-weight: 700;
    color: var(--accent-blue);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .social-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.3;
    margin: 0 0 8px 0;
  }

  .social-desc {
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-secondary);
    margin: 0 0 18px 0;
    flex: 1;
  }

  .social-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-top: 14px;
    border-top: 1px solid var(--border-color);
  }

  .social-preview-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.84rem;
    font-weight: 600;
    padding: 6px 14px;
    min-height: 38px;
    border-radius: var(--radius-pill);
  }

  .social-external-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .social-external-link:hover {
    color: var(--accent-blue);
  }

  /* Modal Dialog for Video & Instagram Embeds */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .modal-dialog.showcase-modal {
    width: 100%;
    padding: 30px;
    border-radius: var(--radius-2xl);
    position: relative;
    max-height: 92vh;
    overflow-y: auto;
  }

  .modal-dialog.showcase-modal.modal-youtube {
    max-width: 860px;
  }

  .modal-dialog.showcase-modal.modal-instagram {
    max-width: 480px;
  }

  .modal-close-btn {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .modal-close-btn:hover {
    transform: scale(1.08);
    background: var(--border-color);
  }

  .modal-header-pills {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .badge-pill.platform-badge.badge-yt {
    color: #ff0000;
    border-color: rgba(255, 0, 0, 0.3);
    background: rgba(255, 0, 0, 0.08);
  }

  .badge-pill.platform-badge.badge-ig {
    color: #e1306c;
    border-color: rgba(225, 48, 108, 0.3);
    background: rgba(225, 48, 108, 0.08);
  }

  .modal-header h3 {
    margin: 4px 0 16px;
    font-size: 1.35rem;
    line-height: 1.3;
    color: var(--text-primary);
    padding-right: 40px;
  }

  .modal-embed-container {
    width: 100%;
    margin-bottom: 20px;
  }

  .video-iframe-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: #000000;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.4);
  }

  .video-iframe-wrapper iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .instagram-iframe-wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    height: 540px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: #000000;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.4);
  }

  .instagram-iframe-wrapper iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .modal-footer-custom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    padding-top: 14px;
    border-top: 1px solid var(--border-color);
  }

  .modal-ext-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.88rem;
    font-weight: 600;
    text-decoration: none;
    padding: 8px 16px;
  }

  .modal-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.88rem;
    font-weight: 600;
    padding: 8px 18px;
  }

  /* Booking Qualification Modal Styles */
  /* Booking Qualification Modal - Apple Design System */
  .booking-backdrop {
    z-index: 1050;
    background: rgba(0, 0, 0, 0.68);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    animation: fadeInBackdrop 250ms var(--ease-apple) forwards;
  }

  @keyframes fadeInBackdrop {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes appleModalAppear {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(12px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .booking-dialog {
    max-width: 680px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 36px 40px;
    border-radius: var(--radius-2xl);
    border: 1px solid var(--glass-border);
    background: var(--card-bg);
    backdrop-filter: var(--card-backdrop);
    -webkit-backdrop-filter: var(--card-backdrop);
    box-shadow: 0 32px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.35);
    animation: appleModalAppear 320ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  :global([data-theme="dark"]) .booking-dialog {
    box-shadow: 0 36px 90px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* Custom subtle Apple scrollbar */
  .booking-dialog::-webkit-scrollbar {
    width: 6px;
  }
  .booking-dialog::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
  }
  .booking-dialog::-webkit-scrollbar-track {
    background: transparent;
  }

  .modal-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--duration-fast) var(--ease-apple);
    z-index: 10;
  }

  .modal-close-btn:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    transform: scale(1.06);
  }

  .booking-header {
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-subtle);
  }

  /* Apple Segmented Step Bar */
  .apple-step-bar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    padding: 5px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-pill);
    margin-bottom: 20px;
  }

  .step-segment {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 7px 12px;
    border-radius: var(--radius-pill);
    border: none;
    background: transparent;
    color: var(--text-tertiary);
    font-size: 0.8125rem;
    font-weight: 500;
    font-family: inherit;
    cursor: default;
    transition: all var(--duration-fast) var(--ease-apple);
  }

  .step-segment.active {
    background: var(--bg-primary);
    color: var(--text-primary);
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  :global([data-theme="dark"]) .step-segment.active {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  }

  .step-segment.completed {
    color: var(--accent-blue);
    cursor: pointer;
  }

  .step-num {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    font-size: 0.6875rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all var(--duration-fast) var(--ease-apple);
  }

  .step-segment.active .step-num {
    background: var(--accent-blue);
    color: #ffffff;
  }

  .step-segment.completed .step-num {
    background: rgba(0, 113, 227, 0.15);
    color: var(--accent-blue);
  }

  .booking-header-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .booking-title {
    font-size: 1.45rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    margin: 0;
  }

  .booking-sub {
    font-size: 0.925rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
  }

  /* Questions Block */
  .qualification-questions {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .q-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .q-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  .q-num {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: rgba(0, 113, 227, 0.12);
    color: var(--accent-blue);
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .option-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 13px 18px;
    background: var(--bg-primary);
    border: 1.5px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    text-align: left;
    transition: all var(--duration-fast) var(--ease-apple);
    position: relative;
    font-family: inherit;
  }

  .option-card:hover {
    background: var(--bg-secondary);
    border-color: rgba(0, 113, 227, 0.35);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  }

  .option-card.selected {
    background: rgba(0, 113, 227, 0.05);
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 1px var(--accent-blue), 0 8px 22px var(--accent-blue-glow);
  }

  :global([data-theme="dark"]) .option-card.selected {
    background: rgba(0, 113, 227, 0.12);
    border-color: var(--accent-blue);
  }

  .opt-check {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all var(--duration-fast) var(--ease-apple);
    background: transparent;
  }

  .opt-check.selected {
    background: var(--accent-blue);
    border-color: var(--accent-blue);
    color: #ffffff;
    box-shadow: 0 2px 8px var(--accent-blue-glow);
  }

  .opt-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .opt-text strong {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .opt-text span {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.4;
  }

  .opt-badge {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 3px 9px;
    border-radius: var(--radius-pill);
    background: rgba(0, 113, 227, 0.12);
    color: var(--accent-blue);
    border: 1px solid rgba(0, 113, 227, 0.2);
    white-space: nowrap;
  }

  /* Fit Callouts (Apple Intelligence Style) */
  .fit-callout {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 18px;
    border-radius: var(--radius-lg);
    font-size: 0.9rem;
    line-height: 1.5;
    backdrop-filter: blur(12px);
    transition: all var(--duration-base) var(--ease-apple);
  }

  .fit-callout.ideal {
    background: rgba(52, 199, 89, 0.1);
    border: 1px solid rgba(52, 199, 89, 0.28);
    color: var(--text-primary);
  }

  .fit-callout.guidance {
    background: rgba(0, 113, 227, 0.08);
    border: 1px solid rgba(0, 113, 227, 0.22);
    color: var(--text-primary);
  }

  .fit-callout-icon {
    font-size: 1.25rem;
    line-height: 1;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .modal-actions-split {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    gap: 14px;
  }

  .next-btn,
  .confirm-btn {
    padding: 0.9rem 1.8rem;
    font-size: 0.95rem;
    font-weight: 600;
    box-shadow: 0 4px 16px var(--accent-blue-glow);
  }

  .next-btn:hover,
  .confirm-btn:hover {
    box-shadow: 0 8px 24px var(--accent-blue-glow);
  }

  .confirm-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  .back-btn {
    padding: 0.9rem 1.5rem;
    font-size: 0.95rem;
  }

  /* Calendar Step Styles */
  .calendar-step {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .calendar-layout {
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    gap: 16px;
    padding: 18px;
    background: var(--bg-secondary);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-color);
  }

  .cal-section-title {
    display: block;
    font-size: 0.775rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .dates-scroll-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    max-height: 220px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .dates-scroll-grid::-webkit-scrollbar {
    width: 4px;
  }
  .dates-scroll-grid::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }

  .date-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 4px;
    border-radius: var(--radius-md);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-apple);
    font-family: inherit;
  }

  .date-pill:hover {
    background: var(--bg-tertiary);
    border-color: var(--accent-blue);
    transform: translateY(-1px);
  }

  .date-pill.selected {
    background: var(--accent-blue);
    border-color: var(--accent-blue);
    box-shadow: 0 4px 14px var(--accent-blue-glow);
  }

  .day-name {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
  }

  .day-num {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.1;
    margin: 3px 0;
    color: var(--text-primary);
  }

  .day-month {
    font-size: 0.6875rem;
    color: var(--text-tertiary);
  }

  .date-pill.selected .day-name,
  .date-pill.selected .day-num,
  .date-pill.selected .day-month {
    color: #ffffff;
  }

  .times-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .time-pill {
    padding: 9px 14px;
    border-radius: var(--radius-pill);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-apple);
    font-family: inherit;
    text-align: center;
  }

  .time-pill:hover {
    background: var(--bg-tertiary);
    border-color: var(--accent-blue);
    transform: translateY(-1px);
  }

  .time-pill.selected {
    background: var(--accent-blue);
    border-color: var(--accent-blue);
    color: #ffffff;
    box-shadow: 0 4px 14px var(--accent-blue-glow);
  }

  /* Booking Inputs */
  .booking-inputs {
    display: flex;
    flex-direction: column;
  }

  .inputs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .input-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .input-field.full-width {
    grid-column: span 2;
  }

  .input-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .input-label .required {
    color: var(--accent-red);
  }

  .input-label .optional {
    color: var(--text-tertiary);
    font-weight: 400;
    font-size: 0.75rem;
  }

  .apple-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: var(--radius-md);
    background: var(--bg-primary);
    border: 1.5px solid var(--border-color);
    color: var(--text-primary);
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    transition: all var(--duration-fast) var(--ease-apple);
  }

  .apple-input:focus {
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 3.5px var(--accent-blue-glow);
  }

  /* Confirmation Screen */
  .booking-confirmed {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 28px 0 10px;
  }

  .confirmed-check {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(52, 199, 89, 0.15);
    color: var(--accent-green);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    box-shadow: 0 0 28px rgba(52, 199, 89, 0.35);
  }

  .confirmed-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    margin: 0 0 6px 0;
  }

  .confirmed-sub {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin: 0 0 24px 0;
  }

  /* Apple Wallet Receipt Card */
  .booking-summary-card {
    width: 100%;
    max-width: 460px;
    padding: 22px 24px;
    border-radius: var(--radius-xl);
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
    margin-bottom: 18px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .summary-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .sum-label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .sum-label svg {
    color: var(--accent-blue);
  }

  .summary-email {
    color: var(--text-primary);
  }

  .meet-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: var(--radius-pill);
    background: rgba(0, 113, 227, 0.08);
    border: 1px solid rgba(0, 113, 227, 0.2);
    color: var(--accent-blue);
    font-size: 0.8125rem;
    font-weight: 500;
    margin-bottom: 24px;
    text-align: center;
  }

  .done-btn {
    min-width: 160px;
    padding: 0.85rem 2rem;
  }

  @media (max-width: 650px) {
    .booking-dialog {
      padding: 22px 18px;
      max-height: 94vh;
    }
    .apple-step-bar {
      gap: 3px;
      padding: 3px;
    }
    .step-segment {
      padding: 6px 8px;
      font-size: 0.725rem;
      gap: 5px;
    }
    .step-text {
      display: inline-block;
    }
    .calendar-layout {
      grid-template-columns: 1fr;
      padding: 14px;
    }
    .dates-scroll-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    .inputs-grid {
      grid-template-columns: 1fr;
    }
    .input-field.full-width {
      grid-column: span 1;
    }
  }

  /* Guide Section / Lead Magnet */
  .guide-section {
    padding: 70px 0 100px;
    background: var(--bg-secondary);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid var(--border-color);
  }

  .guide-box {
    padding: 56px 44px;
  }

  .guide-intro {
    max-width: 720px;
    font-size: 1.15rem;
    margin: 14px 0 40px;
  }

  .guide-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 28px;
    margin-bottom: 48px;
  }

  .guide-item {
    display: flex;
    gap: 16px;
  }

  .guide-bullet {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--accent-blue);
    background: rgba(0, 113, 227, 0.1);
    width: 32px;
    height: 32px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .guide-item h5 {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  .guide-item p {
    font-size: 0.9rem;
    margin: 0;
  }

  .email-form {
    max-width: 580px;
  }

  .input-wrapper {
    display: flex;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-pill);
    padding: 6px 8px 6px 20px;
    box-shadow: var(--shadow-sm);
    transition: border-color var(--duration-fast) var(--ease-apple);
  }

  .input-wrapper:focus-within {
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 3px var(--accent-blue-glow);
  }

  .input-wrapper input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 1rem;
    font-family: inherit;
    outline: none;
  }

  .input-wrapper input::placeholder {
    color: var(--text-tertiary);
  }

  .form-btn {
    padding: 0.75rem 1.6rem;
    font-size: 0.925rem;
  }

  .success-note {
    margin-top: 14px;
    color: var(--accent-green);
    font-weight: 600;
    font-size: 0.95rem;
  }

  /* Footer */
  .footer {
    padding: 60px 0 40px;
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid var(--border-color);
  }

  .footer-container {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--border-subtle);
    gap: 32px;
    flex-wrap: wrap;
  }

  .brand-slogan {
    margin-top: 8px;
    font-size: 0.95rem;
    max-width: 320px;
  }

  .footer-links {
    display: flex;
    gap: 28px;
  }

  .footer-links a {
    text-decoration: none;
    font-size: 0.9rem;
    color: var(--text-secondary);
    transition: color var(--duration-fast) var(--ease-apple);
  }

  .footer-links a:hover {
    color: var(--accent-blue);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 28px;
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    flex-wrap: wrap;
    gap: 12px;
  }

  /* Responsive Breakpoints */
  @media (max-width: 900px) {
    .services-bento {
      grid-template-columns: 1fr;
    }
    .bento-wide {
      grid-column: span 1;
    }
    .nav-links {
      display: none;
    }
    .pricing-comparison {
      flex-direction: column;
      text-align: center;
    }
    .comp-arrow {
      transform: rotate(90deg);
    }
    .tier-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    .tier-price-col, .tier-scope-col {
      width: 100%;
      text-align: left;
    }
  }

  @media (max-width: 600px) {
    .video-card {
      padding: 14px;
    }
    .video-card-header {
      margin-bottom: 12px;
      padding-bottom: 12px;
    }
    .video-author {
      font-size: 0.825rem;
    }
    .input-wrapper {
      flex-direction: column;
      border-radius: var(--radius-lg);
      padding: 12px;
      gap: 12px;
    }
    .form-btn {
      width: 100%;
    }
  }
</style>
