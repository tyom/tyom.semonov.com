<script>
  import LinkWithPreview from '../LinkWithPreview.svelte';

  export let items = [];

  const separator = (idx, list) => (idx < list.length - 1 ? ', ' : '');
</script>

<style>
  ul {
    padding-left: 1.1em;
    margin: 0;
  }
</style>

<ul class="plain-list">
  {#each items as item}
    <li>
      {#if item.links}
        {#each item.links as link, idx}
          {#if link.url}
            <LinkWithPreview
              href={link.url}
              descriptionUrl={link.wikipedia}
              description={link.description}>{link.name}</LinkWithPreview>{:else}{link.name}{/if}{#if separator(idx, item.links)}{separator(idx, item.links)}{/if}
        {/each}
      {:else}{item.name}{/if}
      {#if item.children}
        <svelte:self items={item.children} />
      {/if}
    </li>
  {/each}
</ul>
