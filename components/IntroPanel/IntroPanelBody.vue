<template>
  <div class="IntroPanelBody">
    <div class="synopsis" v-html="synopsis"/>
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
  grid-area: a;
}

.skill-list {
  grid-area: b;
}

.focus-list {
  grid-area: c;
}

@media (--extra-large-viewport-above) {
  .IntroPanelBody {
    display: grid;
    grid-gap: 1em;
    grid-template-areas: 'a a' 'b c';

    & > * + * {
      margin-top: 1em;
    }
  }
}
</style>
