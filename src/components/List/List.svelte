<script>
  import InlineList from './InlineList.svelte';
  import BlockList from './BlockList.svelte';

  export let items = [];
  export let inline = false;
  const formattedList = items.filter(x => x.name);
</script>

{#if inline}
  <div class="plain-list-inline">
    <InlineList {items} />
  </div>
{:else}
  <BlockList {items} />
{/if}
