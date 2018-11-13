<template>
  <div class="IntroPanelHeader">
    <h1>{{ title }}</h1>
    <h2>{{ subtitle }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
h1 {
  letter-spacing: 1px;
  line-height: 1;
  font-size: 3em;
  margin: 0;
}

h2 {
  font-size: 1.5em;
  opacity: 0.6;
  font-weight: 400;
  margin: 0;

  @nest * + & {
    margin-top: 0.5em;
  }
}

@media print {
  h1 {
    font-size: 2.8rem;
  }

  h2 {
    font-size: 1.4rem;
  }
}
</style>
