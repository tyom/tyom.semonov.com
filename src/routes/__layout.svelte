<script>
  import '../global.css';
  import { onMount } from 'svelte';

  function googleAnalytics(gaId) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.body.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gaId);
  }

  function captureOutboundLinkClicks(event) {
    const anchor = event.target.closest('a');
    if (anchor) {
      window.ga('send', 'event', {
        eventCategory: 'Outbound link',
        eventAction: 'click',
        eventLabel: anchor.href,
        transport: 'beacon',
      });
    }
  }

  onMount(() => {
    const gaTrackingId = process.env.GA_TRACKING_ID;
    if (gaTrackingId) {
      googleAnalytics(gaTrackingId);
      document.addEventListener('click', captureOutboundLinkClicks);

      () => document.removeEventListener('click', captureOutboundLinkClicks);
    }
  });
</script>

<slot />

<style>
  @page {
    margin: 1cm;
  }
</style>
