<template>
  <nav class="SocialLinks">
    <a
      v-for="item in items"
      :href="item.url"
      :key="item.label"
    >
      <v-icon :name="`brands/${item.icon}`" class="icon"/>
      <span class="u-print-only">{{ truncateUrl(item.url) }}</span>
    </a>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {},
    },
  },
  methods: {
    truncateUrl(url = '') {
      return url.replace(/https:\/\//, '');
    },
  },
};
</script>

<style scoped>
.SocialLinks {
  & a {
    margin-right: 1rem;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.15);
    }
  }
}

.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: top;
}

@media screen {
  .SocialLinks {
    display: flex;
  }
}

@media print {
  .SocialLinks a {
    display: block;
    margin: 0.5em 0;
  }

  .SocialLinks >>> svg {
    height: 1em;
    width: 1em;
    vertical-align: middle;
    margin-right: 0.5em;
  }
}
</style>
