<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { getNumberOfMonthsBetweenDates } from '../utils';
  export let events;
  export let intersectionNodes;

  const intersectedEvents = [];

  const eventsMonthWithLength = events.map(event => ({
    name: event.name,
    modifier: event.isContractor ? 'contract' : 'permanent',
    monthLength: getNumberOfMonthsBetweenDates(event.start, event.end),
  }));
  const totalTimelineInMonths = eventsMonthWithLength.reduce(
    (acc, curr) => acc + curr.monthLength,
    0,
  );
  const firstDate = events[events.length - 1].start;
  const lastDate = events[0].end;
  const scaledEvents = eventsMonthWithLength.map(event => ({
    ...event,
    percent: (100 / totalTimelineInMonths) * event.monthLength,
  }));
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
    observer && observer.destroy();
  })
</script>

<style>
  .timeline {
    position: relative;
  }

  .events {
    height: 6px;
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

  .from-year,
  .to-year {
    font-size: 9px;
    line-height: 1;
    position: absolute;
    top: 0;
    color: #999;
    font-weight: bold;
  }

  .to-year {
    left: -22px;
  }
  .from-year {
    right: -22px;
  }

  @media print {
    .timeline {
      display: none;
    }
  }
</style>

{#if timelineEvents}
  <div class="timeline" transition:fade="{{delay: 250, duration: 300}}">
    <div class="from-year">{firstDate.year}</div>
    <div class="events">
      {#each timelineEvents as event}
        <div
          class="timeline-event {event.modifier}"
          class:visible={event.isVisible}
          style="width: {event.percent}%"
          title={event.name} />
      {/each}
    </div>
    <div class="to-year">{lastDate.year}</div>
  </div>
{/if}
