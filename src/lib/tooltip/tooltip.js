import { createPopper } from '@popperjs/core';
import './tooltip.css';

function fetchData(url) {
  return fetch(url).then((res) => res.json());
}

export const tooltip = (node, { text: tooltipText, url, resultProp }) => {
  if (!tooltipText && !url) {
    return;
  }

  const tooltip = document.createElement('div');
  tooltip.id = 'tooltip';
  tooltip.role = 'tooltip';

  async function append() {
    document.body.appendChild(tooltip);
    tooltip.style.opacity = '0';

    if (!tooltipText && url) {
      const result = await fetchData(url);
      tooltipText = resultProp ? result[resultProp] : result;
    }

    tooltip.innerHTML = '<div id="arrow" data-popper-arrow></div>';
    tooltip.appendChild(document.createTextNode(tooltipText));

    createPopper(node, tooltip, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 10,
          },
        },
      ],
    });

    setTimeout(() => {
      tooltip.style.opacity = '1';
    });
  }

  function remove() {
    tooltip.remove();
  }

  node.addEventListener('mouseenter', append);
  node.addEventListener('mouseleave', remove);

  return {
    destroy() {
      remove();
      node.removeEventListener('mouseenter', append);
      node.removeEventListener('mouseleave', remove);
    },
  };
};
