import { buildList, createDefinitionFinder } from '../src/utils';
import { parseYaml } from '../src/yaml';
import about from '../data/about.yaml';
import definitions from '../data/definitions.yaml';
import Summary from '../src/components/Summary.svelte';

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
