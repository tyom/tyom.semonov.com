<style>
  a:hover {
    background: #0003;
    margin: 0 -0.2rem;
    padding: 0 0.2rem;
    border-radius: 0.2rem;
  }
</style>

<script>
  import { tooltip } from '../actions';

  export let href;
  export let description;
  export let descriptionUrl;
</script>

<a {href} use:tooltip={{ text: description, url: descriptionUrl, resultProp: 'extract' }}>
  <slot />
</a>
