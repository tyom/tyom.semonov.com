<template>
  <LinkedListInline v-if="inline" :linked-list="linkedList"/>
  <ul v-else class="LinkedList">
    <li v-for="(items, idx) in linkedList" :key="idx">
      <template v-for="(link, subIdx) in items">
        <v-preview-link
          :href="link.url"
          :wikipedia="link.wikipedia"
          :key="subIdx"
        >{{ link.name }}</v-preview-link><template v-if="subIdx < items.length - 1">, </template>
      </template>
    </li>
  </ul>
</template>

<script>
import { linkNameToDefinition } from './transformers';
import LinkedListInline from './LinkedListInline';

export default {
  name: 'LinkedList',
  components: {
    LinkedListInline,
  },
  props: {
    inline: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
    definitions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    linkedList() {
      return this.list.map(item =>
        linkNameToDefinition(item, this.definitions),
      );
    },
  },
};
</script>

<style scoped>
.LinkedList {
  margin: 0;
  padding: 0 0 0 1.1em;
}
</style>
