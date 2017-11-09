<template>
  <nav class="online">
    <a :href="github" v-if="github">
      <github-icon :width="20" :height="20"/>
      <span class="u-print-only">{{ truncateUrl(github) }}</span>
    </a>
    <a :href="twitter" v-if="twitter">
      <twitter-icon :width="20" :height="20"/>
      <span class="u-print-only">{{ truncateUrl(twitter) }}</span>
    </a>
    <a :href="linkedin" v-if="linkedin">
      <linkedin-icon :width="20" :height="20"/>
      <span class="u-print-only">{{ truncateUrl(linkedin) }}</span>
    </a>
  </nav>
</template>

<script>
  import linkedinIcon from 'simple-icons/icons/linkedin.svg'
  import twitterIcon from 'simple-icons/icons/twitter.svg'
  import githubIcon from 'simple-icons/icons/github.svg'

  export default {
    props: {
      github: String,
      twitter: String,
      linkedin: String,
    },
    methods: {
      truncateUrl (url = '') {
        return url.replace(/https:\/\//, '')
      }
    },
    components: {
      githubIcon,
      linkedinIcon,
      twitterIcon,
    },
  }
</script>

<style scoped>
  .online {
    margin: 20px 0;
  }

  .online svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 10px;
  }

  @media print {
    .online a {
      display: block;
      margin: 5px 0;
    }

    .online >>> svg {
      height: 16px;
      width: 16px;
    }

    .online >>> svg,
    .online a::after {
      vertical-align: middle;
    }
  }
</style>
