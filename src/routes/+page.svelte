<script>
  import Section from '$components/Section.svelte';
  import Summary from '$components/Summary.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const { about, experience, education } = data;
  const { description, ...summary } = about;
</script>

<svelte:head>
  <title>{about.name} - {about.title}: CV</title>
  <meta name="description" content={description} />
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tyom.semonov.com/" />
  <meta property="og:title" content="{about.name} - {about.title}: CV" />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://tyom.semonov.com/logo.png" />
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://tyom.semonov.com/" />
  <meta property="twitter:title" content="{about.name} - {about.title}: CV" />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content="https://tyom.semonov.com/logo.png" />
</svelte:head>

<main
  class="relative flex min-h-screen flex-col lg:flex-row
    print:grid print:grid-cols-[1fr_2fr] print:gap-8"
>
  <aside class="flex flex-col lg:flex-1">
    <Summary {...summary} pdfLink="tyom-semonov-cv.pdf" />
  </aside>

  <article class="lg:flex-[2]">
    <Section title="Experience" items={experience} showTimeline />
    <Section title="Education" items={education} />
  </article>
</main>

<style>
  main::before {
    position: absolute;
    pointer-events: none;
    z-index: 0;
    inset: 0;
    opacity: 0.1;
    background: repeating-linear-gradient(
      30deg,
      #0003 0px,
      #0003 2px,
      #0000 0px,
      #0000 12px
    );
  }

  @media (prefers-color-scheme: dark) {
    main::before {
      background: repeating-linear-gradient(
        30deg,
        #fff2 0px,
        #fff2 2px,
        #fff0 2px,
        #fff0 12px
      );
    }
  }

  @supports (mask: radial-gradient(ellipse, #000, #fff)) {
    main::before {
      content: '';
      mask: radial-gradient(
        150vw 1000vh ellipse at top left,
        #0000,
        #0003,
        #000
      );
    }
  }

  @media print {
    article :global(section + section) {
      display: none;
    }
  }
</style>
