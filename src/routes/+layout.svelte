<script>
  import '../app.css';
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<Header />
<slot />
<Footer />
