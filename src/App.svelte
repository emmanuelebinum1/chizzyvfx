<script>
  import './app.css';
  import { onMount } from 'svelte';
  import Home from './pages/Home.svelte';
  import ContentStrategist from './pages/ContentStrategist.svelte';
  import Optin from './pages/Optin.svelte';
  import Training from './pages/Training.svelte';

  function getRoute() {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '/').replace(/\/$/, '');

    const current = path || hash || '/';

    if (current === '/content-strategist') {
      return '/content-strategist';
    }
    if (current === '/optin' || current === '/blueprint') {
      return '/optin';
    }
    if (current === '/training' || current === '/masterclass') {
      return '/training';
    }
    return '/';
  }

  let currentRoute = $state(getRoute());

  function navigate(to, e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (currentRoute !== to) {
      window.history.pushState({}, '', to);
      currentRoute = to;
      window.scrollTo(0, 0);
    }
  }

  onMount(() => {
    // Restore theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (savedTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
    }

    currentRoute = getRoute();

    const handlePopState = () => {
      currentRoute = getRoute();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  });
</script>

{#if currentRoute === '/content-strategist'}
  <ContentStrategist onNavigate={navigate} />
{:else if currentRoute === '/optin'}
  <Optin onNavigate={navigate} />
{:else if currentRoute === '/training'}
  <Training onNavigate={navigate} />
{:else}
  <Home onNavigate={navigate} />
{/if}
