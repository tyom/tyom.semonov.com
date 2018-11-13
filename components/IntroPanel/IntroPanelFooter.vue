<template>
  <div class="InfoPanelFooter">
    <div class="download u-print-hidden">
      <a
        href="tyom-semonov-cv.pdf"
        title="Open PDF version"
        @click="onPdfLinkClick">
        <span class="download-label">Download PDF</span>
        <v-icon name="file-pdf" class="icon"/>
      </a>
    </div>
    <SocialLinks
      v-if="social.length"
      :items="social"
    />
    <dl class="contact">
      <div v-for="(contact, type) in contact" :key="contact.label">
        <dt class="visually-hidden" v-text="type"/>
        <dd v-html="$md.renderInline(contact)"/>
      </div>
    </dl>
  </div>
</template>

<script>
import SocialLinks from '~/components/SocialLinks';

export default {
  components: {
    SocialLinks,
  },
  props: {
    social: {
      type: Array,
      default: () => [],
    },
    contact: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onPdfLinkClick() {
      this.$ga && this.$ga.event('pdf', 'download');
    },
  },
};
</script>

<style scoped>
.InfoPanelFooter {
  flex: 0;

  &::before {
    content: '';
    border-top: 0.25em solid;
    opacity: 0.3;
    width: 3em;
    display: block;
    margin-bottom: 2em;
  }
}

.download {
  position: absolute;
  z-index: 2;
  right: 0;
  margin-top: -0.5em;

  & .icon {
    height: 2em;
    width: auto;
    vertical-align: top;
  }

  & a {
    display: flex;
    align-items: center;
    vertical-align: top;
    padding: 0.25em;
    border-radius: 0.3em;
    text-decoration: none;
  }

  & a:hover {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5);
  }

  & a:active {
    box-shadow: 0 0 0 1px;
  }
}

.download-label {
  font-size: 0.9em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  display: none;
}

.contact {
  margin: 1.5em 0 0;

  & dd {
    margin-left: 0;
  }
}

@media screen {
  .InfoPanelFooter {
    position: sticky;
    top: 2em;
  }

  @media (--medium-viewport-below) {
    .download-label {
      display: block;
    }
  }
  @media (--large-viewport-above) {
    .download-label {
      display: block;
    }
  }
}

@media print {
  .InfoPanelFooter {
    page-break-inside: avoid;
  }
}
</style>
