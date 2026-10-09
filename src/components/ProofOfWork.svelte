<script>
  // ProofOfWork component - Esprē Health Showcase
  const assets = [
    {
      format: "YouTube Video",
      title: "Pillar Long-Form Video",
      desc: "Healthcare Doesn't Understand the Patient (Full Episode)",
      url: "https://youtu.be/iOw7PYt4OD8?si=Ye4NyHF9UTWmJuAV"
    },
    {
      format: "Short Form Reel",
      title: "Algorithmic Hook Cut",
      desc: "Fast-paced micro cut with kinetic typography",
      url: "https://www.instagram.com/reel/DagHXkEj0SW/?stkn=MW9qYXI3YTkwOHAzbg=="
    },
    {
      format: "Engagement Reel",
      title: "Founder Discussion",
      desc: "High-debate clip built for founder shares & comments",
      url: "https://www.instagram.com/reel/DadXBqaDmnx/?stkn=MWd6NXd1eDVtZ2V1eQ=="
    },
    {
      format: "Carousel Post",
      title: "Educational Slides",
      desc: "Takeaways distilled into high-save visual infographics",
      url: "https://www.instagram.com/p/DZDmyn_kjDN/?stkn=MWJ2bDRjMXByNDNjMQ=="
    }
  ];
</script>

<section class="container section-padding">
  <h2>Proof of work: Esprē Health</h2>
  <p>One conversation engineered into four omni-channel distribution formats.</p>
  
  <div class="projects-grid">
    {#each assets as asset}
      <a href={asset.url} target="_blank" rel="noopener noreferrer" class="project-column">
        <div class="video-card">
          <span class="format-badge">{asset.format}</span>
          <div class="play-btn-small">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <div class="client-name">{asset.title}</div>
        </div>
        <div class="project-desc">
          {asset.desc}
        </div>
      </a>
    {/each}
  </div>
</section>

<style>
  h2 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 2rem;
    color: var(--text-secondary, #86868b);
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
    text-decoration: none;
    color: inherit;
  }

  .video-card {
    background-color: var(--card-bg, #1d1d1f);
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
    border-radius: 12px;
    aspect-ratio: 9/12;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.2rem;
  }

  .format-badge {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-blue, #0071e3);
  }

  .play-btn-small {
    align-self: flex-end;
    background-color: rgba(255, 255, 255, 0.9);
    color: #000;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .client-name {
    font-weight: 600;
    font-size: 1rem;
    align-self: flex-start;
  }

  .project-desc {
    background-color: transparent;
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
    padding: 1rem;
    border-radius: 12px;
    font-size: 0.88rem;
    color: var(--text-secondary, #86868b);
    height: 100%;
  }
</style>
