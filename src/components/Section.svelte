<script>
  import { onMount } from 'svelte';
  import ExperienceItem from './ExperienceItem.svelte';
  import Timeline from './Timeline.svelte';

  const NUMBER_OF_ITEMS_TO_SHOW_IN_PRINT = 6;

  export let title;
  export let items = [];
  export let showTimeline = false;

  let intersectionNodes;
  let sectionEl;

  $: timelineClass = showTimeline
    ? 'backdrop-blur-lg bg-gray-100/80 dark:bg-gray-900/80 print:bg-transparent print:dark:bg-transparent'
    : '';

  onMount(() => {
    intersectionNodes = sectionEl.querySelectorAll('.experience-item');
  });
</script>

<section bind:this={sectionEl}>
  <header class="sticky top-0 z-10 leading-none {timelineClass}">
    <h2
      class="break-inside-avoid-page break-after-avoid-page p-8 text-2xl font-bold tracking-wide text-gray-500 uppercase md:px-12 print:p-0 print:pb-6"
    >
      {title}
    </h2>
    {#if showTimeline && intersectionNodes}
      <Timeline
        events={items}
        {intersectionNodes}
        class="absolute inset-x-0 -mt-3"
      />
    {/if}
  </header>
  {#if items.length}
    <div
      class="divided space-y-4 p-8 pt-0 md:p-12 md:pt-0 print:!p-0"
      class:!pt-8={showTimeline}
    >
      {#each items as item, idx}
        <ExperienceItem
          {...item}
          includeInPrint={idx <= NUMBER_OF_ITEMS_TO_SHOW_IN_PRINT}
        />
      {/each}
    </div>
  {/if}
</section>
