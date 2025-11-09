<script>
  import '../app.css';
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '$lib/i18n';
  import { currentLanguage } from '$lib/stores/language.js';
  import { locale } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import { clearCart } from '$lib/stores/cartStore.js';

  let devCartCleared = false;

  onMount(() => {
    // Limpia el carrito solo en modo de desarrollo y solo una vez.
    // NOTA: Comentado temporalmente para permitir pruebas de Playwright
    // if (dev && !devCartCleared) {
    //   clearCart();
    //   devCartCleared = true;
    // }

    locale.set($currentLanguage);
  });
</script>

<Header />
<slot />
<Footer />
