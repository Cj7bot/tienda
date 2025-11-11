<script>
  import '../app.css';
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '$lib/i18n';
  import { currentLanguage } from '$lib/stores/language.js';
  import { locale } from 'svelte-i18n';
  import { onMount } from 'svelte';

  onMount(() => {
    locale.set($currentLanguage);
  });
</script>

<svelte:head>
  <!-- UserWay Accessibility Widget -->
  <script src="https://cdn.userway.org/widget.js" data-account="gZrdxHz9Kn"></script>
</svelte:head>

<Header />
<slot />
<Footer />
