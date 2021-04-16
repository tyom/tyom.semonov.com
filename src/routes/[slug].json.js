import { parseYaml } from '../yaml';
import { readFileSync } from 'fs';

export async function get({ params }) {
  const { slug } = params;

  const yamlData = readFileSync(`data/${slug}.yaml`);
  const content = await parseYaml(yamlData);

  return {
    body: content,
  };
}
