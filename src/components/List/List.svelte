<script>
  import InlineList from './InlineList.svelte';
  import BlockList from './BlockList.svelte';

  export let items = [];
  export let inline = false;

  const formattedList = items
    .map(x => ({ name: x.name || x, links: x.links, children: x.children }))
    .filter(x => x.name);
</script>

{#if inline}
  <div class="plain-list-inline">
    <InlineList items={formattedList} />
  </div>
{:else}
  <BlockList items={formattedList} />
{/if}
