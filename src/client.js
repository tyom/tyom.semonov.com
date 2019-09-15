import * as sapper from '@sapper/app';

function googleAnalytics(gaId) {
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.body.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', gaId);
}

sapper.start({
  target: document.querySelector('#container'),
});

if (process.env.GA_TRACKING_ID) {
  googleAnalytics(process.env.GA_TRACKING_ID);
}
