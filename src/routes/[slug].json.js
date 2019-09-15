import { parseYaml } from '../yaml';
import { readFileSync } from 'fs';

export async function get(req, res, next) {
  const { slug } = req.params;
  let content;

  try {
    const yamlData = readFileSync(`data/${slug}.yaml`);
    content = await parseYaml(yamlData);
    if (content !== null) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(content));
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    next();
  }
}
