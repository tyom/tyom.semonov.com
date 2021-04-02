import { parseYaml } from '../src/yaml';
import experience from '../data/experience.yaml';
import Timeline from '$lib/Timeline.svelte';
import '../src/global.css';

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
