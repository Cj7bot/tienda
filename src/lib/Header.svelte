<script lang="ts">
  import { nombre } from '$lib/stores/user.js';
  import { toggleLanguage } from '$lib/stores/language.js';
  import { _ } from 'svelte-i18n';
  import '$lib/i18n';
  let menuOpen = false;
</script>


<div class="bg-green-600 text-white text-sm text-center py-1">
  * {$_('header.freeShipping')} *
</div>

<header class="bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-4">

      <!-- Logo -->
      <div class="flex-shrink-0">
        <img src="/pureinka_logo_small.avif" alt="Pure Inka Foods Logo" class="h-12" />
      </div>

      <!-- Navegación Desktop -->
      <nav class="hidden md:flex space-x-6 text-sm font-semibold text-gray-700">
        <a href="/"         class="hover:text-green-600">{$_('header.nav.home')}</a>
        <a href="/productos" class="hover:text-green-600">{$_('header.nav.shop')}</a>
        <a href="/about"    class="hover:text-green-600">{$_('header.nav.about')}</a>
        <a href="/distributors" class="hover:text-green-600">{$_('header.nav.distributors')}</a>
        <a href="/faq"      class="hover:text-green-600">{$_('header.nav.faq')}</a>
        <a href="/blog"     class="hover:text-green-600">{$_('header.nav.blog')}</a>
        <a href="/contact"  class="hover:text-green-600">{$_('header.nav.contact')}</a>
      </nav>

      <!-- Iconos y acciones -->
      <div class="flex items-center space-x-4 text-green-700 text-xl">
        {#if $nombre}
          <div class="flex items-center space-x-2 text-sm text-gray-700">
            <span class="whitespace-nowrap">{$_('header.user.hello')}, {$nombre}</span>
            <a href="/perfil" title={$_('header.user.profile')} class="hover:text-green-500" aria-label={$_('header.user.profile')}>
              <i class="fas fa-user"></i>
            </a>
          </div>
        {:else}
          <a href="/login" title={$_('header.user.login')} class="hover:text-green-500" aria-label={$_('header.user.login')}>
            <i class="fas fa-user"></i>
          </a>
        {/if}

        <button 
          on:click={toggleLanguage} 
          title={$_('header.language.change')} 
          class="hover:text-green-500 flex items-center space-x-1 text-sm font-medium"
        >
          <i class="fas fa-globe"></i>
          <span class="hidden sm:inline">{$_('header.language.current')}</span>
        </button>

        <a href="/carrito" title={$_('header.user.cart')} class="hover:text-green-500 relative" aria-label={$_('header.user.cart')}>
          <i class="fas fa-shopping-cart"></i>
        </a>

        <button class="md:hidden" on:click={() => (menuOpen = !menuOpen)} aria-label={menuOpen ? $_('header.user.closeMenu') : $_('header.user.openMenu')}>
          <i class={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Menú móvil -->
  {#if menuOpen}
    <nav class="md:hidden bg-white px-4 pb-4 space-y-2 text-sm font-semibold text-gray-700">
      <a href="/"         class="block hover:text-green-600">{$_('header.nav.home')}</a>
      <a href="/productos" class="block hover:text-green-600">{$_('header.nav.shop')}</a>
      <a href="/about"    class="block hover:text-green-600">{$_('header.nav.about')}</a>
      <a href="/distributors" class="block hover:text-green-600">{$_('header.nav.distributors')}</a>
      <a href="/faq"      class="block hover:text-green-600">{$_('header.nav.faq')}</a>
      <a href="/blog"     class="block hover:text-green-600">{$_('header.nav.blog')}</a>
      <a href="/contact"  class="block hover:text-green-600">{$_('header.nav.contact')}</a>
      <button 
        on:click={toggleLanguage} 
        class="w-full text-left hover:text-green-600 flex items-center space-x-2"
      >
        <i class="fas fa-globe"></i>
        <span>{$_('header.language.full')}</span>
      </button>
    </nav>
  {/if}
</header>

<style>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
