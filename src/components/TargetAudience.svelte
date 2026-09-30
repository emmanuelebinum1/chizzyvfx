<script>
  // TargetAudience component
  const points = [
    { type: 'check', text: "You already have an offer that sells — this reinforces it, it doesn't invent it." },
    { type: 'check', text: "You're already running ads, outreach, or some system of lead generation and closing." },
    { type: 'check', text: "You want content pushing leads toward that system — as awareness, or as direct conversion — not content for its own sake." },
    { type: 'cross', text: "Not for you yet if you have no sales motion at all — content can't be your only system." }
  ];
</script>

<section class="container section-padding">
  <h2>Who this is for</h2>
  
  <div class="audience-list">
    {#each points as point}
      <div class="audience-item">
        <span class="icon" class:cross="{point.type === 'cross'}">
          {point.type === 'check' ? '✓' : '✗'}
        </span>
        <p>{point.text}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  h2 {
    margin-bottom: 2rem;
  }

  .audience-list {
    border-top: 1px solid var(--border-color);
  }

  .audience-item {
    display: flex;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .icon {
    margin-right: 1rem;
    font-size: 1.2rem;
    line-height: 1.6;
    color: #2b5b54; /* Dark green for check */
    font-weight: bold;
  }

  .icon.cross {
    color: #8b3a3a; /* Dark red for cross */
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.6;
  }
</style>
