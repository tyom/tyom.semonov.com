<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { getNumberOfMonthsBetweenDates, periodDuration } from '../utils';
  import { tooltip } from '../actions';

  const INTERSECTION_RATIO = 0.5;

  export let events;
  export let intersectionNodes;

  const intersectedEvents = [];

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
  const firstDate = events[events.length - 1].start;
  const lastDate = events[0].end;
  const scaledEvents = eventsWithMonthLength.map(event =>
    Object.assign({}, event, {
      percent: (100 / totalTimelineInMonths) * event.monthLength,
    }),
  );
  let timelineEvents;
  let observer;

  function intersectionCallback(entries) {
    let updatedEvents = [...scaledEvents];
    entries.forEach(entry => {
      const event = updatedEvents.find(x => x.target === entry.target);
      event.isVisible = entry.intersectionRatio >= INTERSECTION_RATIO;
    });
    timelineEvents = updatedEvents;
  }

  function scrollTo(node) {
    node.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

<style>
  .timeline {
    position: relative;
  }

  .events {
    height: 7px;
    display: flex;
  }

  .timeline-event {
    background-color: #ddd;
    box-shadow: 0 0 0 1px #fff;
    min-width: 4px;
    position: relative;
    transition: 0.2s background-color;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--panel-color-hi);
      opacity: 0;
    }

    &:hover::before {
      opacity: 0.1;
    }
  }

  .contract {
    background-color: #c3d2f3;
  }

  .permanent {
    background-color: #f3d6ad;
  }

  .visible {
    background-color: var(--panel-color-hi);
  }

  .start-year,
  .end-year {
    font-size: 9px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    color: #999;
    font-weight: bold;
  }

  .end-year {
    left: -24px;
  }
  .start-year {
    right: -24px;
  }

  @media print {
    .timeline {
      display: none;
    }
  }
</style>

{#if timelineEvents}
  <div class="timeline" transition:fade={{ duration: 200 }}>
    <div class="end-year">{lastDate.year}</div>
    <div class="events">
      {#each timelineEvents as event}
        <div
          class="timeline-event {event.modifier}"
          class:visible={event.isVisible}
          style="width: {event.percent}%"
          on:click={() => scrollTo(event.target)}
          use:tooltip={{ text: event.label }} />
      {/each}
    </div>
    <div class="start-year">{firstDate.year}</div>
  </div>
{/if}
