<script>
  import { tooltip } from '../actions';

  export let href;
  export let description;
  export let descriptionUrl;
</script>

<a {href} use:tooltip={{ text: description, url: descriptionUrl, resultProp: 'extract' }}><slot /></a>
