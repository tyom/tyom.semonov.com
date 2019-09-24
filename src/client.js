import * as sapper from '@sapper/app';

if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

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

function trackOutboundLinkClicks(event) {
  const [tracker] = window.ga && window.ga.getAll();
  if (!tracker) return;
  const anchor = event.target.closest('a');
  if (anchor) {
    const trackerName = tracker.a.data.values[':name'];
    window.ga(`${trackerName}.send`, 'event', {
      eventCategory: 'Outbound link',
      eventAction: 'click',
      eventLabel: anchor.href,
      transport: 'beacon',
    });
  }
}

sapper.start({
  target: document.querySelector('#container'),
});

if (process.env.GA_TRACKING_ID) {
  googleAnalytics(process.env.GA_TRACKING_ID);
  document.addEventListener('click', trackOutboundLinkClicks);
}
