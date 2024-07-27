import UnoPreflightStylesDecorator from './UnoPreflightStylesDecorator.svelte';
import '@unocss/reset/tailwind.css';
import '$src/global.css';

export const decorators = [() => UnoPreflightStylesDecorator];
