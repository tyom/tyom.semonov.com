<template>
  <div class="container">
    <intro v-bind="about"/>

    <main>
      <h2>Experience</h2>
      <p class="u-print-only print-details-info">Details for the last 3 years. For more see tyom.semonov.com</p>
      <experience-item
        type="work"
        v-for="item in experience"
        v-bind="item"
        :key="item.company + item.start.year"
      />

      <h2>Education</h2>
      <experience-item
        type="study"
        v-for="item in education"
        v-bind="item"
        :key="item.name + item.start.year"
      />
    </main>
  </div>
</template>

<script>
  import about from '../data/about.yaml'
  import experience from '../data/experience.yaml'
  import education from '../data/education.yaml'
  import Intro from '../components/Intro'
  import ExperienceItem from '../components/ExperienceItem'

  export default {
    asyncData () {
      return {
        about,
        experience,
        education,
      }
    },
    components: {
      Intro,
      ExperienceItem,
    },
  }
</script>

<style scoped>
  h2 {
    color: #aaa;
    margin: 0 0 30px;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 1px;
    page-break-inside: avoid;
    page-break-after: avoid;
  }

  h2:not(:first-child) {
     margin-top: 50px;
  }

  @media screen {
    @media (min-width: 60em) {
      .intro {
        width: 30%;
      }

      .container {
        display: flex;
      }

      .intro {
        min-width: 300px;
      }
    }

    main {
      flex: 1;
      padding: 30px;
    }

    h2 {
      position: sticky;
      z-index: 1;
      top: 0;
      line-height: 1;
      margin: 50px -30px 30px;
      padding: 30px;
      border-bottom: 1px solid rgba(0, 0, 0, .05);
      background-color: rgba(255, 255, 255, .95);
    }

    h2:first-child {
      margin-top: -30px;
    }
  }

  @media print {
    .intro {
      min-width: 0;
      float: left;
      width: 30%;
      margin-right: 30px;
    }

    .print-details-info {
      position: relative;
      font-size: .8em;
      top: -30px;
      font-weight: bold;
      color: #999;
    }

    main {
      overflow: hidden;
    }

    h2 {
      color: #ddd;
    }
  }
</style>
