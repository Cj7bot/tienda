<script lang="ts">
  import { addToCart } from '$lib/stores/cartStore';
  import { _ } from 'svelte-i18n';
  import type { Product } from '$lib/services/productsService';
  import { API_URL } from '$lib/config/api';

  export let product: Product;

  function handleAddToCart() {
    addToCart(product);
  }

  // Construir la URL completa de la imagen
  $: imageUrl = product.imagen?.startsWith('http')
    ? product.imagen
    : `${API_URL.replace('/api', '')}${product.imagen}`;
    
  // Imagen por defecto si falla la carga
  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/300x200?text=Producto';
  }
</script>

<div class="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col">
  <div class="relative">
    <img 
      src={imageUrl} 
      alt={product.nombre} 
      class="w-full h-48 object-cover rounded"
      on:error={handleImageError}
    />
    {#if product.stock > 0}
      <span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
        {$_('products.inStock')}
      </span>
    {:else}
      <span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
        {$_('products.outOfStock')}
      </span>
    {/if}
  </div>
  <div class="mt-4 flex-1">
    <h3 class="text-sm font-medium text-gray-800 mb-1">{product.nombre}</h3>
    <p class="text-green-600 font-semibold">${Number(product.precio).toFixed(2)}</p>
  </div>
  <button 
    on:click={handleAddToCart}
    class="mt-4 bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition"
  >
    {$_('products.addToCart')}
  </button>
</div>