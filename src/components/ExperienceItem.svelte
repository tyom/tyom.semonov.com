<script>
  import {
    formatMonthsToYearsAndMonths,
    getNumberOfMonthsBetweenDates,
  } from '$lib/utils';
  import List from './List';

  const PRINT_TRUNCATE_NUMBER_OF_YEARS = 4;

  function shouldHideFromPrint() {
    const itemStartYear = parseInt(end.year);
    const yearsAgo = new Date().getFullYear() - PRINT_TRUNCATE_NUMBER_OF_YEARS;
    return itemStartYear < yearsAgo;
  }

  export let name;
  export let description = null;
  export let start = {};
  export let end = {};
  export let location = null;
  export let role = '';
  export let isContractor = false;
  export let technologies = [];

  const numberOfFullMonths = getNumberOfMonthsBetweenDates(start, end);
  const duration = formatMonthsToYearsAndMonths(numberOfFullMonths);
</script>

<div
  class="experience-item space-y-4 break-inside-avoid-page max-w-[70ch]"
  class:contractor={isContractor}
  class:print:hidden={shouldHideFromPrint()}
>
  <header class="space-y-1">
    <div class="text-sm font-medium">
      {start.month}
      {start.year} -
      {#if end.year}{end.month} {end.year}{:else}present{/if}
      {#if duration}
        <span class="text-gray-500">({duration})</span>
      {/if}
      {#if location}
        <span class="text-gray-500">({location})</span>
      {/if}
    </div>
    <h3 class="font-bold leading-tight text-[1.25em]">
      {name}
    </h3>
    <div class="text-gray-500">
      {role}
      {#if isContractor}
        <span
          class="inline-block align-middle text-[0.6rem] font-bold uppercase py-0.5 px-1 rounded bg-blue-400/15
                text-blue-950 dark:text-blue-100
                print:(text-gray-600 border border-zinc-300 bg-none ml-1 text-xs)"
        >
          Contract
        </span>
      {/if}
    </div>
  </header>
  {#if description}
    <div class="max-w-[70ch] space-y-4">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html description}
    </div>
  {/if}
  {#if technologies.length}
    <footer class="text-[0.85em]">
      <h4 class="font-bold">Technologies & tools</h4>
      <List items={technologies} inline />
    </footer>
  {/if}
</div>

<style>
  @media screen {
    :global(.experience-item)::before {
      --at-apply: transition duration-200ms;
    }
    :global(.experience-item.visible)::before {
      --at-apply: text-yellow-500 opacity-100;
    }
    :global(.experience-item.contractor.visible)::before {
      --at-apply: text-blue-500 opacity-100;
    }
  }
</style>
