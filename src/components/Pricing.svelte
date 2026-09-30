<script>
  // Pricing component
  const tiers = [
    {
      price: "₦250k",
      name: "Starting tier",
      desc: "Where every client begins",
      scope: "Full scope, from day one"
    },
    {
      price: "₦350k",
      name: "Tier 2",
      desc: "After 50k views across platforms + 50 tracked leads in a month",
      scope: "Same scope, proven results"
    },
    {
      price: "₦500k",
      name: "Tier 3",
      desc: "After 150k views across platforms + 150 tracked leads in a month",
      scope: "Full rate, full engine"
    },
    {
      price: "₦700k",
      name: "Tier 4",
      desc: "After 400k views across platforms + 400 tracked leads in a month",
      scope: "Scaled engine, scaled rate"
    },
    {
      price: "₦950k",
      name: "Tier 5",
      desc: "After 1M views across platforms + 1,000 tracked leads in a month",
      scope: "Top tier, full team behind it"
    }
  ];
</script>

<section class="container section-padding">
  <h2>Pricing — we start low, and earn our way up</h2>
  <p class="pricing-intro">We're result-focused, so we start below our normal rate and only increase it once your content hits specific, tracked metrics.</p>
  
  <div class="comparison-card">
    <div class="traditional">
      <span class="label">Traditional setup</span>
      <div class="price-strikethrough">₦450k+</div>
      <p class="sub-desc">SMM + editor + scriptwriter, separately managed</p>
    </div>
    
    <div class="arrow">→</div>
    
    <div class="with-us">
      <span class="starting-label">Starting with us</span>
      <div class="price-highlight">₦250k</div>
      <span class="sub-desc">one team, nothing to manage</span>
    </div>
  </div>

  <div class="tiers">
    {#each tiers as tier}
      <div class="tier-card">
        <div class="tier-price">
          <span class="amount">{tier.price}</span><span class="mo">/mo</span>
        </div>
        <div class="tier-info">
          <h4>{tier.name}</h4>
          <p>{tier.desc}</p>
        </div>
        <div class="tier-scope">
          {tier.scope}
        </div>
      </div>
    {/each}
  </div>

  <p class="pricing-footer">
    Leads are tracked through the funnel and links we build and run for you — you get a report showing exactly where every view and lead came from.
  </p>
</section>

<style>
  h2 {
    margin-bottom: 1rem;
  }

  .pricing-intro {
    margin-bottom: 3rem;
  }

  .comparison-card {
    background-color: var(--bg-color-alt);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .traditional, .with-us {
    flex: 1;
  }

  .with-us {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .label {
    display: block;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .price-strikethrough {
    font-family: var(--font-serif);
    font-size: 1.8rem;
    color: #888;
    text-decoration: line-through;
    text-decoration-color: var(--highlight);
    margin-bottom: 0.5rem;
  }

  .sub-desc {
    font-size: 0.9rem;
    color: #666;
  }

  .arrow {
    font-size: 1.5rem;
    color: #888;
    padding: 0 2rem;
  }

  .starting-label {
    font-size: 1rem;
  }

  .price-highlight {
    font-family: var(--font-serif);
    font-size: 2.5rem;
    color: #2b5b54;
  }

  .tiers {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .tier-card {
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    background-color: transparent;
  }

  .tier-price {
    flex: 0 0 150px;
    font-family: var(--font-serif);
  }

  .amount {
    font-size: 1.8rem;
  }

  .mo {
    font-size: 0.9rem;
    color: #666;
    font-family: var(--font-sans);
  }

  .tier-info {
    flex: 1;
    padding-right: 2rem;
  }

  .tier-info h4 {
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }

  .tier-info p {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
  }

  .tier-scope {
    flex: 0 0 200px;
    text-align: right;
    font-size: 0.95rem;
    color: #444;
  }

  .pricing-footer {
    font-size: 0.9rem;
    color: #666;
  }

  @media (max-width: 768px) {
    .comparison-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
    }
    
    .arrow {
      padding: 0;
      transform: rotate(90deg);
    }
    
    .tier-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .tier-price, .tier-info, .tier-scope {
      flex: none;
      width: 100%;
      text-align: left;
      padding-right: 0;
    }
  }
</style>
