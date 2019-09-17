<script>
  import LinkWithPreview from '../LinkWithPreview.svelte';

  export let items = [];
  export let inlineSeparator = ', ';

  const separator = (idx, list) => (idx < list.length - 1 ? inlineSeparator : '');
  const formattedList = items.filter(x => x.name);
</script>

<style>
  * + ul {
    margin-top: 0.5em;
  }

  ul {
    padding-left: 1.1em;
    margin: 0;
  }
</style>

<ul class="plain-list">
  {#each formattedList as item}
    <li>
      {#if item.links}
        {#each item.links as link, idx}
          {#if link.url}<LinkWithPreview href={link.url} descriptionUrl={link.wikipedia} description={link.description}>{link.name}</LinkWithPreview>{:else}{link.name}{/if}{separator(idx, item.links)}
        {/each}
      {:else}
        {item.name}
      {/if}
      <svelte:self items={item.children} />
    </li>
  {/each}
</ul>
