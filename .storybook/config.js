import { addParameters, configure } from '@storybook/svelte';
import { themes } from '@storybook/theming';
import '../src/css/global.css';

addParameters({
  options: {
    theme: themes.light,
    showPanel: false,
  },
});

configure(require.context('../stories', true, /\.stories\.js$/), module);
