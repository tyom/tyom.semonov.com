import { buildList, createDefinitionFinder } from '../src/utils';
import { parseYaml } from '../src/yaml';
import definitions from '../data/definitions.yaml';
import about from '../data/about.yaml';
import List from '$lib/List/List.svelte';
import '../src/global.css';

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
