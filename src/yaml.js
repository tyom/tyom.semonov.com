import yaml from 'js-yaml';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  linkify: true,
});

const MarkdownYamlType = new yaml.Type('!md', {
  kind: 'scalar',
  construct: (string) => md.render(string),
});
const InlineMarkdownYamlType = new yaml.Type('!imd', {
  kind: 'scalar',
  construct: (string) => md.renderInline(string),
});

const YAML_SCHEMA = yaml.Schema.create([
  MarkdownYamlType,
  InlineMarkdownYamlType,
]);

export function parseYaml(yamlData) {
  try {
    return yaml.safeLoad(yamlData, { schema: YAML_SCHEMA });
  } catch (error) {
    console.error('Failed to parse YAML data');
    throw new Error(error);
  }
}
