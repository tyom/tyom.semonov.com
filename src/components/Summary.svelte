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
  class="summary text-foreground/90 flex flex-1 flex-col gap-4 bg-gradient-to-br from-gray-300
    to-gray-300/0 p-8 text-sm md:p-10 dark:from-gray-950 dark:to-gray-900/0 print:!p-0"
>
  <h1 class="text-[2.9em] leading-none font-bold tracking-wide">
    {name}
  </h1>
  <h2 class="text-xl leading-none opacity-60">{title}</h2>
  <div class="max-w-[60ch] space-y-4 leading-snug">
    <!-- Safe: details is from developer-controlled YAML files, pre-rendered via markdown-it -->
    {@html details}
  </div>
  {#if coreSkills || currentInterests}
    <div class="skill-set space-y-4">
      {#if coreSkills}
        <section class="space-y-1">
          <h3 class="text-[1.1em] font-bold">Core skills</h3>
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
      <div class="-mx-2 -mt-2 flex items-center justify-between print:mt-0">
        {#if social}
          <div class="flex print:flex-col">
            {#each social as item}
              <a
                href={item.url}
                title={item.label}
                class="transition-transform-100 flex gap-2 p-2 hover:scale-125 print:py-1"
              >
                <Icon
                  name={item.icon}
                  label={item.label}
                  class="size-6 print:size-4"
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
              class="group flex items-center gap-1 p-2"
              title="Open PDF version"
              aria-label="Download PDF"
              target="_blank"
              on:click={() => {
                posthog.capture('click-pdf-download');
              }}
            >
              <span class="text-xs">Download PDF</span>
              <Icon
                name="pdf"
                label="PDF"
                class="transition-transform-200 size-6 group-hover:scale-125"
              />
            </a>
          </div>
        {/if}
      </div>
      {#if contact}
        <dl class="contact">
          {#each Object.entries(contact) as [type, details]}
            <div class="flex items-center gap-2">
              <dt class="hidden print:block">
                <Icon name={type} label={type} class="size-6 print:size-4" />
              </dt>
              <dd>
                <!-- Safe: contact details from developer-controlled YAML files, pre-rendered via markdown-it -->
                {@html details}
              </dd>
            </div>
          {/each}
        </dl>
      {/if}
    </footer>
  {/if}
  <div
    class="absolute bottom-0 left-0 hidden break-before-page space-y-1 print:block"
  >
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
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media screen {
    .summary :global(a):hover {
      color: light-dark(var(--color-black), var(--color-white));
    }
  }
</style>
