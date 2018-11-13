<template>
  <div class="container">
    <IntroPanel
      :content="content.about"
      class="aside"
    />
    <main class="main">
      <article class="section experience">
        <h2>Experience</h2>
        <ExperienceItem
          v-for="item in content.experience"
          :content="item"
          :key="item.company + item.start.year"
        />
        <p class="u-print-only print-details-info">
          <v-icon class="info-icon" name="info-circle"/>
          Only the last 4 years are shown here.<br>
          To see more go to tyom.semonov.com.
        </p>
      </article>
      <article class="section education">
        <h2>Education</h2>
        <experience-item
          v-for="item in content.education"
          :content="item"
          :key="item.name + item.start.year"
        />
      </article>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import IntroPanel from '~/components/IntroPanel';
import ExperienceItem from '~/components/ExperienceItem';

export default {
  components: {
    IntroPanel,
    ExperienceItem,
  },
  head() {
    const fullUrl = `https://${this.content.about.contact.web.urk}`;
    const description = this.content.about.synopsis
      .split(/\n\n/)[0]
      .replace(/\n+/, '');

    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: `og:title`,
          property: 'og:title',
          content: `${this.content.about.name} (${this.content.about.title})`,
        },
        {
          hid: `og:url`,
          property: 'og:url',
          content: fullUrl,
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content: `${fullUrl}/logo.png`,
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: this.content.about.description,
        },
      ],
    };
  },
  computed: {
    ...mapState(['content']),
  },
};
</script>

<style scoped>
@import '~/css/_settings.css';

h2 {
  font-size: 1.2em;
  margin: 0 0 1.5em;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  page-break-inside: avoid;
  page-break-after: avoid;
}

.section + .section {
  margin-top: 3em;
}

@media screen {
  .main,
  .aside {
    padding: 2em;
  }

  .experience {
    margin-top: -1.5em;
  }

  h2 {
    position: sticky;
    z-index: 1;
    top: 0;
    line-height: 1;
    margin: 0 0 2rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid #0001;
    background-color: #fffe;
  }

  @media (--medium-viewport-above) {
    .container {
      display: flex;
      min-height: 100vh;
    }

    .aside {
      flex: 1;
    }

    .main {
      flex: 2;
    }
  }

  @media (--large-viewport-above) {
    .main {
      flex: 1.62;
    }
  }
}

@media print {
  .container {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: 1fr 2fr;
  }

  .print-details-info {
    position: relative;
    font-size: 0.9em;
    top: 2rem;
    display: flex;
    align-items: center;
  }

  .info-icon {
    height: 2em;
    width: 2em;
    color: #777;
    margin-right: 1em;
  }

  .education {
    display: none;
  }
}
</style>
