<script>
  // ProofOfWork component
  const projects = [
    {
      client: "Esprē Health",
      desc: "Weekly YouTube + IG content system"
    },
    {
      client: "Shopbot",
      desc: "Content-driven outreach & funnel"
    },
    {
      client: "Wealthflow",
      desc: "Repurposed content series"
    }
  ];
</script>

<section class="container section-padding">
  <h2>Proof of work</h2>
  <p>A sample of content and systems built for current partners.</p>
  
  <div class="projects-grid">
    {#each projects as project}
      <div class="project-column">
        <div class="video-card">
          <button class="play-btn-small">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <div class="client-name">{project.client}</div>
        </div>
        <div class="project-desc">
          {project.desc}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  h2 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .project-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .video-card {
    background-color: var(--border-color);
    border-radius: 4px;
    aspect-ratio: 9/16;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
  }

  .play-btn-small {
    align-self: flex-end;
    background-color: rgba(255, 255, 255, 0.8);
    color: var(--text-color);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .client-name {
    font-weight: 600;
    font-size: 1.1rem;
    align-self: flex-start;
  }

  .project-desc {
    background-color: transparent;
    border: 1px solid var(--border-color);
    padding: 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #444;
    height: 100%;
  }
</style>
