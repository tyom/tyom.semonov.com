<template>
  <article class="experience">
    <header>
      <div class="period">
        {{ start.month }} {{ start.year }} - {{ end.month }} {{ end.year }}
        <span class="location" v-if="location">({{ location }})</span>
      </div>
      <h3 class="name" v-if="name">
        {{ name }}
        <span class="defunct" v-if="isDefunct">(defunct)</span>
      </h3>
      <div class="role">
        {{ role }}
        <span class="type" v-if="isContractor">Contractor</span>
      </div>
    </header>
    <markdown
      class="description"
      :class="{ 'u-print-hidden': shouldHideFromPrint }"
      :source="description"
      :breaks="false"
    />
    <list
      is-inline
      class="technologies"
      title="Technologies"
      :items="technologies"
    />
  </article>
</template>

<script>
  import List from './List'

  export default {
    props: {
      type: String,
      name: String,
      role: String,
      location: String,
      isContractor: Boolean,
      isDefunct: Boolean,
      start: Object,
      end: Object,
      description: String,
      technologies: Array,
    },
    components: {
      List,
    },
    computed: {
      shouldHideFromPrint () {
        const currentYear = parseInt(this.start.year, 10)
        const threeYearsAgo = new Date().getFullYear() - 3
        return this.type === 'work' && currentYear < threeYearsAgo
      }
    }
  }
</script>

<style scoped>
  .experience {
    page-break-inside: avoid;
    max-width: 45em;
  }

  .experience + .experience {
    margin-top: 60px;
  }

  .experience + .experience::before {
    content: "";
    border-top: 4px solid #1643a9;
    opacity: .3;
    margin-top: -28px;
    margin-bottom: 28px;
    width: 30px;
    display: block;
  }

  .experience > * + * {
    margin-top: 20px;
  }

  .description >>> p {
    margin: 0;
  }
  .description >>>  p + p {
    margin-top: 10px;
  }

  .name {
    margin: 0;
    font-size: 1.25em;
    line-height: 1.2;
  }

  .name .defunct {
    margin-left: .5em;
    font-weight: 300;
    color: #aaa;
    font-size: 1rem;
  }

  .period,
  .role {
    margin: 0;
    font-size: .9em;
  }

  .period {
    line-height: 1;
    margin-bottom: 5px;
  }

  .role {
    margin-top: 5px;
    line-height: 1.2;
    color: #666;
  }

  .type {
    font-size: .8em;
    line-height: 1.1;
    font-weight: 500;
    display: inline-block;
    padding: .15em .3em;
    text-transform: uppercase;
    border: 1px solid #aaa;
    border-radius: .2em;
    margin-left: .2em;
  }

  .technologies {
    font-size: .9em;
  }

  @media print {
    .type {
      color: #aaa;
      border: 1px solid #ccc;
      background-color: transparent;
    }

    .experience + .experience::before {
      border-color: #000;
    }

    .u-print-hidden + .technologies {
      margin-top: 10px;
    }
  }
</style>
