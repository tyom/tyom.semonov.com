import { readFileSync } from 'fs';
import { parseYaml } from '$src/yaml';

const getData = (resourceName) => {
  const yamlData = readFileSync(`data/${resourceName}.yaml`);
  return parseYaml(yamlData);
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    about: await getData(`about`),
    experienceItems: await getData(`experience`),
    educationItems: await getData(`education`),
    definitions: await getData(`definitions`),
  };
}
