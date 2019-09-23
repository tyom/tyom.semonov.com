<script>
  import { tooltip } from '../actions';

  export let href;
  export let description;
  export let descriptionUrl;
</script>

<style>
  :global(.popper) {
    border-radius: 0.3em;
    background-color: #000d;
    box-shadow: 1px 1px 1px #000d;
    color: #fff;
    max-width: 300px;
    padding: 0.5em;
    font-size: 0.7em;
    transition: opacity 0.2s;

    & .popper__arrow {
      border-color: #000d;
      border-style: solid;
      position: absolute;
      width: 0;
      height: 0;
    }

    &[x-placement^='top'] {
      margin-bottom: 5px;
    }

    &[x-placement^='top'] .popper__arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: transparent;
      bottom: -5px;
      left: calc(50% - 5px);
    }

    &[x-placement^='bottom'] {
      margin-top: 5px;
    }
    &[x-placement^='bottom'] .popper__arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent;
      border-right-color: transparent;
      border-top-color: transparent;
      top: -5px;
      left: calc(50% - 5px);
    }

    &[x-placement^='right'] {
      margin-left: 5px;
    }

    &[x-placement^='right'] .popper__arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent;
      border-top-color: transparent;
      border-bottom-color: transparent;
      left: -5px;
      top: calc(50% - 5px);
    }

    &[x-placement^='left'] {
      margin-right: 5px;
    }

    &[x-placement^='left'] .popper__arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent;
      border-right-color: transparent;
      border-bottom-color: transparent;
      right: -5px;
      top: calc(50% - 5px);
    }
  }
</style>

<a {href} use:tooltip={{ text: description, url: descriptionUrl, resultProp: 'extract' }}><slot /></a>
