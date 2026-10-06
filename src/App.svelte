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

  // Audio Voice Note Simulation
  let isPlaying = false;
  let audioProgress = 0;
  let audioTimer;

  function toggleAudio() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      audioTimer = setInterval(() => {
        if (audioProgress >= 100) {
          isPlaying = false;
          audioProgress = 0;
          clearInterval(audioTimer);
        } else {
          audioProgress += 1.5;
        }
      }, 300);
    } else {
      clearInterval(audioTimer);
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

  // Active Video Modal
  let activeVideo = null;
  const portfolioItems = [
    {
      client: 'Esprē Health',
      desc: 'Weekly YouTube + IG content system',
      tags: ['Healthcare', 'YouTube Longs', 'Shorts'],
      stats: '240k+ Views • 85 Leads'
    },
    {
      client: 'Shopbot',
      desc: 'Content-driven outreach & funnel',
      tags: ['SaaS', 'LinkedIn', 'Lead Funnel'],
      stats: '180k+ Views • 140 Leads'
    },
    {
      client: 'Wealthflow',
      desc: 'Repurposed content series',
      tags: ['Fintech', 'X / Twitter', 'Carousels'],
      stats: '410k+ Views • 210 Leads'
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
        <span class="gradient-text">Hire a content specialist.</span>
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

  <!-- Apple Voice Note / Audio Player Card -->
  <section class="voice-note-section">
    <div class="section-container">
      <div class="voice-card apple-card">
        <div class="voice-card-header">
          <!-- Play / Pause Action Button -->
          <button 
            class="play-circle-btn" 
            on:click={toggleAudio}
            aria-label={isPlaying ? 'Pause voice note' : 'Play voice note from Chizzy'}
          >
            {#if isPlaying}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                <rect x="14" y="4" width="4" height="16" rx="1"></rect>
              </svg>
            {:else}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 2px;">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            {/if}
          </button>

          <div class="voice-info">
            <div class="voice-meta">
              <span class="badge-pill">Voice Note</span>
              <span class="voice-author">A voice note from Chizzy — 2 min</span>
            </div>

            <!-- Waveform & Progress -->
            <div class="waveform-container {isPlaying ? 'waveform-active' : ''}">
              <div class="waveform-bars">
                <div class="waveform-bar bar-1" style="height: {isPlaying ? '18px' : '10px'}"></div>
                <div class="waveform-bar bar-2" style="height: {isPlaying ? '24px' : '16px'}"></div>
                <div class="waveform-bar bar-3" style="height: {isPlaying ? '14px' : '8px'}"></div>
                <div class="waveform-bar bar-4" style="height: {isPlaying ? '26px' : '20px'}"></div>
                <div class="waveform-bar bar-5" style="height: {isPlaying ? '16px' : '12px'}"></div>
                <div class="waveform-bar bar-6" style="height: {isPlaying ? '22px' : '14px'}"></div>
                <div class="waveform-bar bar-7" style="height: {isPlaying ? '12px' : '6px'}"></div>
              </div>

              <div class="progress-track">
                <div class="progress-fill" style="width: {audioProgress}%"></div>
              </div>

              <span class="timestamp">{isPlaying ? 'Playing...' : '2:00'}</span>
            </div>
          </div>
        </div>

        <div class="voice-transcription">
          <p class="lead-quote">
            "Hey — I'm Chizzy. Before anything else, this is me talking to you directly, not a script written to sell you something. So give me two minutes."
          </p>
          <div class="body-paragraphs">
            <p>
              If you run a business or a personal brand, you already know content is tasking. It's not just "make a video." It's strategy, then scripting, then filming, then editing, then cutting that one video into ten more pieces, then actually posting all of it on time, on every platform. Most people either try to do it all themselves and burn out, or they hire a video editor and realize the editor alone doesn't solve the problem — you're still the one writing scripts, planning the calendar, and chasing consistency.
            </p>
            <p>
              I used to be that video editor. Just cuts, just polish. But I kept watching clients hand me raw footage with no strategy behind it, and the final video would look good and still underperform, because editing was never the actual bottleneck. So I rebuilt what I offer — and built a small team around it — to cover the whole thing: <strong>strategy, scripting, editing, repurposing, scheduling.</strong>
            </p>
            <p>
              Before AI, doing all of this for a client meant hiring three or four separate people, minimum. With AI in the workflow now, a small, tight team can do what used to take a department. That's the only reason this offer is possible at this price.
            </p>
            <p class="closing-note">
              This isn't for everyone. Keep reading for who it's actually for, and the pricing, below.
            </p>
          </div>
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

  <!-- Proof of Work / Portfolio Showcase (Apple TV Keynote Style) -->
  <section id="work" class="work-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-eyebrow">Portfolio</span>
        <h2>Proof of work.</h2>
        <p class="section-sub">A sample of content and growth systems built for our active partners.</p>
      </div>

      <div class="portfolio-grid">
        {#each portfolioItems as item}
          <button 
            type="button"
            class="project-card apple-card" 
            on:click={() => activeVideo = item}
          >
            <div class="video-container">
              <div class="gradient-overlay"></div>
              
              <div class="play-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </div>

              <div class="video-card-content">
                <div class="card-tags">
                  {#each item.tags as tag}
                    <span class="tag-pill">{tag}</span>
                  {/each}
                </div>
                <h3 class="client-title">{item.client}</h3>
                <p class="client-stat">{item.stats}</p>
              </div>
            </div>

            <div class="project-footer">
              <p class="project-desc">{item.desc}</p>
              <span class="preview-link">
                View system 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </section>

  <!-- Interactive Project Video Modal -->
  {#if activeVideo}
    <div 
      class="modal-backdrop" 
      role="presentation"
      on:click={() => activeVideo = null}
      on:keydown={(e) => e.key === 'Escape' && (activeVideo = null)}
    >
      <div 
        class="modal-dialog apple-glass apple-card" 
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        on:click|stopPropagation
        on:keydown|stopPropagation
      >
        <button class="modal-close-btn" on:click={() => activeVideo = null} aria-label="Close dialog">✕</button>
        <div class="modal-header">
          <span class="badge-pill">{activeVideo.client}</span>
          <h3>{activeVideo.desc}</h3>
          <p class="modal-stat">{activeVideo.stats}</p>
        </div>

        <div class="mock-player">
          <div class="mock-player-screen">
            <div class="pulse-play">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </div>
            <p>Interactive Showcase Active</p>
          </div>
        </div>

        <div class="modal-footer">
          <a href="#contact" class="btn btn-primary" on:click={() => activeVideo = null}>
            Request case study breakdown
          </a>
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
        <button class="modal-close-btn" on:click={closeBookingModal} aria-label="Close booking modal">✕</button>

        <!-- Progress Header -->
        <div class="booking-header">
          <div class="booking-progress-pills">
            <span class="prog-pill {bookingStep >= 1 ? 'active' : ''}">1. Qualification</span>
            <span class="prog-divider">›</span>
            <span class="prog-pill {bookingStep >= 2 ? 'active' : ''}">2. Date & Time</span>
            <span class="prog-divider">›</span>
            <span class="prog-pill {bookingStep === 3 ? 'active' : ''}">3. Confirmed</span>
          </div>

          {#if bookingStep === 1}
            <h3 class="booking-title">Book a Strategy Call with Chizzy</h3>
            <p class="booking-sub">Let's quickly confirm our content engine fits your current business setup.</p>
          {:else if bookingStep === 2}
            <h3 class="booking-title">Choose Your Time</h3>
            <p class="booking-sub">Select an available slot for a 20-minute strategy session on Google Meet.</p>
          {/if}
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
                  <div class="opt-radio">{#if hasOffer === 'yes'}●{/if}</div>
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
                  <div class="opt-radio">{#if hasOffer === 'refining'}●{/if}</div>
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
                  <div class="opt-radio">{#if hasOffer === 'no'}●{/if}</div>
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
                  <div class="opt-radio">{#if leadSystem === 'ads'}●{/if}</div>
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
                  <div class="opt-radio">{#if leadSystem === 'organic'}●{/if}</div>
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
                  <div class="opt-radio">{#if leadSystem === 'none'}●{/if}</div>
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
                  <div class="opt-radio">{#if contentGoal === 'leads'}●{/if}</div>
                  <div class="opt-text">
                    <strong>Leads and sales</strong>
                    <span>Turn viewers into tracked pipeline & revenue.</span>
                  </div>
                  <span class="opt-badge fit-badge">Core Focus</span>
                </button>

                <button 
                  type="button" 
                  class="option-card {contentGoal === 'followers' ? 'selected' : ''}" 
                  on:click={() => contentGoal = 'followers'}
                >
                  <div class="opt-radio">{#if contentGoal === 'followers'}●{/if}</div>
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
                <span class="fit-callout-icon">✨</span>
                <p><strong>Ideal Match:</strong> You already have an offer and want direct leads. That's the exact blueprint we use to scale from ₦250k to high performance.</p>
              </div>
            {:else if contentGoal === 'followers' || hasOffer === 'no'}
              <div class="fit-callout guidance">
                <span class="fit-callout-icon">💡</span>
                <p><strong>Strategic Note:</strong> We prioritize business conversion over vanity metrics. On the call, we'll map out how to build a real lead funnel around your content.</p>
              </div>
            {/if}

            <div class="modal-actions">
              <button type="button" class="btn btn-primary next-btn" on:click={() => bookingStep = 2}>
                <span>Select Call Date & Time</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
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
                <input 
                  type="text" 
                  placeholder="Your Full Name *" 
                  bind:value={userName} 
                  required 
                  class="apple-input" 
                />
                <input 
                  type="email" 
                  placeholder="Work Email *" 
                  bind:value={userEmail} 
                  required 
                  class="apple-input" 
                />
                <input 
                  type="text" 
                  placeholder="Website or Social Handle (Optional)" 
                  bind:value={userHandle} 
                  class="apple-input full-width" 
                />
              </div>
            </div>

            <div class="modal-actions-split">
              <button type="button" class="btn btn-secondary" on:click={() => bookingStep = 1}>
                ← Back
              </button>
              <button 
                type="button" 
                class="btn btn-primary" 
                disabled={!userName.trim() || !userEmail.trim()} 
                on:click={() => { if (userName.trim() && userEmail.trim()) bookingStep = 3; }}
              >
                Confirm Strategy Call
              </button>
            </div>
          </div>

        {:else if bookingStep === 3}
          <!-- Step 3: Success Confirmation -->
          <div class="booking-confirmed animate-fade-in">
            <div class="confirmed-check">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h3>You're All Set, {userName}!</h3>
            <p class="confirmed-sub">Your strategy session with Chizzy is officially confirmed.</p>

            <div class="booking-summary-card apple-card">
              <div class="summary-row">
                <span class="sum-label">📅 Date</span>
                <strong>{formatFullDate(selectedDate)}</strong>
              </div>
              <div class="summary-row">
                <span class="sum-label">⏰ Time</span>
                <strong>{selectedTimeSlot} (WAT)</strong>
              </div>
              <div class="summary-row">
                <span class="sum-label">🎯 Goal</span>
                <strong style="text-transform: capitalize;">{contentGoal === 'leads' ? 'Leads & Revenue Growth' : 'Followers & Brand Reach'}</strong>
              </div>
              <div class="summary-row">
                <span class="sum-label">📩 Invitation</span>
                <span>Sent to <strong>{userEmail}</strong></span>
              </div>
            </div>

            <p class="meet-notice">Google Meet video link has been sent to your email with calendar invite attached.</p>

            <button type="button" class="btn btn-primary done-btn" on:click={closeBookingModal}>
              Done
            </button>
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Test Run Call to Action -->
  <section class="cta-banner-section">
    <div class="section-container">
      <div class="cta-banner apple-card">
        <span class="section-eyebrow">Zero Risk Trial</span>
        <h2>Ready to see it on your own content?</h2>
        <p>We'll repurpose one of your existing videos first, free, so you can see exactly what this looks like before you commit to anything.</p>
        
        <div class="cta-action">
          <button type="button" class="btn btn-primary hero-btn" on:click={openBookingModal}>
            <span>Book a call for your free sample</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

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

  /* Voice Note Card */
  .voice-note-section {
    padding: 30px 0 60px;
  }

  .voice-card {
    padding: 36px;
    border-radius: var(--radius-2xl);
  }

  .voice-card-header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .play-circle-btn {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--accent-blue);
    color: #ffffff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 18px var(--accent-blue-glow);
    transition: transform var(--duration-fast) var(--ease-apple), background-color var(--duration-fast) var(--ease-apple);
    flex-shrink: 0;
  }

  .play-circle-btn:hover {
    transform: scale(1.06);
    background: var(--accent-blue-hover);
  }

  .voice-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .voice-meta {
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

  .voice-author {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .waveform-container {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .waveform-bars {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 28px;
  }

  .progress-track {
    flex: 1;
    height: 5px;
    background: var(--bg-tertiary);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    height: 100%;
    background: var(--accent-blue);
    border-radius: 10px;
    transition: width 0.3s linear;
  }

  .timestamp {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
  }

  .voice-transcription {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .lead-quote {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.5;
  }

  .body-paragraphs {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .closing-note {
    font-style: italic;
    color: var(--accent-blue);
    font-weight: 500;
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

  /* Portfolio Work Section */
  .work-section {
    padding: 90px 0;
    background: var(--bg-secondary);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid var(--border-color);
  }

  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 28px;
  }

  .project-card {
    border-radius: var(--radius-xl);
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .video-container {
    aspect-ratio: 9/15;
    background: linear-gradient(180deg, #1c1c1e 0%, #2c2c2e 100%);
    position: relative;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
  }

  .gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.85) 100%);
    z-index: 1;
  }

  .play-badge {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: transform var(--duration-fast) var(--ease-apple), background-color var(--duration-fast) var(--ease-apple);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .project-card:hover .play-badge {
    transform: translate(-50%, -50%) scale(1.12);
    background: var(--accent-blue);
    color: #ffffff;
  }

  .video-card-content {
    position: relative;
    z-index: 2;
  }

  .card-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  .tag-pill {
    font-size: 0.72rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    backdrop-filter: blur(8px);
    padding: 2px 8px;
    border-radius: var(--radius-pill);
  }

  .client-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 4px;
  }

  .client-stat {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }

  .project-footer {
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--card-bg);
  }

  .project-desc {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0;
  }

  .preview-link {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--accent-blue);
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  /* Modal Dialog */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(12px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .modal-dialog {
    width: 100%;
    max-width: 580px;
    padding: 36px;
    border-radius: var(--radius-2xl);
    position: relative;
  }

  .modal-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: none;
    color: var(--text-primary);
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-header h3 {
    margin: 8px 0;
  }

  .modal-stat {
    color: var(--accent-blue);
    font-weight: 600;
  }

  .mock-player {
    margin: 24px 0;
    aspect-ratio: 16/9;
    background: #000000;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .mock-player-screen {
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .pulse-play {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--accent-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: barBounce 1.5s infinite;
  }

  /* Booking Qualification Modal Styles */
  .booking-backdrop {
    z-index: 1050;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .booking-dialog {
    max-width: 680px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 36px 40px;
    border-radius: var(--radius-2xl);
  }

  .booking-header {
    margin-bottom: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .booking-progress-pills {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
    font-size: 0.8125rem;
    font-weight: 600;
  }

  .prog-pill {
    padding: 4px 12px;
    border-radius: var(--radius-pill);
    background: var(--bg-secondary);
    color: var(--text-tertiary);
    transition: all var(--duration-fast) var(--ease-apple);
  }

  .prog-pill.active {
    background: rgba(0, 113, 227, 0.12);
    color: var(--accent-blue);
  }

  .prog-divider {
    color: var(--text-tertiary);
  }

  .booking-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  .booking-sub {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin: 0;
  }

  /* Questions Block */
  .qualification-questions {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .q-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .q-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .q-num {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--accent-blue);
    color: #ffffff;
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
    padding: 12px 18px;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    text-align: left;
    transition: all var(--duration-fast) var(--ease-apple);
    position: relative;
    font-family: inherit;
  }

  .option-card:hover {
    background: var(--bg-secondary);
    border-color: rgba(0, 113, 227, 0.3);
    transform: translateY(-1px);
  }

  .option-card.selected {
    background: rgba(0, 113, 227, 0.08);
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 1px var(--accent-blue);
  }

  .opt-radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-blue);
    font-size: 0.8rem;
    flex-shrink: 0;
  }

  .option-card.selected .opt-radio {
    border-color: var(--accent-blue);
  }

  .opt-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .opt-text strong {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .opt-text span {
    font-size: 0.825rem;
    color: var(--text-secondary);
  }

  .opt-badge {
    font-size: 0.725rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: var(--radius-pill);
    background: rgba(0, 113, 227, 0.12);
    color: var(--accent-blue);
  }

  .fit-callout {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 18px;
    border-radius: var(--radius-lg);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .fit-callout.ideal {
    background: rgba(52, 199, 89, 0.12);
    border: 1px solid rgba(52, 199, 89, 0.25);
    color: var(--text-primary);
  }

  .fit-callout.guidance {
    background: rgba(0, 113, 227, 0.08);
    border: 1px solid rgba(0, 113, 227, 0.2);
    color: var(--text-primary);
  }

  .fit-callout-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 6px;
  }

  .modal-actions-split {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    gap: 14px;
  }

  .next-btn {
    width: 100%;
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
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
    gap: 18px;
    padding: 18px;
    background: var(--bg-secondary);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-color);
  }

  .cal-section-title {
    display: block;
    font-size: 0.8125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
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
  }

  .date-pill.selected {
    background: var(--accent-blue);
    border-color: var(--accent-blue);
    box-shadow: 0 4px 12px var(--accent-blue-glow);
  }

  .day-name {
    font-size: 0.725rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .day-num {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.1;
    margin: 2px 0;
    color: var(--text-primary);
  }

  .day-month {
    font-size: 0.7rem;
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
    font-size: 0.875rem;
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
  }

  .time-pill.selected {
    background: var(--accent-blue);
    border-color: var(--accent-blue);
    color: #ffffff;
    box-shadow: 0 4px 12px var(--accent-blue-glow);
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

  .apple-input {
    width: 100%;
    padding: 12px 18px;
    border-radius: var(--radius-pill);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    transition: border-color var(--duration-fast) var(--ease-apple), box-shadow var(--duration-fast) var(--ease-apple);
  }

  .apple-input:focus {
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 3px var(--accent-blue-glow);
  }

  .apple-input.full-width {
    grid-column: span 2;
  }

  /* Confirmation Screen */
  .booking-confirmed {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 0;
  }

  .confirmed-check {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(52, 199, 89, 0.15);
    color: var(--accent-green);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    box-shadow: 0 0 24px rgba(52, 199, 89, 0.35);
  }

  .confirmed-sub {
    font-size: 1.05rem;
    color: var(--text-secondary);
    margin-bottom: 24px;
  }

  .booking-summary-card {
    width: 100%;
    max-width: 440px;
    padding: 24px;
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    gap: 14px;
    text-align: left;
    margin-bottom: 20px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.925rem;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .summary-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .sum-label {
    color: var(--text-secondary);
  }

  .meet-notice {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    margin-bottom: 24px;
  }

  .done-btn {
    min-width: 160px;
  }

  @media (max-width: 650px) {
    .booking-dialog {
      padding: 24px;
    }
    .calendar-layout {
      grid-template-columns: 1fr;
    }
    .inputs-grid {
      grid-template-columns: 1fr;
    }
    .apple-input.full-width {
      grid-column: span 1;
    }
  }

  /* CTA Banner */
  .cta-banner-section {
    padding: 70px 0;
  }

  .cta-banner {
    padding: 60px 40px;
    text-align: center;
    background: linear-gradient(135deg, var(--card-bg) 0%, rgba(0, 113, 227, 0.08) 100%);
    border-color: rgba(0, 113, 227, 0.2);
  }

  .cta-banner h2 {
    margin: 12px 0 16px;
  }

  .cta-banner p {
    max-width: 620px;
    margin: 0 auto 36px;
    font-size: 1.15rem;
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
    .voice-card-header {
      flex-direction: column;
      align-items: flex-start;
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
