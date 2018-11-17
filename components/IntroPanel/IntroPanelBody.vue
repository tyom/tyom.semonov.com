<template>
  <div class="IntroPanelBody">
    <div class="synopsis" v-html="synopsis"/>
    <div class="lists">
      <ListSection
        v-if="coreSkills.length"
        :items="coreSkills"
        title="Core skills"
        class="skill-list"
      />
      <ListSection
        v-if="currentFocus.length"
        :items="currentFocus"
        title="Current focus"
        class="focus-list"
      />
    </div>
  </div>
</template>

<script>
import ListSection from '~/components/ListSection';

export default {
  components: {
    ListSection,
  },
  props: {
    synopsis: {
      type: String,
      default: '',
    },
    coreSkills: {
      type: Array,
      default: () => [],
    },
    currentFocus: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
@import '~/css/_settings.css';

.IntroPanelBody {
  & > * + * {
    margin-top: 1.5em;
  }
}

.synopsis {
  max-width: 70ch;
}

.lists {
  display: grid;
  grid-gap: 1.5em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
