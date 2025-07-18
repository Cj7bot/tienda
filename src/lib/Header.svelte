<script lang="ts">
  import { nombre } from '$lib/stores/user.js';
  let menuOpen = false;
</script>


<div class="bg-green-600 text-white text-sm text-center py-1">
  * FREE SHIPPING ON ALL ORDERS | N.AMERICA + EUROPE *
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
        <a href="/"         class="hover:text-green-600">Home</a>
        <a href="/productos" class="hover:text-green-600">Shop</a>
        <a href="/about"    class="hover:text-green-600">About</a>
        <a href="/distributors" class="hover:text-green-600">Distributors</a>
        <a href="/faq"      class="hover:text-green-600">FAQ</a>
        <a href="/blog"     class="hover:text-green-600">Blog</a>
        <a href="/contact"  class="hover:text-green-600">Contact</a>
      </nav>

      <!-- Iconos y acciones -->
      <div class="flex items-center space-x-4 text-green-700 text-xl">
        {#if $nombre}
          <div class="flex items-center space-x-2 text-sm text-gray-700">
            <span class="whitespace-nowrap">Hello, {$nombre}</span>
            <a href="/perfil" title="Mi perfil" class="hover:text-green-500">
              <i class="fas fa-user"></i>
            </a>
          </div>
        {:else}
          <a href="/login" title="Login" class="hover:text-green-500">
            <i class="fas fa-user"></i>
          </a>
        {/if}

        <a href="/carrito" title="Carrito" class="hover:text-green-500 relative">
          <i class="fas fa-shopping-cart"></i>
        </a>

        <button class="md:hidden" on:click={() => (menuOpen = !menuOpen)}>
          <i class={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Menú móvil -->
  {#if menuOpen}
    <nav class="md:hidden bg-white px-4 pb-4 space-y-2 text-sm font-semibold text-gray-700">
      <a href="/"         class="block hover:text-green-600">Home</a>
      <a href="/productos" class="block hover:text-green-600">Shop</a>
      <a href="/about"    class="block hover:text-green-600">About</a>
      <a href="/distributors" class="block hover:text-green-600">Distributors</a>
      <a href="/faq"      class="block hover:text-green-600">FAQ</a>
      <a href="/blog"     class="block hover:text-green-600">Blog</a>
      <a href="/contact"  class="block hover:text-green-600">Contact</a>
    </nav>
  {/if}
</header>

<style>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
