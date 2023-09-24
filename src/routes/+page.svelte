<script>
  import InfoIcon from 'svelte-icons/fa/FaInfoCircle.svelte';
  import { buildList, createDefinitionFinder } from '$src/utils';
  import Section from '$lib/Section.svelte';
  import Summary from '$lib/Summary.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const { about, experienceItems, educationItems, definitions } = data;

  const defLinker = createDefinitionFinder(definitions);
  const coreSkills = buildList(about.coreSkills, defLinker);
  const currentInterests = buildList(about.currentInterests, defLinker);
  const { description, ...summary } = {
    ...about,
    coreSkills,
    currentInterests,
  };
  const linkedExperienceItems = experienceItems.map((item) => ({
    ...item,
    technologies: buildList(item.technologies, defLinker),
  }));
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

<main>
  <aside>
    <Summary {...summary} pdfLink="tyom-semonov-cv.pdf" />
  </aside>

  <article class="content">
    <Section title="Experience" items={linkedExperienceItems} showTimeline />
    <Section title="Education" items={educationItems} />

    <p class="print-notice">
      <InfoIcon />
      For brevity, only the last few years are shown here.
      <br />
      See the rest at tyom.semonov.com
    </p>
  </article>
</main>

<style lang="postcss">
  main {
    @apply flex flex-col lg:flex-row min-h-screen bg-white;
  }

  @media screen {
    aside {
      @apply flex;
    }

    .print-notice {
      @apply hidden;
    }
  }

  @screen lg {
    aside {
      flex: 1;
    }

    .content {
      flex: 2;
    }
  }

  @media print {
    main {
      @apply grid gap-8;
      grid-template-columns: 1fr 2fr;
    }

    .content :global(section + section) {
      @apply hidden;
    }

    .print-notice {
      @apply flex items-center text-base leading-snug mt-12;

      & :global(svg) {
        @apply text-gray-500 w-9 h-9 mr-4;
      }
    }
  }
</style>
