<script>
  import { onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge'
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
    <h2 class="p-8 md:px-12 print:!p-0 print:!pb-8">{title}</h2>
    {#if showTimeline && intersectionNodes}
      <Timeline events={items} {intersectionNodes} class="absolute inset-x-0 -mt-3"/>
    {/if}
  </header>
  {#if items.length}
    <div class="items {twMerge('p-8 md:p-12 pt-0 md:pt-0', showTimeline && '!pt-8', 'print:!p-0')} divided">
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

  @media screen {
    header {
      @apply sticky z-10 top-0 leading-none bg-white bg-opacity-90 backdrop-blur;
    }
  }
</style>
