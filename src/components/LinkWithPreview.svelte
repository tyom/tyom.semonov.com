<script>
  import { tooltip } from '$lib/tooltip';

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
  class="px-1 -mx-1 rounded hover:bg-black/10 dark:hover:bg-white/10"
  ><slot /></a
>
