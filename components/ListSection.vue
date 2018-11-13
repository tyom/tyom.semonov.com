<template>
  <div v-if="items" class="ListSection">
    <h3>{{ title }}</h3>
    <ul :class="{ inline: inline }">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        v-html="linkTechnology(item)"
      />
    </ul>
  </div>
</template>

<script>
export default {
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
    shouldLink: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    linkTechnology(tech) {
      if (!tech) {
        return;
      }

      let found;
      let result = tech;

      if (typeof tech === 'string') {
        const techData = this.$store.state.content.tech;
        found = techData.find(item => tech.match(item.name));
      } else {
        Object.keys(tech).forEach(techItem => {
          const linkedItem = this.linkTechnology(techItem);
          const linkedSubItems = tech[techItem].map(this.linkTechnology);

          result = `${linkedItem} (${linkedSubItems.join(', ')})`;
        });
      }

      if (!found || !this.shouldLink) {
        return result;
      }

      const regex = new RegExp(`(${found.name})(.*)`);
      return tech.replace(regex, `<a href="${found.url}">$1</a>$2`);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 0;
  font-size: 1.1em;
}

ul {
  margin: 0.5em 0 0;
  padding: 0 0 0 1.1em;
}

.inline {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;

  & li:not(:last-child)::after {
    content: ', ';
    display: inline-block;
    margin-right: 0.4em;
  }
}

@media print {
  .ListSection {
    page-break-inside: avoid;
  }
}
</style>
