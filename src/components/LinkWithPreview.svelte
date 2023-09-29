<script>
  import { tooltip } from '../actions';

  export let href;
  export let description;
  export let descriptionUrl;
</script>

<a
  {href}
  use:tooltip={{
    text: description,
    url: descriptionUrl,
    resultProp: 'extract',
  }}
  class="px-1 -mx-1 rounded hover:bg-zinc-900/10"><slot /></a
>
