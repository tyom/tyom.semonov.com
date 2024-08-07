<script>
  import posthog from 'posthog-js';
  import List from './List';
  import Icon from '$components/Icon.svelte';

  const truncateUrl = (url) => url.replace(/https:\/\//, '');

  export let name = '[Name]';
  export let title = '[Title]';
  export let details = '[Details]';
  export let contact;
  export let social;
  export let coreSkills;
  export let currentInterests;
  export let pdfLink;
</script>

<div
  class="summary p-8 md:p-12 print:!p-0 flex flex-1 flex-col gap-4 text-sm"
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
                <Icon name={item.icon} label={item.label} class="size-6 print:size-4" />
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
              <Icon name="pdf" label="PDF" class="size-6 transition-transform-200 group-hover:scale-125"/>
            </a>
          </div>
        {/if}
      </div>
      {#if contact}
        <dl class="contact">
          {#each Object.entries(contact) as [type, details]}
            <div class="flex gap-2 items-center">
              <dt class="hidden print:block">
                <Icon name={type} label={type} class="size-6 print:size-4" />
              </dt>
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
  <div class="hidden print:block break-before-page space-y-1 absolute bottom-0 left-0">
    <p class="flex items-center gap-2 leading-none">
      <Icon name="info" class="size-8" />
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
  }
</style>
