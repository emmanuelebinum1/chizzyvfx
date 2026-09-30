<script>
  // ProcessSteps component
  const steps = [
    {
      num: 1,
      title: "You shoot, we script",
      desc: "You send raw footage and source prompts. We turn that into scripted, structured longform."
    },
    {
      num: 2,
      title: "We edit and repurpose",
      desc: "Longform gets edited, then cut into shorts, reels, carousels, and tweets."
    },
    {
      num: 3,
      title: "We build the funnel",
      desc: "A lead magnet funnel is built and tracked, so content has somewhere to send people."
    },
    {
      num: 4,
      title: "We post and manage",
      desc: "Everything goes out across your platforms, on schedule, without you touching it."
    },
    {
      num: 5,
      title: "You get a report",
      desc: "Views and leads, tracked through our own funnel and links — no guessing, no disputing numbers."
    }
  ];
</script>

<section class="container section-padding">
  <h2>How we do it</h2>
  
  <div class="steps-list">
    {#each steps as step}
      <div class="step-item">
        <div class="step-num">{step.num}</div>
        <div class="step-content">
          <h4>{step.title}</h4>
          <p>{step.desc}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  h2 {
    margin-bottom: 2rem;
  }

  .steps-list {
    border-top: 1px solid var(--border-color);
  }

  .step-item {
    display: flex;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .step-num {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    color: var(--highlight);
    width: 3rem;
    flex-shrink: 0;
  }

  .step-content h4 {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .step-content p {
    margin: 0;
    font-size: 1.05rem;
    color: #444;
  }
</style>
