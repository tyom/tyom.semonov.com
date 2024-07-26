<script>
  import posthog from 'posthog-js';
  import GitHub from '~icons/fa6-brands/github';
  import LinkedIn from '~icons/fa6-brands/linkedin';
  import PDF from '~icons/fa6-regular/file-pdf';
  import InfoSymbol from '~icons/material-symbols/info-outline-rounded';
  import List from './List';

  const truncateUrl = (url) => url.replace(/https:\/\//, '');

  export let name = '[Name]';
  export let title = '[Title]';
  export let details = '[Details]';
  export let contact;
  export let social;
  export let coreSkills;
  export let currentInterests;
  export let pdfLink;

  export let icons = {
    github: GitHub,
    linkedin: LinkedIn,
  };
</script>

<div
  class="summary p-8 md:p-12 print:!p-0 flex flex-1 flex-col gap-4 text-sm relative"
>
  <h1 class="font-bold tracking-wide leading-none text-[2.9em]">
    {name}
  </h1>
  <h2 class="leading-none opacity-60 text-[1.4em]">{title}</h2>
  <div class="max-w-[60ch] leading-snug space-y-4">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html details}
  </div>
  {#if coreSkills || currentInterests}
    <div class="skill-set space-y-4">
      {#if coreSkills}
        <section class="space-y-1">
          <h3 class="font-bold text-[1.1em]">Core skills</h3>
          <List items={coreSkills} />
        </section>
      {/if}
      {#if currentInterests}
        <section class="space-y-1">
          <h3 class="font-bold">Current interests</h3>
          <List items={currentInterests} />
        </section>
      {/if}
    </div>
  {/if}
  {#if social || pdfLink}
    <hr class="my-4" />
    <footer class="sticky top-10">
      <div class="flex items-center justify-between -mx-2 -mt-2 print:mt-0">
        {#if social}
          <div class="flex print:flex-col">
            {#each social as item}
              <a
                href={item.url}
                title={item.label}
                class="flex gap-2 p-2 transition-transform-100 hover:scale-125 print:py-1"
              >
                <svelte:component
                  this={icons[item.icon]}
                  aria-label={item.label}
                  class="h-6 w-6 print:(h-4 w-4)"
                />
                <span class="hidden print:block">
                  {truncateUrl(item.url)}
                </span>
              </a>
            {/each}
          </div>
        {/if}
        {#if pdfLink}
          <div class="download print:hidden">
            <a
              href={pdfLink}
              class="p-2 flex gap-3 group"
              title="Open PDF version"
              aria-label="Download PDF"
              target="_blank"
              on:click={() => {
                posthog.capture('click-pdf-download');
              }}
            >
              <span class="text-sm">Download</span>
              <span class="transition-transform-100 group-hover:scale-125">
                <PDF class="h-6 w-6" />
              </span>
            </a>
          </div>
        {/if}
      </div>
      {#if contact}
        <dl class="contact print:pl-8">
          {#each Object.entries(contact) as [type, details]}
            <div class="space-y-1">
              <dt class="sr-only">{type}</dt>
              <dd>
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html details}
              </dd>
            </div>
          {/each}
        </dl>
      {/if}
    </footer>
  {/if}
  <div class="hidden print:block break-before-page space-y-1 mt-4">
    <p class="flex items-center gap-2 leading-none">
      <InfoSymbol class="w-8 h-8" />
      <span class="max-w-[22ch]"
        >For brevity, only the last few years are shown here.</span
      >
    </p>
    <p>
      See the rest at <strong>tyom.semonov.com</strong>
    </p>
  </div>
</div>

<style>
  footer :global(a) {
    --at-apply: no-underline;

    &:hover {
      --at-apply: underline;
    }
  }

  @media screen {
    .summary {
      --at-apply: text-black/80 bg-gradient-to-br from-blue-gray-300
        to-blue-gray-300/0 dark\:text-white/80 dark\:from-blue-gray-950 dark\:to-blue-gray-900/0;
    }

    .summary :global(a):hover {
      --at-apply: text-black dark\:text-white;
    }

    .summary::before {
      --at-apply: absolute pointer-events-none z-0 inset-0 opacity-10;
      background: repeating-linear-gradient(
        30deg,
        #0003 0px,
        #0003 2px,
        #0000 0px,
        #0000 12px
      );
    }

    @media (prefers-color-scheme: dark) {
      .summary::before {
        background: repeating-linear-gradient(
          30deg,
          #fff2 0px,
          #fff2 2px,
          #fff0 2px,
          #fff0 12px
        );
      }
    }

    @supports (-webkit-mask: radial-gradient(ellipse, #000, #fff)) {
      .summary::before {
        content: '';
        -webkit-mask: radial-gradient(
          150vw 1000vh ellipse at top left,
          #0000,
          #0003,
          #000
        );
      }
    }
  }
</style>
