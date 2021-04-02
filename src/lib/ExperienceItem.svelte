<script>
  import List from './List';
  import { periodDuration } from '../utils';

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

<div class="experience-item" class:u-print-hidden={shouldHideFromPrint()}>
  <header>
    <div class="period">
      {start.month}
      {start.year} -
      {#if end.year}{end.month} {end.year}{:else}present{/if}
      {#if duration}
        <span class="duration">({duration})</span>
      {/if}
      {#if location}
        <span class="location">({location})</span>
      {/if}
    </div>
    <h3 class="name">
      {name}
      {#if isDefunct}
        <span class="defunct">(defunct)</span>
      {/if}
    </h3>
    <div class="role">
      {role}
      {#if isContractor}
        <span class="type">Contract</span>
      {/if}
    </div>
  </header>
  {#if description}
    <div class="description">
      {@html description}
    </div>
  {/if}
  {#if technologies.length}
    <footer>
      <h4>Technologies & tools</h4>
      <List items={technologies} inline />
    </footer>
  {/if}
</div>

<style lang="postcss">
  .experience-item {
    page-break-inside: avoid;

    & > * + * {
      @apply mt-4;
    }
  }

  header > * + * {
    @apply mt-1;
  }

  .name {
    @apply font-bold leading-tight;
    font-size: 1.25em;
  }

  .period,
  .role {
    font-size: 0.95em;
  }

  .period {
    @apply font-medium;
  }

  .role,
  .duration {
    @apply text-gray-500;
  }

  .type {
    @apply inline align-middle font-bold uppercase p-1 rounded bg-blue-50 text-blue-900;
    font-size: 0.8rem;
  }

  footer {
    font-size: 0.85em;
  }

  h4 {
    @apply font-bold;
  }

  @media screen {
    :global(.experience-item.visible)::before {
      @apply text-blue-900 opacity-100;
    }
  }

  @media print {
    .type {
      @apply text-gray-500 border bg-white;
      font-size: 7pt;
      margin-left: 2pt;
    }
  }
</style>
