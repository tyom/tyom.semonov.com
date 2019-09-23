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
</script>

<style>
  @import '../css/variables.css';

  .experience-item {
    page-break-inside: avoid;
    position: relative;
  }

  .experience-item::before {
    content: none;
  }

  .experience-item + .experience-item::before {
    content: '';
  }

  h4 {
    margin: 1.1em 0 0.5em;
    font-size: 1em;
  }

  .name {
    margin: 0;
    font-size: 1.25em;
  }

  .period,
  .role {
    margin: 0;
    font-size: 0.9em;
  }

  .role,
  .duration {
    color: #666;
  }

  .type {
    font-size: 0.75em;
    font-weight: 500;
    display: inline-block;
    padding: 0.1em 0.4em;
    text-transform: uppercase;
    border-radius: 0.2em;
    background-color: #eee;
    margin-left: 0.2em;
  }

  * + .description {
    margin-top: 1em;
  }

  footer {
    font-size: 0.9em;
  }

  @media screen {
    .divided::before {
      color: var(--panel-color-hi);
    }

    .experience-item {
      padding: var(--padding);
    }

    .experience-item::before {
      margin: calc((var(--padding) + 2px) * -1) 0 var(--padding);
    }

    :global(.experience-item.visible)::before {
      opacity: 1;
    }
  }

  @media print {
    .type {
      color: #aaa;
      border: 1px solid #ccc;
      background-color: transparent;
    }
  }
</style>

<div
  class="experience-item divided"
  class:u-print-hidden={shouldHideFromPrint()}>
  <header>
    <div class="period">
      {start.month} {start.year} - {end.month} {end.year}
      <span class="duration">({periodDuration(start, end)})</span>
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
        <span class="type">Contractor</span>
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
