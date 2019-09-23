import { parseYaml } from '../src/yaml';
import experience from '../data/experience.yaml';
import Timeline from '../src/components/Timeline.svelte';
import '../src/css/global.css';

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
