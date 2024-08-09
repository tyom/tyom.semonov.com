<script>
  import GitHub from 'virtual:icons/fa6-brands/github';
  import LinkedIn from 'virtual:icons/fa6-brands/linkedin';
  import PDF from 'virtual:icons/fa6-regular/file-pdf';
  import InfoSymbol from 'virtual:icons/material-symbols/info-outline-rounded';
  import Email from 'virtual:icons/majesticons/mail-line';
  import Globe from 'virtual:icons/la/globe';

  const icons = {
    github: GitHub,
    linkedin: LinkedIn,
    web: Globe,
    email: Email,
    pdf: PDF,
    info: InfoSymbol,
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
