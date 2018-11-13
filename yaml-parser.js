const glob = require('glob');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const { promisify } = require('es6-promisify');

const readFile = promisify(fs.readFile);
const globPromise = promisify(glob);

function getYamlFiles(dirPath) {
  return globPromise(`${dirPath}/*.yaml`);
}

async function yamlParser(dirPath) {
  const yamlData = {};

  try {
    const yamlFiles = await getYamlFiles(dirPath);

    for (const file of yamlFiles) {
      const storeId = path.basename(file, '.yaml');
      const yamlFile = await readFile(file);
      yamlData[storeId] = yaml.safeLoad(yamlFile);
    }
  } catch (err) {
    console.error(err);
  }

  return yamlData;
}

module.exports = yamlParser;
