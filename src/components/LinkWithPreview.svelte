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
  class="-mx-1 rounded px-1 hover:bg-black/10 dark:hover:bg-white/10"
  ><slot /></a
>
