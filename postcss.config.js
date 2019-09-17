const postcssPresetEnv = require('postcss-preset-env');
const rucksackCss = require('rucksack-css');
const postcssImport = require('postcss-import');

module.exports = {
  plugins: [
    postcssImport(),
    postcssPresetEnv({
      stage: 0,
    }),
    rucksackCss(),
  ],
};
