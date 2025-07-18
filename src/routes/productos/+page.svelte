<script lang="ts">
  import { addToCart } from '$lib/stores/cartStore.js';
  let openFilters = false;

  interface Producto {
    id: string;
    nombre: string;
    precio: number;
    imagen: string;
    freeShipping: boolean;
  }

  let categorias = [
    "All",
    "Superfood Powders",
    "Capsules",
    "Diabetic Control",
    "Prostate Balance",
    "Intestinal Wellness",
    "Male Supplements",
    "Female Supplements",
    "Vegan Protein Powders",
    "Baking Flours",
    "Fruit Powders",
    "Herbal Teas",
    "Wholesale for Retailers",
    "Natural Sweeteners",
    "Herbal Powders"
  ];

  let productos: Producto[] = [
    {
      id: "huanarpo-1",
      nombre: "Huanarpo Macho Powder",
      precio: 39.25,
      imagen: "/huanarpo1.avif",
      freeShipping: true
    },
    {
      id: "hercampuri-1",
      nombre: "Hercampuri + Graviola + Tocosh Capsules",
      precio: 37.21,
      imagen: "/capsules.avif",
      freeShipping: true
    },
    {
      id: "mashua-1",
      nombre: "Black Mashua Powder",
      precio: 36.2,
      imagen: "/mashua.avif",
      freeShipping: true
    },
    {
      id: "mix-30",
      nombre: "Mix 30 Packs (Powder + Capsules) - Free Shipping",
      precio: 270.90,
      imagen:"/pack1.avif",
      freeShipping: true
    },
    {
      id: "aguaje-1",
      nombre: "Aguaje Fruit Powder - Curvy Fruit - Buriti - Female Hormonal Supplement",
      precio: 35.00,
      imagen:"/aguajes.avif",
      freeShipping: true
    },
    {
      id: "digestion-1",
      nombre: "Digestion Pack - Muna Leaves Herbal Tea + Tocosh Caps - Free Shipping",
      precio: 34.46,
      imagen:"/digestive.avif",
      freeShipping: true
    },
    {
      id: "stevia-1",
      nombre: "Natural Sweetener - Stevia Yacon Powder- Dissolvable Diabetic Friendly",
      precio: 46.34,
      imagen:"/stevia.avif",
      freeShipping: true
    },
    {
      id: "lemon-1",
      nombre: "Lemon Balm Tea Powder | Wholesale | Bulk Orders | Retail Ready | FREE Shipping",
      precio: 102.20,
      imagen:"/lemon.avif",
      freeShipping: true
    },
    {
      id: "corn-1",
      nombre: "Blue Corn Flour | Wholesale | Bulk Orders | Retail Ready | FREE Shipping",
      precio: 102.20,
      imagen:"/maiz.avif",
      freeShipping: true
    }
  ];

  function handleAddToCart(producto: Producto) {
    addToCart(producto);
  }
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
  <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Browse Our Latest Superfoods</h1>

  <!-- Botón filtros en móvil -->
  <div class="md:hidden flex justify-end mb-4">
    <button
      class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
      on:click={() => (openFilters = true)}
    >
      <i class="fas fa-filter"></i>
      Filters
    </button>
  </div>

  <div class="grid md:grid-cols-4 gap-8">
    <!-- Sidebar visible solo en desktop -->
    <aside class="hidden md:block md:col-span-1">
      <div class="bg-white rounded shadow p-4 sticky top-6">
        <h2 class="text-lg font-semibold mb-4">Categories</h2>
        <ul class="space-y-2">
          {#each categorias as cat}
            <li>
              <a href="#" class="text-gray-600 hover:text-green-600 text-sm block">{cat}</a>
            </li>
          {/each}
        </ul>
      </div>
    </aside>

    <!-- Productos -->
    <section class="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each productos as producto}
        <div class="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col">
          <div class="relative">
            <img src={producto.imagen} alt={producto.nombre} class="w-full h-48 object-cover rounded" />
            {#if producto.freeShipping}
              <span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">Free Shipping</span>
            {/if}
          </div>
          <div class="mt-4 flex-1">
            <h3 class="text-sm font-medium text-gray-800 mb-1">{producto.nombre}</h3>
            <p class="text-green-600 font-semibold">${producto.precio.toFixed(2)}</p>
          </div>
          <button 
            on:click={() => handleAddToCart(producto)}
            class="mt-4 bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition"
          >
            Add to Cart
          </button>
        </div>
      {/each}
    </section>
  </div>

  <!-- Panel lateral de filtros en mobile -->
  {#if openFilters}
    <div class="fixed inset-0 bg-black/50 z-40" on:click={() => (openFilters = false)}></div>
    <aside class="fixed right-0 top-0 bottom-0 w-64 bg-white z-50 shadow-lg p-4 overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Filters</h2>
        <button on:click={() => (openFilters = false)} class="text-gray-600 hover:text-red-500">
          ✕
        </button>
      </div>
      <ul class="space-y-2">
        {#each categorias as cat}
          <li>
            <button class="text-left w-full text-sm text-gray-700 hover:text-green-600">{cat}</button>
          </li>
        {/each}
      </ul>
      <button
        on:click={() => (openFilters = false)}
        class="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Apply Filters
      </button>
    </aside>
  {/if}
</div>
