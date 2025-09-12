<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import ProductCard from './ProductCard.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  import ErrorMessage from './ErrorMessage.svelte';
  import { products, loading, error, loadProducts, clearError } from '$lib/stores/productsStore';

  console.log('ProductGrid component loaded');

  // Llamar loadProducts inmediatamente para test
  console.log('Calling loadProducts immediately');
  loadProducts();

  onMount(() => {
    console.log('ProductGrid mounted, calling loadProducts');
    // loadProducts(); // Ya lo llamamos arriba
  });

  function handleRetry() {
    console.log('Retry clicked');
    clearError();
    loadProducts();
  }

  // Debug reactive statements
  $: console.log('Loading state:', $loading);
  $: console.log('Error state:', $error);
  $: console.log('Products:', $products);
</script>

<section class="md:col-span-3">
  <!-- Debug button -->
  <div class="mb-4">
    <button 
      on:click={() => loadProducts()} 
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      TEST: Load Products
    </button>
  </div>

  {#if $loading}
    <LoadingSpinner />
  {:else if $error}
    <ErrorMessage message={$error} onRetry={handleRetry} />
  {:else if $products.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-500">{$_('products.noProducts')}</p>
    </div>
  {:else}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each $products as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>
  {/if}
</section>