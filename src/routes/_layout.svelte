<style global>
  @import '../css/global.css';

  @media screen {
    main {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }
  }

  @media screen and (--medium-viewport-above) {
    main {
      flex-direction: row;
    }
  }

  @media print {
    main {
      display: grid;
      grid-gap: 2em;
      grid-template-columns: 1fr 2fr;
    }
  }
</style>

<main>
  <slot />
</main>
