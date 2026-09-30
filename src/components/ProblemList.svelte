<script>
  // ProblemList component
  const problems = [
    "You know content should be driving your sales, but it's sitting separate from your ads and outreach instead of reinforcing them.",
    "You're either doing it all yourself between actual client work, or paying for pieces of it — an editor here, a scriptwriter there — and still managing all of them.",
    "You have long-form content sitting on YouTube that never gets cut into anything else.",
    "You don't have a lead magnet funnel turning your content into an actual list, so views come and go with nothing captured."
  ];
</script>

<section class="container section-padding">
  <h2>The problem, if you're honest about it</h2>
  
  <div class="problem-list">
    {#each problems as problem}
      <div class="problem-item">
        <span class="dash">—</span>
        <p>{problem}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  h2 {
    margin-bottom: 2rem;
  }

  .problem-list {
    border-top: 1px solid var(--border-color);
  }

  .problem-item {
    display: flex;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .dash {
    color: var(--highlight);
    font-weight: bold;
    margin-right: 1rem;
    font-size: 1.2rem;
    line-height: 1.6;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.6;
  }
</style>
