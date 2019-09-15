<script>
  import LinkWithPreview from '../LinkWithPreview.svelte';

  const separator = (idx, list) => (idx < list.length - 1 ? ', ' : '');

  export let items = [];
  const formattedList = items.filter(x => x.name);
</script>

{#each formattedList as item, idx}
  {#if item.links}
    {#each item.links as link, idx}{#if link.url}<LinkWithPreview href={link.url} descriptionUrl={link.wikipedia} description={link.description}>{link.name}</LinkWithPreview>{:else}{link.name}{/if}{separator(idx, item.links)}{/each}{#if item.children}{' '}(<svelte:self items={item.children} />){/if}{separator(idx, items)}
  {:else}
    {item.name}{#if item.children}{' '}(<svelte:self items={item.children} />){/if}{separator(idx, items)}
  {/if}
{/each}
