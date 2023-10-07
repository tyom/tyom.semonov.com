<script>
  import { browser } from '$app/environment';
  import {
    PUBLIC_GA_MEASUREMENT_ID,
    PUBLIC_CLARITY_ID,
  } from '$env/static/public';

  function gtag() {
    window.dataLayer.push(arguments);
  }

  if (browser) {
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', PUBLIC_GA_MEASUREMENT_ID);

    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = `https://www.clarity.ms/tag/${i}`;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', PUBLIC_CLARITY_ID);
  }
</script>

<svelte:head>
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GA_MEASUREMENT_ID}"
  ></script>
</svelte:head>
