<script>
  import { dev } from '$app/environment';
  import { PUBLIC_DISABLE_ANALYTICS } from '$env/static/public';
  import Analytics from '$components/Analytics.svelte';
  import '../global.css';

  const enableAnalytics =
    !dev && !['true', '1'].includes(PUBLIC_DISABLE_ANALYTICS);
</script>

{#if enableAnalytics}
  <Analytics />
{/if}

<slot />
