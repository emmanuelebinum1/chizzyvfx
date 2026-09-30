<script>
  import './app.css';
  import Hero from './components/Hero.svelte';
  import AudioNote from './components/AudioNote.svelte';
  import ProblemList from './components/ProblemList.svelte';
  import ServicesGrid from './components/ServicesGrid.svelte';
  import TargetAudience from './components/TargetAudience.svelte';
  import ProcessSteps from './components/ProcessSteps.svelte';
  import Pricing from './components/Pricing.svelte';
  import ProofOfWork from './components/ProofOfWork.svelte';
  import LeadMagnet from './components/LeadMagnet.svelte';
  import Footer from './components/Footer.svelte';
</script>

<main>
  <Hero />
  <hr class="container" style="margin-top: 0;" />
  <AudioNote />
  <hr class="container" />
  <ProblemList />
  <hr class="container" />
  <ServicesGrid />
  <hr class="container" />
  <TargetAudience />
  <hr class="container" />
  <ProcessSteps />
  <hr class="container" />
  <Pricing />
  <hr class="container" />
  <ProofOfWork />
  <hr class="container" />
  <LeadMagnet />
  <hr class="container" />
  <Footer />
</main>
