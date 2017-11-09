<template>
  <header class="intro">
    <div class="head">
      <h1>{{ name }}</h1>
      <h2>{{ title }}</h2>
    </div>
    <div class="body">
      <markdown class="summary" :source="summary" :breaks="false"/>
      <list class="skills" title="Core skills" :items="coreSkills"/>
      <list class="skills" title="Current focus" :items="currentFocus"/>
    </div>
    <div class="foot">
      <nav class="util u-print-hidden">
        <a href="cv.pdf" title="Open PDF version" @click="onPdfLinkClick">
          <span class="visually-hidden">Download PDF</span>
          <pdf-icon class="icon" :height="42" :width="42"/>
        </a>
      </nav>
      <online v-bind="online"/>
      <dl>
        <dt class="visually-hidden">Web</dt>
        <dd>
          <markdown :source="contact.web"/>
        </dd>
        <dt class="visually-hidden">Email</dt>
        <dd>
          <markdown :source="contact.email"/>
        </dd>
      </dl>
    </div>
  </header>
</template>

<script>
  import pdfIcon from '~/assets/svg/icon-pdf.svg'
  import Online from './Online'
  import List from './List'

  export default {
    components: {
      pdfIcon,
      Online,
      List,
    },
    props: {
      name: String,
      title: String,
      online: Object,
      summary: String,
      contact: Object,
      coreSkills: Array,
      currentFocus: Array,
    },
    methods: {
      onPdfLinkClick () {
        this.$ga && this.$ga.event('pdf', 'download')
      },
    },
  }
</script>

<style scoped>
  .intro {
    position: relative;
  }

  .util {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 13px;
  }

  .intro .util a,
  .intro .util a:hover {
    display: inline-block;
    padding: 5px;
    border-radius: 6px;
  }

  .intro .util a:hover {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, .5);
  }

  .intro .util a:active {
    box-shadow: 0 0 0 1px;
  }

  .body {
    display: flex;
    flex-wrap: wrap;
  }

  .body > * + * {
    margin-top: 20px;
  }

  .skills {
    flex: 1;
  }

  .foot {
    flex: 0;
    position: sticky;
    top: calc(100vh - 9rem);
  }

  .foot::before {
    content: "";
    border-top: 4px solid;
    opacity: .3;
    margin: 28px 0;
    width: 30px;
    display: block;
  }

  h1 {
    letter-spacing: 1px;
    line-height: 1;
    font-size: 3rem;
    margin: 0;
  }

  h2 {
    font-size: 25px;
    opacity: .5;
    font-weight: 400;
    margin: 10px 0;
  }

  h3 {
    margin: 0 0 5px;
    font-size: 1em;
  }

  .intro >>> p {
    margin: 0;
  }

  .intro >>> p + p {
    margin-top: 10px;
  }

  dl {
    margin: 0;
  }

  dd {
    margin-left: 0;
  }

  @media screen {
    .intro {
      color: #fff;
      padding: 20px 30px;
      background: linear-gradient(120deg, #2b417a, #0e1019);
    }

    .intro >>> svg {
      fill: currentColor;
      display: inline-block;
      vertical-align: top;
    }

    .intro >>> p,
    .intro >>> ul,
    .intro >>> a,
    .intro >>> dl {
      color: rgba(255, 255, 255, .85);
    }

    .intro >>> a:hover {
      color: #fff;
    }

    .foot::before {
      color: #fff;
    }

    @media (min-width: 80em) {
      .foot {
        top: calc(100vh - 10rem);
      }
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
