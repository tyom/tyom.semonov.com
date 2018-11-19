<template>
  <section :class="{ 'u-print-hidden': shouldHideFromPrint }" class="ExperienceItem">
    <header>
      <div class="period">
        {{ content.start.month }} {{ content.start.year }} - {{ content.end.month }} {{ content.end.year }}
        <span v-if="durationInMonths" class="duration">
          ({{ durationInMonths }} {{ durationInMonths | pluralize('month') }})
        </span>
        <span v-if="content.location" class="location">({{ content.location }})</span>
      </div>
      <h3 v-if="content.name" class="name">
        {{ content.name }}
        <span v-if="content.isDefunct" class="defunct">(defunct)</span>
      </h3>
      <div class="role">
        {{ content.role }}
        <span v-if="content.isContractor" class="type">Contractor</span>
      </div>
    </header>
    <div
      v-if="content.description"
      class="description"
      v-html="$md.render(content.description)"
    />
    <ListSection
      v-if="content.technologies"
      :items="content.technologies"
      inline
      class="technologies"
      title="Technologies & tools:"
    />
  </section>
</template>

<script>
import ListSection from './ListSection';

export default {
  components: {
    ListSection,
  },
  filters: {
    pluralize(value, word) {
      return `${word}${value === 1 ? '' : 's'}`;
    },
  },
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    shouldHideFromPrint() {
      const itemStartYear = parseInt(this.content.start.year, 10);
      const threeYearsAgo = new Date().getFullYear() - 4;
      return itemStartYear < threeYearsAgo;
    },
    durationInMonths() {
      const startDate = new Date(
        `${this.content.start.year}-${this.content.start.month}`,
      );
      const endDate = new Date(
        `${this.content.end.year}-${this.content.end.month}`,
      );
      return (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
      );
    },
  },
};
</script>

<style scoped>
@import '~/css/_settings.css';

.ExperienceItem {
  page-break-inside: avoid;
  max-width: 70ch;

  @nest .ExperienceItem + & {
    margin-top: 2em;

    &::before {
      content: '';
      border-top: 0.25em solid var(--color-blue-500);
      opacity: 0.5;
      margin-bottom: 2em;
      width: 3em;
      display: block;
    }
  }

  & > * + * {
    margin-top: 1em;
  }
}

.name {
  margin: 0;
  font-size: 1.25em;
}

.name .defunct {
  margin-left: 0.25em;
  font-weight: 300;
  color: #aaa;
  font-size: 1rem;
}

.period,
.role {
  margin: 0;
  font-size: 0.9em;
}

.duration {
  color: #666;
  margin-left: 0.25em;
}

.role {
  color: #666;
}

.type {
  font-size: 0.8em;
  font-weight: 500;
  display: inline-block;
  padding: 0.1em 0.3em 0;
  text-transform: uppercase;
  border-radius: 0.2em;
  background-color: #eee;
  margin-left: 0.2em;
}

.technologies {
  font-size: 0.9em;
}

@media print {
  .type {
    color: #aaa;
    border: 1px solid #ccc;
    background-color: transparent;
  }

  .ExperienceItem + .ExperienceItem::before {
    border-color: #000;
  }

  .u-print-hidden + .technologies {
    margin-top: 10px;
  }
}
</style>
