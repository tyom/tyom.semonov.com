import { createPopper } from '@popperjs/core';
import './tooltip.css';

export const tooltip = (node, { text: tooltipText, url, resultProp }) => {
  if (!tooltipText && !url) {
    return;
  }

  const tooltip = document.createElement('div');
  tooltip.id = 'tooltip';
  tooltip.role = 'tooltip';
  let popperInstance = null;
  let abortController = null;
  let isAppending = false;

  async function append() {
    // Prevent multiple simultaneous append operations
    if (isAppending) return;
    isAppending = true;

    // Cancel any previous fetch operation
    if (abortController) {
      abortController.abort();
    }

    document.body.appendChild(tooltip);
    tooltip.style.opacity = '0';

    if (!tooltipText && url) {
      try {
        abortController = new AbortController();
        const res = await fetch(url, { signal: abortController.signal });
        if (!res.ok) {
          throw new Error(
            `Failed to fetch tooltip data: ${res.status} ${res.statusText}`,
          );
        }
        const result = await res.json();
        tooltipText = resultProp ? result[resultProp] : result;
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to load tooltip:', error);
          tooltipText = 'Failed to load tooltip';
        } else {
          // Request was aborted, clean up and return
          isAppending = false;
          tooltip.remove();
          return;
        }
      } finally {
        abortController = null;
      }
    }

    tooltip.innerHTML = '<div id="arrow" data-popper-arrow></div>';
    tooltip.appendChild(document.createTextNode(tooltipText));

    popperInstance = createPopper(node, tooltip, {
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

    isAppending = false;
  }

  function remove() {
    // Cancel any pending fetch
    if (abortController) {
      abortController.abort();
      abortController = null;
    }

    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }

    tooltip.remove();
    isAppending = false;
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
