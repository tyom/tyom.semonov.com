<template>
  <div class="list" v-if="items">
    <h4>{{ title }}</h4>
    <ul :class="{ inline: isInline }">
      <li v-for="item in items" v-html="linkTechnology(item)"/>
    </ul>
  </div>
</template>

<script>
  import techData from '../data/tech.yaml'

  export default {
    props: {
      items: Array,
      title: String,
      isInline: Boolean,
      shouldLink: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      linkTechnology (tech) {
        if (!tech) { return }

        let found
        let result = tech

        if (typeof tech === 'string') {
          found = techData.find(item => tech.match(item.name))
        } else {
          Object.keys(tech).forEach(techItem => {
            const linkedItem = this.linkTechnology(techItem)
            const linkedSubItems = tech[techItem].map(this.linkTechnology)

            result = `${linkedItem} (${linkedSubItems.join(', ')})`
          })
        }

        if (!found || !this.shouldLink) {
          return result
        }

        const regex = new RegExp(`(${found.name})(.*)`)
        return tech.replace(regex, `<a href="${found.url}">$1</a>$2`)
      }
    }
  }
</script>

<style scoped>
  .list {
    margin-right: 20px;
  }

  .list h4 {
    margin: 0 -20px 0 0;
    font-size: inherit;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  ul {
    margin: 5px 0 0;
    padding: 0 0 0 1.1em;
  }

  .inline {
    list-style: none;
    padding-left: 0;
  }

  .inline li {
    display: inline;
  }

  .inline li + li::before {
    content: ", ";
  }
</style>
