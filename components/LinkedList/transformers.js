function createDefinitionLookup(definitions = []) {
  return function getDefinition(name) {
    const found = definitions.find(d =>
      name.match(new RegExp(`\\b${d.name}\\b`)),
    );

    if (!found) {
      return {
        name,
      };
    }
    return found;
  };
}

export function linkNameToDefinition(name, definitions) {
  const getDefinition = createDefinitionLookup(definitions);

  if (typeof name === 'string') {
    return name.split('/').map(getDefinition);
  }
  const containerName = name.name || Object.keys(name)[0];
  const containerDefinition = getDefinition(containerName);

  const result = {
    ...containerDefinition,
  };

  const children = name[containerName];
  if (Array.isArray(children)) {
    result.children = children.map(child =>
      linkNameToDefinition(child, definitions),
    );
  }

  return [result];
}
