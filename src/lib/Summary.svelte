<script>
  import GitHub from 'svelte-icons/fa/FaGithub.svelte';
  import LinkedIn from 'svelte-icons/fa/FaLinkedin.svelte';
  import Twitter from 'svelte-icons/fa/FaTwitter.svelte';
  import PDF from 'svelte-icons/fa/FaFilePdf.svelte';
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
    twitter: Twitter,
  };
</script>

<div class="summary">
  <h1>{name}</h1>
  <h2>{title}</h2>
  <div class="details">
    {@html details}
  </div>
  {#if coreSkills || currentInterests}
    <div class="skill-set">
      {#if coreSkills}
        <section>
          <h3>Core skills</h3>
          <List items={coreSkills} />
        </section>
      {/if}
      {#if currentInterests}
        <section>
          <h3>Current interests</h3>
          <List items={currentInterests} />
        </section>
      {/if}
    </div>
  {/if}
  {#if social || pdfLink}
    <hr />
    <footer>
      <div class="footer-layout">
        {#if social}
          <div class="social-links">
            {#each social as item}
              <a href={item.url} title={item.label}>
                <span class="icon" aria-label={item.label}>
                  <svelte:component this={icons[item.icon]} />
                </span>
                <span class="u-print-only">
                  {truncateUrl(item.url)}
                </span>
              </a>
            {/each}
          </div>
        {/if}
        {#if pdfLink}
          <div class="download u-print-hidden">
            <a
              href={pdfLink}
              title="Open PDF version"
              aria-label="Download PDF"
            >
              <span class="download-label">Download PDF</span>
              <span class="icon">
                <PDF />
              </span>
            </a>
          </div>
        {/if}
      </div>
      {#if contact}
        <dl class="contact">
          {#each Object.entries(contact) as [type, details]}
            <div>
              <dt>{type}</dt>
              <dd>
                {@html details}
              </dd>
            </div>
          {/each}
        </dl>
      {/if}
    </footer>
  {/if}
</div>

<style lang="postcss">
  .summary {
    @apply relative p-8 md:p-12 flex-1;
  }

  .summary > * + *:not(hr) {
    @apply mt-4;
  }

  h1 {
    @apply font-bold tracking-wide leading-none;
    font-size: 3em;
  }

  h2 {
    @apply opacity-60;
    font-size: 1.5em;
  }

  h3 {
    @apply font-bold;
    font-size: 1.2em;
  }

  .details {
    max-width: 68ch;
  }

  .icon {
    @apply flex align-top;
    width: 1.5em;
    height: 1.5em;
  }

  .skill-set {
    @apply grid gap-4;

    & * + :global(ul) {
      @apply mt-2 ml-5;
    }
  }

  footer a {
    @apply inline-flex p-2 items-center;

    & .icon {
      transition: 0.1s;
    }

    &:hover .icon {
      transform: scale(1.15);
    }
  }

  footer :global(a) {
    @apply no-underline;

    &:hover {
      @apply underline;
    }
  }

  .download {
    @apply ml-auto;

    & a:active {
      box-shadow: 0 0 0 1px;
    }
  }

  .contact {
    @apply mt-6;

    & dt {
      @apply sr-only;
    }
  }

  @media screen {
    .summary {
      color: #fffd;
      font-size: 0.9em;
      background: linear-gradient(
        120deg,
        var(--panel-color-hi, #333),
        var(--panel-color-low, #111)
      );

      & :global(a):hover {
        color: #fff;
      }
    }

    .summary::before {
      @apply absolute pointer-events-none z-0 inset-0 opacity-10;
      background: repeating-linear-gradient(
        30deg,
        #fff 0px,
        #fff 2px,
        #fff0 2px,
        #fff0 12px
      );
    }

    @supports (mask: radial-gradient(ellipse, #000, #fff)) {
      .summary::before {
        content: '';
        mask: radial-gradient(
          150vw 1000vh ellipse at top left,
          #0000,
          #0003,
          #000
        );
      }
    }

    footer {
      @apply sticky top-12;
    }

    .footer-layout {
      @apply flex items-center;
      margin-right: -0.5rem;
    }

    .skill-set {
      font-size: 0.9em;
      grid-template-columns: repeat(auto-fit, minmax(11em, 1fr));
    }
  }

  .download-label {
    @apply mx-2 sm:inline-block lg:hidden xl:inline-block;
    font-size: 0.75em;
  }

  @media print {
    .summary {
      @apply p-0;
      font-size: 10.5pt;
    }

    .social-links {
      @apply flex flex-col;
    }

    h1 {
      font-size: 2.8rem;
    }

    h2 {
      font-size: 1.4rem;
    }

    footer {
      page-break-inside: avoid;

      & a {
        @apply p-0;

        & + a {
          @apply mt-2;
        }
      }
    }

    .download {
      display: none;
    }

    .icon {
      margin-right: 0.5em;
    }
  }
</style>
