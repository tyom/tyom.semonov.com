<script>
  import GitHub from 'svelte-icons/fa/FaGithub.svelte';
  import LinkedIn from 'svelte-icons/fa/FaLinkedin.svelte';
  import Twitter from 'svelte-icons/fa/FaTwitter.svelte';
  import PDF from 'svelte-icons/fa/FaFilePdf.svelte';
  import List from './List';

  const truncateUrl = url => url.replace(/https:\/\//, '');

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

<style>
  @import '../css/variables.css';

  @media screen {
    .summary {
      padding: var(--padding);
      position: relative;
      color: #fffd;
      width: 100%;
      font-size: 0.9em;
      background: linear-gradient(
        120deg,
        var(--panel-color-hi, #333),
        var(--panel-color-low, #111)
      );

      & :global(a):hover {
        color: #fff;
      }

      & .skill-set {
        position: relative;
        z-index: 1;
      }
    }

    .summary::before {
      pointer-events: none;
      position: absolute;
      z-index: 0;
      opacity: 0.1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
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
  }

  h1 {
    letter-spacing: 1px;
    line-height: 1;
    font-size: 3em;
    margin: 0;
  }

  h2 {
    font-size: 1.5em;
    opacity: 0.6;
    font-weight: 400;
    margin: 0;
  }

  h3 {
    font-size: 1.2em;
    margin: 0 0 0.3em;
  }

  * + h2 {
    margin-top: 1rem;
  }

  .details {
    max-width: 68ch;
  }

  * + .details {
    margin-top: 1em;
  }

  .icon {
    display: flex;
    width: 1.5em;
    height: 1.5em;
    vertical-align: top;
  }

  .skill-set {
    display: grid;
    grid-gap: 1em;
  }

  section + section {
    margin-top: 1rem;
  }

  * + .skill-set {
    margin-top: 1.5em;
  }

  @supports (display: grid) {
    section + section {
      margin-top: 0;
    }
  }

  footer a {
    margin-right: 1rem;
    display: inline-flex;
    transition: 0.1s;

    &:hover {
      transition: 0.15s;
      transform: scale(1.2) translateZ(0);
    }
  }

  footer :global(a) {
    text-decoration: none;
  }

  .download {
    margin-left: auto;
    margin-right: 0.1em;

    & .icon {
      width: 1.3em;
    }

    & a {
      transform: scale(1.2);
      margin: 0;
      display: flex;
      align-items: center;
      padding: 0.2em;
      border-radius: 0.2em;
    }

    & a:hover {
      transform: scale(1.3) translateZ(0);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5);
    }

    & a:active {
      box-shadow: 0 0 0 1px;
    }
  }

  .contact {
    margin: 1.5em 0 0;

    & dd {
      margin-left: 0;
    }
  }

  @media screen {
    footer {
      position: sticky;
      top: var(--padding);
    }

    .footer-layout {
      display: flex;
      align-items: center;
    }

    .skill-set {
      font-size: 0.9em;
      grid-template-columns: repeat(auto-fit, minmax(11em, 1fr));
    }

    .download-label {
      font-size: 0.75em;
      margin-left: 0.5em;
      margin-right: 0.5em;
      display: none;
    }
  }

  @media (--medium-viewport-below) {
    .download-label {
      display: inline-block;
    }
  }

  @media (--large-viewport-above) {
    .download-label {
      display: inline-block;
    }
  }

  @media print {
    .summary {
      font-size: 10.5pt;
    }

    h1 {
      font-size: 2.8rem;
    }

    h2 {
      font-size: 1.4rem;
    }

    footer {
      page-break-inside: avoid;
    }

    .download {
      display: none;
    }

    .icon {
      margin-right: 0.5em;
    }
  }
</style>

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
    <footer class="divided">
      <div class="footer-layout">
        {#if social}
          <div class="social-links footer-layout">
            {#each social as item}
              <a href={item.url} title={item.label}>
                <span class="icon" aria-label={item.label}>
                  <svelte:component this={icons[item.icon]} />
                </span>
                <span class="u-print-only">
                  <span class="u-print-only">{truncateUrl(item.url)}</span>
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
              aria-label="Download PDF">
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
              <dt class="visually-hidden">{type}</dt>
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
