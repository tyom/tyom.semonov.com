<script>
  import Analytics from '$components/Analytics.svelte';
  import '../global.css';
</script>

<Analytics />
<slot />

<style>
  @page {
    margin: 1cm;
  }

  @media screen {
    :global(body) {
      --at-apply: text-gray-900;
      font-size: clamp(0.98rem, 2vw, 1.5rem);
    }
  }

  :global(p + p) {
    --at-apply: mt-4;
  }

  :global(.divided > *::before) {
    --at-apply: block w-12 opacity-30;
    content: '';
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-top: 0.25rem solid !important;
  }

  :global(.divided > :first-child::before) {
    content: none;
  }
</style>
