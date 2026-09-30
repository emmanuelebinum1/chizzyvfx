<script>
  // AudioNote component
</script>

<section class="container audio-note-section">
  <div class="audio-player">
    <button class="play-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </button>
    <div class="waveform">
      <div class="bar h-2"></div>
      <div class="bar h-4"></div>
      <div class="bar h-3"></div>
      <div class="bar h-5"></div>
      <div class="bar h-2"></div>
      <div class="bar h-4"></div>
      <div class="bar h-2"></div>
    </div>
  </div>

  <div class="note-box">
    <h3 class="note-title">A voice note from Chizzy — 2 min</h3>
    
    <p>Hey — I'm Chizzy. Before anything else, this is me talking to you directly, not a script written to sell you something. So give me two minutes.</p>
    
    <p>If you run a business or a personal brand, you already know content is tasking. It's not just "make a video." It's strategy, then scripting, then filming, then editing, then cutting that one video into ten more pieces, then actually posting all of it on time, on every platform. Most people either try to do it all themselves and burn out, or they hire a video editor and realize the editor alone doesn't solve the problem — you're still the one writing scripts, planning the calendar, and chasing consistency.</p>
    
    <p>I used to be that video editor. Just cuts, just polish. But I kept watching clients hand me raw footage with no strategy behind it, and the final video would look good and still underperform, because editing was never the actual bottleneck. So I rebuilt what I offer — and built a small team around it — to cover the whole thing: strategy, scripting, editing, repurposing, scheduling.</p>
    
    <p>Before AI, doing all of this for a client meant hiring three or four separate people, minimum. With AI in the workflow now, a small, tight team can do what used to take a department. That's the only reason this offer is possible at this price.</p>
    
    <p>This isn't for everyone. Keep listening for who it's actually for, and the pricing, below.</p>
  </div>
</section>

<style>
  .audio-note-section {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .audio-player {
    display: inline-flex;
    align-items: center;
    background-color: var(--bg-color-alt);
    border: 1px solid var(--border-color);
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    border-radius: 50px;
    margin-bottom: -1px; /* Overlaps slightly with note box or just sits above */
    position: relative;
    z-index: 2;
    margin-left: 2rem;
  }

  .play-btn {
    background-color: var(--highlight);
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    border: none;
  }

  .waveform {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .bar {
    width: 3px;
    background-color: #a09d93;
    border-radius: 2px;
  }

  .h-2 { height: 8px; }
  .h-3 { height: 12px; }
  .h-4 { height: 16px; }
  .h-5 { height: 20px; }

  .note-box {
    background-color: #e4dec8;
    padding: 3rem;
    border-radius: 0 4px 4px 4px;
    position: relative;
    border-left: 4px solid var(--highlight);
  }

  .note-title {
    color: #2b5b54;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
  }

  .note-box p {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.05rem;
  }

  .note-box p:last-child {
    margin-bottom: 0;
  }
</style>
