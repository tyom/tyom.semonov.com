<script>
  import {
    Github,
    Linkedin,
    Globe,
    Mail,
    Info,
    FileDown,
  } from '@lucide/svelte';

  const icons = {
    github: Github,
    linkedin: Linkedin,
    web: Globe,
    email: Mail,
    pdf: FileDown,
    info: Info,
  };

  export let name;
  export let label = null;

  const IconComponent = icons[name];
</script>

<svelte:component
  this={IconComponent}
  aria-label={label}
  class={$$props.class}
/>
