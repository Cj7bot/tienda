<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import ProductCard from './ProductCard.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  import ErrorMessage from './ErrorMessage.svelte';
  import { products, loading, error, loadProducts, clearError } from '$lib/stores/productsStore';

  onMount(() => {
    loadProducts();
  });

  function handleRetry() {
    clearError();
    loadProducts();
  }
</script>

<section class="md:col-span-3">
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