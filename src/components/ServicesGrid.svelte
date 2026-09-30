<script>
  // ServicesGrid component
  const services = [
    {
      title: "Strategy & scripts",
      desc: "We plan what gets said and why, before a camera or timeline is touched."
    },
    {
      title: "Long-form editing",
      desc: "Your YouTube longs, edited for retention — not just polish."
    },
    {
      title: "Repurposing",
      desc: "Every longform becomes shorts, engagement reels, carousels, and tweets."
    },
    {
      title: "Platform management",
      desc: "YouTube, Instagram, LinkedIn, Twitter — scheduled and managed, not left to you."
    },
    {
      title: "Lead magnet funnels",
      desc: "2–3 funnels built directly through your content, turning views into leads."
    },
    {
      title: "You approve, we run it",
      desc: "You give source prompts, shoot your raw content, and approve deliverables. That's it."
    }
  ];
</script>

<section class="container section-padding">
  <h2>What we actually do</h2>
  
  <div class="grid">
    {#each services as service}
      <div class="card">
        <h4>{service.title}</h4>
        <p>{service.desc}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  h2 {
    margin-bottom: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  .card {
    border: 1px solid var(--border-color);
    padding: 2rem;
    border-radius: 4px;
    background-color: transparent;
  }

  h4 {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  p {
    margin: 0;
    font-size: 1.05rem;
    color: #444;
  }
</style>
