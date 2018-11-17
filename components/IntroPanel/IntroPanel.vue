<template>
  <div class="IntroPanel">
    <InfoPanelHeader
      :title="content.name"
      :subtitle="content.title"
      class="section"
    />
    <InfoPanelBody
      :synopsis="$md.render(content.synopsis)"
      :core-skills="content.coreSkills"
      :current-focus="content.currentFocus"
      class="section"
    />
    <InfoPanelFooter
      :social="content.social"
      :contact="content.contact"
      class="section"
    />
  </div>
</template>

<script>
import SocialLinks from '~/components/SocialLinks';
import ListSection from '~/components/ListSection';
import InfoPanelHeader from './IntroPanelHeader';
import InfoPanelBody from './IntroPanelBody';
import InfoPanelFooter from './IntroPanelFooter';

export default {
  components: {
    SocialLinks,
    ListSection,
    InfoPanelHeader,
    InfoPanelBody,
    InfoPanelFooter,
  },
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
@import '~/css/_settings.css';

.IntroPanel {
  position: relative;
}

.section + .section {
  margin-top: 1.5em;
}

@media screen {
  >>> h1,
  >>> a[href]:hover {
    color: #fff;
  }

  .IntroPanel {
    color: #fffd;
    background: linear-gradient(
      120deg,
      var(--color-blue-500),
      var(--color-blue-900)
    );

    &::before {
      content: '';
      left: 0;
      top: -20vh;
      height: 20vh;
      width: 100%;
      background: red;
    }
  }
}
</style>
