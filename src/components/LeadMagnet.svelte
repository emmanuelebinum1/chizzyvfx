<script>
  // LeadMagnet component
  const guideFeatures = [
    {
      title: "Where to actually find editors",
      desc: "Beyond the obvious job boards — where the good ones actually hang out."
    },
    {
      title: "How to scrutinize a portfolio",
      desc: "What separates a real editor from someone with a nice reel and nothing behind it."
    },
    {
      title: "Two paid test tasks",
      desc: "Task 1: a short video edit. Task 2: a longform edit, repurposed into shorts. Pay a small fee — around ₦20k — for real, usable work while you evaluate."
    },
    {
      title: "Script faster with AI",
      desc: "The prompting system we use ourselves to turn a raw topic into a full script, so scripting stops being the bottleneck."
    }
  ];
</script>

<section class="container section-padding">
  <div class="ready-section">
    <h2>Ready to see it on your own content?</h2>
    <p>We'll repurpose one of your existing videos first, free, so you can see exactly what this looks like before you commit to anything.</p>
    <button class="btn-primary">Book a call</button>
  </div>

  <hr>

  <div class="not-ready-section">
    <h2>Not ready to hand it off yet?</h2>
    <p>If you'd rather keep this in-house for now, here's a free guide on how to find, test, and hire a video editor properly — plus how to use AI to script faster so you're not stuck doing it all by hand.</p>

    <div class="guide-grid">
      {#each guideFeatures as feature}
        <div class="guide-card">
          <h4>{feature.title}</h4>
          <p>{feature.desc}</p>
        </div>
      {/each}
    </div>

    <form class="email-form" on:submit|preventDefault>
      <input type="email" placeholder="Your email" required>
      <button type="submit" class="btn-primary">Send me the guide</button>
    </form>
  </div>
</section>

<style>
  .ready-section h2, .not-ready-section h2 {
    margin-bottom: 1rem;
  }

  .ready-section p, .not-ready-section p {
    margin-bottom: 2rem;
    max-width: 700px;
  }

  .guide-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  .guide-card {
    border: 1px solid var(--border-color);
    padding: 2rem;
    border-radius: 4px;
    background-color: transparent;
  }

  .guide-card h4 {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .guide-card p {
    margin: 0;
    font-size: 0.95rem;
    color: #444;
  }

  .email-form {
    display: flex;
    gap: 1rem;
    max-width: 600px;
  }

  .email-form input {
    flex: 1;
    padding: 0.8rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-family: var(--font-sans);
    font-size: 1rem;
    background-color: transparent;
  }

  .email-form input:focus {
    outline: none;
    border-color: #999;
  }

  @media (max-width: 600px) {
    .email-form {
      flex-direction: column;
    }
  }
</style>
