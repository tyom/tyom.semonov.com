import { readFileSync } from 'fs';
import { globSync } from 'glob';
import { isPlainObject } from 'is-plain-object';
import { basename } from 'path';
import { parseYaml } from '$lib/yaml';
import { createDefinitionFinder } from '$lib/utils';

const DEFINITIONS_YAML_FILE = 'data/definitions.yaml';

const allYamlFiles = globSync('data/*.yaml', {
  ignore: DEFINITIONS_YAML_FILE,
});

function linkTerms(terms, defLinker) {
  if (!Array.isArray(terms)) return terms;

  return terms.map((term) => {
    if (isPlainObject(term)) {
      const [name, children] = Object.entries(term)[0];
      // Skip children in incorrect format. Assume array of strings for terms.
      if (!Array.isArray(children)) {
        return term;
      }
      return {
        name,
        links: defLinker(term),
        children: linkTerms(children, defLinker),
      };
    }
    return { name: term, links: defLinker(term) };
  });
}

function linkSection(section, linkerFn) {
  return Object.fromEntries(
    Object.entries(section).map(([key, value]) => [
      key,
      linkTerms(value, linkerFn),
    ]),
  );
}

export async function linkWithDefinitions(yamlData) {
  const definitionsData = await readYaml(DEFINITIONS_YAML_FILE);
  const linkerFn = createDefinitionFinder(definitionsData);

  return yamlData.map((dataSet) => {
    if (Array.isArray(dataSet)) {
      return dataSet.map((section) => linkSection(section, linkerFn));
    }
    return linkSection(dataSet, linkerFn);
  });
}

const readYaml = (path) => parseYaml(readFileSync(path));

export async function getData(filePaths = allYamlFiles) {
  const yamlData = await Promise.all(filePaths.map(readYaml));
  const linkedData = await linkWithDefinitions(yamlData);

  const entries = filePaths.map((path, i) => [
    basename(path, '.yaml'),
    linkedData[i],
  ]);

  return Object.fromEntries(entries);
}
