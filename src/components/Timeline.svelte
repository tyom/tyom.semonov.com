<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { getNumberOfMonthsBetweenDates, periodDuration } from '$lib/utils';
  import { tooltip } from '../actions';

  const INTERSECTION_RATIO = 0.6;

  export let events;
  export let intersectionNodes = [];

  let containerEl;

  const eventsWithMonthLength = events.map((event, idx) => ({
    name: event.name,
    modifier: event.isContractor ? 'contract' : 'permanent',
    monthLength: getNumberOfMonthsBetweenDates(event.start, event.end),
    label: `${event.name}: ${periodDuration(event.start, event.end)}`,
    target: intersectionNodes[idx],
  }));
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
  const scaledEvents = eventsWithMonthLength.map((event) => ({
    ...event,
    percent: (100 / totalTimelineInMonths) * event.monthLength,
  }));
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
          class="relative bg-gray-300 min-w-[4px] hover:bg-[var(--panel-color-hi)] hover:transition-colors duration-200 {event.modifier}"
          class:visible={event.isVisible}
          aria-label="{event.label}"
          style="width: {event.percent}%"
          on:click={() => scrollTo(event.target)}
          use:tooltip={{ text: event.label }}
        />
      {/each}
    </div>
    <div class="year-label">{firstDate.year}</div>
  </div>
{/if}

<style lang="postcss">
  .contract {
    @apply bg-blue-300;
  }

  .permanent {
    @apply bg-yellow-300;
  }

  .visible {
    @apply bg-blue-900;
  }

  .year-label {
    @apply w-8 md:w-12 px-1 font-bold text-gray-500 text-[8px];
  }
</style>
