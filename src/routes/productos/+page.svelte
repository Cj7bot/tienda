<script lang="ts">
  import { _ } from 'svelte-i18n';
  import '$lib/i18n';
  import ProductGrid from '$lib/components/ProductGrid.svelte';
  
  let openFilters = false;

  let categorias = [
    "all",
    "superfood_powders",
    "capsules",
    "diabetic_control",
    "prostate_balance", 
    "intestinal_wellness",
    "male_supplements",
    "female_supplements",
    "vegan_protein_powders",
    "baking_flours",
    "fruit_powders",
    "herbal_teas",
    "wholesale_for_retailers",
    "natural_sweeteners",
    "herbal_powders"
  ];
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
  <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">{$_('products.title')}</h1>

  <!-- Botón filtros en móvil -->
  <div class="md:hidden flex justify-end mb-4">
    <button
      class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
      on:click={() => (openFilters = true)}
    >
      <i class="fas fa-filter"></i>
      {$_('products.filters')}
    </button>
  </div>

  <div class="grid md:grid-cols-4 gap-8">
    <!-- Sidebar visible solo en desktop -->
    <aside class="hidden md:block md:col-span-1">
      <div class="bg-white rounded shadow p-4 sticky top-6">
        <h2 class="text-lg font-semibold mb-4">{$_('products.categories.title')}</h2>
        <ul class="space-y-2">
          {#each categorias as cat}
            <li>
              <button type="button" class="text-gray-600 hover:text-green-600 text-sm block w-full text-left">{$_(`products.categories.${cat}`)}</button>
            </li>
          {/each}
        </ul>
      </div>
    </aside>

    <!-- Productos -->
    <ProductGrid />
  </div>

  <!-- Panel lateral de filtros en mobile -->
  {#if openFilters}
    <div class="fixed inset-0 bg-black/50 z-40" on:click={() => (openFilters = false)} on:keydown={(e) => e.key === 'Escape' && (openFilters = false)} role="button" tabindex="0" aria-label={$_('products.closeFilters')}></div>
    <aside class="fixed right-0 top-0 bottom-0 w-64 bg-white z-50 shadow-lg p-4 overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">{$_('products.filters')}</h2>
        <button on:click={() => (openFilters = false)} class="text-gray-600 hover:text-red-500">
          ✕
        </button>
      </div>
      <ul class="space-y-2">
        {#each categorias as cat}
          <li>
            <button class="text-left w-full text-sm text-gray-700 hover:text-green-600">{$_(`products.categories.${cat}`)}</button>
          </li>
        {/each}
      </ul>
      <button
        on:click={() => (openFilters = false)}
        class="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {$_('products.applyFilters')}
      </button>
    </aside>
  {/if}
</div>
