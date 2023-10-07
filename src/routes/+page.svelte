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
  class="flex flex-col lg:flex-row min-h-screen print:(grid gap-8 grid-cols-[1fr_2fr])"
>
  <aside class="flex flex-col lg:flex-1">
    <Summary {...summary} pdfLink="tyom-semonov-cv.pdf" />
  </aside>

  <article class="lg:flex-[2] bg-white">
    <Section title="Experience" items={experience} showTimeline />
    <Section title="Education" items={education} />
  </article>
</main>

<style>
  @media print {
    article :global(section + section) {
      --at-apply: hidden;
    }
  }
</style>
