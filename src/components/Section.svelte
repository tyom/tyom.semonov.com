<script>
  import { onMount } from 'svelte';
  import ExperienceItem from './ExperienceItem.svelte';
  import Timeline from './Timeline.svelte';

  export let title;
  export let items = [];
  export let showTimeline = false;

  let intersectionNodes;
  let sectionEl;

  onMount(() => {
    intersectionNodes = sectionEl.querySelectorAll('.experience-item');
  });
</script>

<section bind:this={sectionEl}>
  <header>
    <h2
      class="text-2xl text-gray-500 uppercase font-bold tracking-wide p-8 md:px-12 print:(!p-0 !pb-8) break-inside-avoid-page break-after-avoid-page"
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
      class="divided space-y-4 p-8 md:p-12 pt-0 md:pt-0 print:!p-0"
      class:!pt-8={showTimeline}
    >
      {#each items as item}
        <ExperienceItem {...item} />
      {/each}
    </div>
  {/if}
</section>

<style>
  @media screen {
    header {
      --at-apply: sticky z-10 top-0 leading-none bg-gray-100/80 backdrop-blur
        dark\:bg-gray-900/80;
    }
  }
</style>
