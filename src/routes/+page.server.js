import { allYamlFiles, linkWithDefinitions, readYaml } from '$lib/data';
import { basename } from 'node:path';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const yamlData = await Promise.all(allYamlFiles.map(readYaml));
  const linkedData = await linkWithDefinitions(yamlData);

  const entries = allYamlFiles.map((path, i) => [
    basename(path, '.yaml'),
    linkedData[i],
  ]);

  return Object.fromEntries(entries);
}
