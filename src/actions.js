import { listen } from 'svelte/internal';
import Popper from 'popper.js';

export async function tooltip(node, { text, url, resultProp }) {
  if (!text && !url) {
    return;
  }

  const el = document.createElement('div');
  const arrowEl = document.createElement('div');
  el.className = 'popper';
  arrowEl.className = 'popper__arrow';
  arrowEl.setAttribute('x-arrow', '');

  let tooltipText = text;

  async function append() {
    document.body.appendChild(el);
    el.style.zIndex = '10';
    el.style.opacity = '0';

    if (!tooltipText && url) {
      const result = await fetch(url).then((res) => res.json());
      tooltipText = resultProp ? result[resultProp] : result;
    }

    el.textContent = tooltipText;

    new Popper(node, el, {
      placement: 'bottom',
      positionFixed: true,
    });

    setTimeout(() => {
      el.style.opacity = '1';
    });

    el.appendChild(arrowEl);
  }

  function remove() {
    el.remove();
  }

  const cancelMouseEnter = listen(node, 'mouseenter', append);
  const cancelMouseLeave = listen(node, 'mouseleave', remove);

  return {
    destroy() {
      remove();
      cancelMouseEnter();
      cancelMouseLeave();
    },
  };
}
