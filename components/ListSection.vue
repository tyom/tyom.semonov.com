<template>
  <div v-if="items" class="ListSection">
    <h3>{{ title }}</h3>
    <LinkedList
      :list="items"
      :definitions="$store.state.content.definitions"
      :inline="inline"
      class="list"
    />
  </div>
</template>

<script>
import LinkedList from '~/components/LinkedList';

export default {
  components: {
    LinkedList,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 0;
  font-size: 1.1em;
}

.ListSection .list {
  margin-top: 0.5em;
}

@media print {
  .ListSection {
    page-break-inside: avoid;
  }
}
</style>
