<template>
  <a v-tooltip="tooltipOptions" :href="href"><slot/></a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: null,
    },
    wikipedia: {
      type: String,
      default: '',
    },
  },
  computed: {
    tooltipOptions() {
      if (!this.wikipedia) {
        return;
      }
      return {
        content: () => this.getSummary(this.wikipedia),
        delay: 500,
        placement: 'auto',
        offset: 10,
      };
    },
  },
  methods: {
    async getSummary(wikipediaTitle) {
      if (!wikipediaTitle) {
        return;
      }
      const { data: summary } = await this.$axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${wikipediaTitle}`,
      );
      return summary.extract;
    },
  },
};
</script>

<style>
:root {
  --arrow-size: 1em;
}

.tooltip {
  font-size: 0.7em;
  max-width: 25rem;
  z-index: 1;
}

.tooltip-inner {
  background: #fff;
  border-radius: 0.5em;
  border: 1px solid #bbb;
  box-shadow: 0 1px 4px #0002;
  padding: 1em;
}

.tooltip-arrow {
  position: absolute;
  margin: calc(var(--arrow-size) / -2);
  z-index: 2;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    border: 1px solid #bbb;
    background-color: #fff;
    transform: rotate(45deg);
    height: var(--arrow-size);
    width: var(--arrow-size);
  }
}

[x-placement^='top'],
[x-placement^='bottom'] {
  & .tooltip-arrow {
    width: var(--arrow-size);
    height: calc(var(--arrow-size) / 2);
  }
}

[x-placement^='right'],
[x-placement^='left'] {
  & .tooltip-arrow {
    width: calc(var(--arrow-size) / 2);
    height: var(--arrow-size);
  }
}

[x-placement^='top'] .tooltip-arrow {
  top: calc(100% + var(--arrow-size) / 2 - 1px);

  &::before {
    bottom: 0;
    margin-bottom: 0.2em;
  }
}

[x-placement^='bottom'] .tooltip-arrow {
  bottom: calc(100% + var(--arrow-size) / 2 - 1px);

  &::before {
    top: 0;
    margin-top: 0.2em;
  }
}

[x-placement^='right'] .tooltip-arrow {
  right: calc(100% + var(--arrow-size) / 2 - 1px);

  &::before {
    left: 0;
    margin-left: 0.2em;
  }
}

[x-placement^='left'] .tooltip-arrow {
  left: calc(100% + var(--arrow-size) / 2 - 1px);

  &::before {
    right: 0;
    margin-right: 0.2em;
  }
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s;
}

.tooltip.tooltip-loading {
  opacity: 0;
  visibility: hidden;
}
</style>
