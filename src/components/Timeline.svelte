<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { getNumberOfMonthsBetweenDates } from '../utils';
  export let events;
  export let intersectionNodes;

  const intersectedEvents = [];

  const eventsWithMonthLength = events.map(event => ({
    name: event.name,
    modifier: event.isContractor ? 'contract' : 'permanent',
    monthLength: getNumberOfMonthsBetweenDates(event.start, event.end),
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
      event.isVisible = entry.isIntersecting;
    });
    timelineEvents = updatedEvents;
  }

  onMount(() => {
    if (!window.IntersectionObserver) {
      return;
    }
    observer = new IntersectionObserver(intersectionCallback, {
      threshold: 0.5,
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
  <div class="timeline" transition:fade={{ delay: 250, duration: 300 }}>
    <div class="end-year">{lastDate.year}</div>
    <div class="events">
      {#each timelineEvents as event}
        <div
          class="timeline-event {event.modifier}"
          class:visible={event.isVisible}
          style="width: {event.percent}%"
          title={event.name} />
      {/each}
    </div>
    <div class="start-year">{firstDate.year}</div>
  </div>
{/if}
