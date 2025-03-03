<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import {
    formatMonthsToYearsAndMonths,
    getNumberOfMonthsBetweenDates,
  } from '$lib/utils';
  import { tooltip } from '$lib/tooltip';

  const INTERSECTION_RATIO = 0.4;

  export let events;
  export let intersectionNodes = [];

  let containerEl;

  const eventsWithMonthLength = events.map((event, idx) => {
    // Adding a full month to round up the difference > 1 month
    const numberOfFullMonths = getNumberOfMonthsBetweenDates(
      event.start,
      event.end,
    );

    return {
      name: event.name,
      modifier: event.isContractor ? 'contract' : 'permanent',
      monthLength: numberOfFullMonths,
      label: `${event.name}: ${formatMonthsToYearsAndMonths(
        numberOfFullMonths,
      )}`,
      target: intersectionNodes[idx],
    };
  });

  const totalTimelineInMonths = eventsWithMonthLength.reduce(
    (acc, curr) => acc + curr.monthLength,
    0,
  );

  const firstEvent = events[events.length - 1] || {};
  const lastEvent = events[0] || {};

  const firstDate = firstEvent.start || {};
  const lastDate = lastEvent.end
    ? lastEvent.end || {}
    : {
        year: new Date().getFullYear(),
      };
  const scaledEvents = eventsWithMonthLength.map((event) => {
    return {
      ...event,
      percent: (100 / totalTimelineInMonths) * event.monthLength,
    };
  });
  let timelineEvents = scaledEvents;
  let observer;

  function intersectionCallback(entries) {
    let updatedEvents = [...scaledEvents];
    entries.forEach((entry) => {
      const event = updatedEvents.find((x) => x.target === entry.target);
      event.isVisible = entry.intersectionRatio >= INTERSECTION_RATIO;

      if (event.isVisible) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
    timelineEvents = updatedEvents;
  }

  function scrollTo(node) {
    const scrollPosition =
      node.getBoundingClientRect().top + window.pageYOffset;
    const offset = containerEl.getBoundingClientRect().top;
    const scrollOffset = scrollPosition - offset;
    const derivedScrollOffset = scrollOffset < 100 ? 0 : scrollOffset;
    const supportsNativeSmoothScroll =
      'scrollBehavior' in document.documentElement.style;

    if (supportsNativeSmoothScroll) {
      window.scrollTo({
        top: derivedScrollOffset,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, derivedScrollOffset);
    }
  }

  onMount(() => {
    if (!window.IntersectionObserver) {
      return;
    }
    observer = new IntersectionObserver(intersectionCallback, {
      threshold: INTERSECTION_RATIO,
    });

    intersectionNodes.forEach((node, i) => {
      if (!scaledEvents[i]) return;
      scaledEvents[i].target = node;
      observer.observe(node);
    });
  });

  onDestroy(() => {
    observer && observer.disconnect();
  });
</script>

{#if timelineEvents}
  <div
    class="flex items-center print:hidden {$$props.class}"
    transition:fade={{ duration: 200 }}
    bind:this={containerEl}
  >
    <div class="year-label text-right">{lastDate.year}</div>
    <div class="flex flex-1 h-2 gap-px">
      {#each timelineEvents as event}
        <button
          class="btn bg-zinc-300 min-w-[4px] hover:(transition-colors duration-200 bg-zinc-400) {event.modifier}"
          class:on-screen={event.isVisible}
          aria-label={event.label}
          style="width: {event.percent}%"
          on:click={() => scrollTo(event.target)}
          use:tooltip={{ text: event.label }}
        ></button>
      {/each}
    </div>
    <div class="year-label">{firstDate.year}</div>
  </div>
{/if}

<style>
  .contract {
    --at-apply: bg-blue-500 bg-opacity-30 hover\:bg-opacity-60; /**/
  }

  .permanent {
    --at-apply: bg-yellow-500 bg-opacity-30 hover\:bg-opacity-60; /**/
  }

  .btn.on-screen {
    --at-apply: bg-opacity-100; /**/
  }

  .year-label {
    --at-apply: w-8 md\:w-12 px-1 font-bold text-gray-500 text-[0.6rem]; /**/
  }
</style>
