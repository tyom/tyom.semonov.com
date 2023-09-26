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

<section bind:this={sectionEl} class:with-timeline={showTimeline}>
  <header>
    <h2>{title}</h2>
    {#if showTimeline && intersectionNodes}
      <Timeline events={items} {intersectionNodes} />
    {/if}
  </header>
  {#if items.length}
    <div class="items divided">
      {#each items as item}
        <ExperienceItem {...item} />
      {/each}
    </div>
  {/if}
</section>

<style lang="postcss">
  h2 {
    @apply text-2xl text-gray-500 uppercase font-bold tracking-wide;
    page-break-inside: avoid;
    page-break-after: avoid;
  }

  header h2 {
    @apply p-8 md:px-12;
  }

  .items {
    @apply p-8 md:p-12 pt-0 md:pt-0;
  }

  .with-timeline .items {
    @apply pt-8;
  }

  @media screen {
    header {
      @apply sticky z-10 top-0 leading-none bg-white bg-opacity-90;
      backdrop-filter: blur(5px);

      & :global(.timeline) {
        @apply absolute inset-x-0 -mt-3;
      }
    }
  }

  @media print {
    header h2,
    .items {
      @apply p-0;
    }
  }
</style>
