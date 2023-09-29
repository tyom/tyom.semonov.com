<script>
  import { periodDuration } from '$lib/utils';
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
  export let isDefunct = false;
  export let isContractor = false;
  export let technologies = [];

  const duration = periodDuration(start, end);
</script>

<div
  class="experience-item space-y-4 break-inside-avoid-page"
  class:u-print-hidden={shouldHideFromPrint()}
>
  <header class="space-y-1">
    <div class="text-[0.95em] font-medium">
      {start.month}
      {start.year} -
      {#if end.year}{end.month} {end.year}{:else}present{/if}
      {#if duration}
        <span class="text-gray-500">({duration})</span>
      {/if}
      {#if location}
        <span class="location">({location})</span>
      {/if}
    </div>
    <h3 class="font-bold leading-tight text-[1.25em]">
      {name}
      {#if isDefunct}
        <span class="defunct">(defunct)</span>
      {/if}
    </h3>
    <div class="text-[0.95em] text-gray-500">
      {role}
      {#if isContractor}
        <span
          class="inline align-middle text-sm font-bold uppercase p-1 rounded bg-blue-50 text-blue-900 print:(text-gray-500 border bg-white ml-1 text-xs)"
        >
          Contract
        </span>
      {/if}
    </div>
  </header>
  {#if description}
    <div class="description">
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
    :global(.experience-item.visible)::before {
      --at-apply: text-blue-900 opacity-100;
    }
  }
</style>
