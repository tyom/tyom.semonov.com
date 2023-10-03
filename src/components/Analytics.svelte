<script>
  import { browser } from '$app/environment';
  import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';

  export let id = PUBLIC_GA_MEASUREMENT_ID;

  function gtag() {
    window.dataLayer.push(arguments);
  }

  if (browser) {
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', id);
  }
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id={id}"></script>
</svelte:head>
