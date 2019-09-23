<script context="module">
  export async function preload() {
    const getData = resourceName =>
      this.fetch(resourceName).then(res => res.json());

    const about = await getData('about.json');
    const experienceItems = await getData('experience.json');
    const educationItems = await getData('education.json');
    const definitions = await getData('definitions.json');

    return { about, experienceItems, educationItems, definitions };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { buildList, createDefinitionFinder } from '../utils';
  import InfoIcon from 'svelte-icons/fa/FaInfoCircle.svelte';
  import ExperienceItem from '../components/ExperienceItem.svelte';
  import Summary from '../components/Summary.svelte';
  import Timeline from '../components/Timeline.svelte';

  export let about;
  export let experienceItems;
  export let educationItems;
  export let definitions;

  const defLinker = createDefinitionFinder(definitions);
  const coreSkills = buildList(about.coreSkills, defLinker);
  const currentInterests = buildList(about.currentInterests, defLinker);
  const summary = Object.assign({}, about, { coreSkills, currentInterests });
  const linkedExperienceItems = experienceItems.map(item =>
    Object.assign({}, item, {
      technologies: buildList(item.technologies, defLinker),
    }),
  );
  let experienceSectionEl;
  let intersectionNodes;

  onMount(() => {
    intersectionNodes = document.querySelectorAll('.experience .experience-item');
  });
</script>

<style>
  @import '../css/variables.css';

  section + section {
    margin-top: 3em;
  }

  h2 {
    font-size: 1.2em;
    margin: 0 0 2em;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
    page-break-inside: avoid;
    page-break-after: avoid;
  }

  @media screen {
    aside {
      display: flex;
    }

    .content {
      padding: var(--padding);
      margin-top: -1.5em;
    }

    header {
      position: sticky;
      z-index: 1;
      top: 0;
      line-height: 1;
      padding: 1.5rem 0;
      border-bottom: 1px solid #0001;
      background-color: #fffe;
      margin-bottom: 2em;
    }

    h2 {
      margin: 0;
    }

    header :global(.timeline) {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  @media screen and (--medium-viewport-above) {
    aside {
      max-width: 40vw;
      flex: 1;
    }

    .content {
      flex: 2;
    }
  }

  @media screen and (--large-viewport-above) {
    .content {
      flex: 1.62;
    }
  }

  @media print {
    .education {
      display: none;
    }

    .print-details-info {
      position: relative;
      font-size: 0.9em;
      top: 2rem;
      display: flex;
      align-items: center;

      & :global(svg) {
        height: 2em;
        width: 2em;
        color: #777;
        margin-right: 1em;
      }
    }
  }
</style>

<svelte:head>
  <title>{about.name} - {about.title}: CV</title>
  <meta name="description" content={about.description} />
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tyom.semonov.com/" />
  <meta property="og:title" content="{about.name} - {about.title}: CV" />
  <meta property="og:description" content={about.description} />
  <meta property="og:image" content="https://tyom.semonov.com/logo.png" />
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://tyom.semonov.com/" />
  <meta property="twitter:title" content="{about.name} - {about.title}: CV" />
  <meta property="twitter:description" content={about.description} />
  <meta property="twitter:image" content="https://tyom.semonov.com/logo.png" />
</svelte:head>

<aside>
  <Summary {...summary} pdfLink="tyom-semonov-cv.pdf" />
</aside>

<article class="content">
  <section class="experience">
    <header>
      <h2>Experience</h2>
      {#if intersectionNodes}
        <Timeline events={experienceItems} {intersectionNodes} />
      {/if}
    </header>
    {#each linkedExperienceItems as experience}
      <ExperienceItem {...experience} />
    {/each}
  </section>
  <section class="education">
    <header>
      <h2>Education</h2>
    </header>
    {#each educationItems as experience}
      <ExperienceItem {...experience} />
    {/each}
  </section>

  <p class="u-print-only print-details-info">
    <InfoIcon />
    For brevity only the last few years are shown here.
    <br />
    See more at tyom.semonov.com.
  </p>
</article>
