import about from '$data/about.yaml?raw';
import definitions from '$data/definitions.yaml?raw';
import { buildList, createDefinitionFinder } from '$lib/utils';
import { parseYaml } from '$lib/yaml';
import Summary from '$components/Summary.svelte';

const summaryData = parseYaml(about);
const definitionsData = parseYaml(definitions);
const defLinker = createDefinitionFinder(definitionsData);

export default {
  title: 'Summary',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => ({
  Component: Summary,
  props: {
    ...summaryData,
    coreSkills: buildList(summaryData.coreSkills, defLinker),
    currentInterests: buildList(summaryData.currentInterests, defLinker),
  },
});
