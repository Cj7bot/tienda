<!-- src/routes/carrito/+page.svelte -->
<script>
  import { cart, totalItems, subtotal, removeFromCart, decreaseQty, addToCart } from '$lib/stores/cartStore.js';
  import { nombre } from '$lib/stores/user.ts';

  // Suscripciones reactivas
  $: lista = $cart;
  $: isEmpty = lista.length === 0;
  $: totalProductos = $totalItems;
  $: totalAPagar = $subtotal.toFixed(2);
  $: isLoggedIn = !!$nombre;
</script>

<div class="max-w-5xl mx-auto px-4 py-8">
  <div class="flex items-center justify-between mb-8">
    <h1 class="text-2xl font-semibold text-gray-800">
      Cart ({totalProductos} {totalProductos === 1 ? 'product' : 'products'})
    </h1>
  </div>

  {#if isEmpty}
    <!-- Carrito vacío -->
    <div class="bg-white rounded-xl px-6 py-8 shadow-md flex flex-col items-center text-center max-w-md mx-auto">
      <img src="/medium-empty-cart.png" alt="Carrito vacío" class="w-24 h-24 mb-4" />
      <p class="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</p>
      {#if !isLoggedIn}
        <p class="text-base text-gray-600 mb-6 leading-relaxed">
          Sign In to start adding products to your cart and enjoy exclusive offers and discounts.
        </p>
        <a href="/login" class="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition">
          Sign In
        </a>
        <p class="text-xs text-gray-600 mt-3">
          ¿Don't have an account?
          <a href="/register" class="text-blue-600 underline ml-1">Register</a>
        </p>
      {:else}
        <p class="text-base text-gray-600 mb-6 leading-relaxed">
          Start adding products to your cart to see them here.
        </p>
        <a href="/productos" class="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition">
          Browse Products
        </a>
      {/if}
    </div>
  {:else}
    <!-- Carrito con productos -->
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Lista de productos en el carrito -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="space-y-6">
            {#each lista as item (item.id)}
              <div class="flex items-start gap-4 py-4 {item !== lista[0] ? 'border-t border-gray-200' : ''}">
                <!-- Imagen -->
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  class="w-24 h-24 object-cover rounded-lg"
                />

                <div class="flex-1 min-w-0">
                  <!-- Nombre y Precio -->
                  <div class="flex justify-between items-start gap-2">
                    <h3 class="text-sm font-medium text-gray-800 leading-5">{item.nombre}</h3>
                    <button
                      on:click={() => removeFromCart(item.id)}
                      class="text-gray-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>

                  <!-- Precio unitario -->
                  <p class="text-sm text-gray-500 mt-1">Unit Price: ${item.precio.toFixed(2)}</p>

                  <!-- Control de cantidad y subtotal -->
                  <div class="flex justify-between items-center mt-4">
                    <div class="flex items-center gap-3">
                      <button
                        on:click={() => decreaseQty(item.id)}
                        class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
                      >
                        –
                      </button>
                      <span class="text-sm w-8 text-center">{item.cantidad}</span>
                      <button
                        on:click={() => addToCart(item)}
                        class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
                      >
                        +
                      </button>
                    </div>
                    <p class="text-sm font-medium">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Resumen de la orden -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-sm p-6 sticky top-6">
          <h2 class="text-lg font-semibold mb-4">Order Summary</h2>
          
          <!-- Productos -->
          <div class="flex justify-between py-3 border-b border-gray-200">
            <span class="text-gray-600">Products ({totalProductos})</span>
            <span class="font-medium">${totalAPagar}</span>
          </div>

          <!-- Descuentos -->
          <div class="flex justify-between py-3 border-b border-gray-200">
            <span class="text-gray-600">Discounts</span>
            <span class="text-green-600">-$0.00</span>
          </div>

          <!-- Total -->
          <div class="flex justify-between py-3 mt-2">
            <span class="text-lg font-semibold">Total:</span>
            <span class="text-lg font-semibold">${totalAPagar}</span>
          </div>

          <!-- Botón de checkout -->
          <a 
            href="/checkout"
            class="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition text-center block whitespace-nowrap"
          >
            Continue to checkout
          </a>

          <!-- Métodos de pago -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <p class="text-sm text-gray-600 text-center">¡Now you can pay for your purchases with Yape!</p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
