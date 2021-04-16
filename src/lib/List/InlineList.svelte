<script>
  import LinkWithPreview from '../LinkWithPreview.svelte';

  export let items = [];

  const separator = (idx, list) => (idx < list.length - 1 ? ', ' : '');
  const getPlainItemName = (item) => {
    if (typeof item.name === 'string') {
      return item.name;
    }
    const [parentName, children] = Object.entries(item.name)[0];
    return `${parentName} (${children.join(', ')})`;
  };
</script>

{#each items as item, idx}
  {#if item.links}
    {#each item.links as link, idx}{#if link.url}<LinkWithPreview
          href={link.url}
          descriptionUrl={link.wikipedia}
          description={link.description}>{link.name}</LinkWithPreview
        >{:else}{link.name}{/if}{separator(
        idx,
        item.links,
      )}{/each}{#if item.children}{' '}(<svelte:self
        items={item.children}
      />){/if}{separator(idx, items)}
  {:else}
    {getPlainItemName(item)}{#if item.children}{' '}(<svelte:self
        items={item.children}
      />){/if}{separator(idx, items)}
  {/if}
{/each}
