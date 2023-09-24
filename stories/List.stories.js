import { buildList, createDefinitionFinder } from '$src/utils';
import { parseYaml } from '$src/yaml';
import definitions from '$data/definitions.yaml?raw';
import about from '$data/about.yaml?raw';
import List from '$lib/List/List.svelte';

const defLinker = createDefinitionFinder(parseYaml(definitions));
const { coreSkills } = parseYaml(about);
const listItems = buildList(coreSkills, defLinker);

export default {
  title: 'List',
};

export const Block = () => ({
  Component: List,
  props: {
    items: listItems,
  },
});

export const Inline = () => ({
  Component: List,
  props: {
    items: listItems,
    inline: true,
  },
});
