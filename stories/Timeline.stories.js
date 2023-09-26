import experience from '$data/experience.yaml?raw';
import { parseYaml } from '$lib/yaml';
import Timeline from '$components/Timeline.svelte';

const experienceData = parseYaml(experience);

export default {
  title: 'Timeline',
};

export const Default = () => ({
  Component: Timeline,
  props: {
    events: experienceData,
  },
});
