<script lang="ts">
  import { cart, totalItems, subtotal } from '$lib/stores/cartStore.js';
  import { goto } from '$app/navigation';
  // Comentamos temporalmente las importaciones del backend
  /*import { processPayment, validateAddress, getDeliveryOptions, calculateShipping } from '$lib/services/checkoutService';
  import type { Address, CheckoutData } from '$lib/types/checkout';*/
  import { onMount } from 'svelte';
  
  // Reactive subscriptions
  $: totalProductos = $totalItems;
  $: totalAPagar = $subtotal.toFixed(2);
  
  // Modal and delivery state
  let showAddressModal = false;
  let selectedDeliveryOption: string | null = null;
  let addressConfirmed = false;
  let confirmedAddress = '';
  let showPaymentSection = false;
  let termsAccepted = false;
  let cmrTermsAccepted = false;
  let isLoading = false;
  let showPurchaseSuccess = false;
  let errorMessage = '';
  let shippingCost = 0;

  // Credit card form state
  let showCreditCardForm = false;
  let selectedPaymentMethod: string | null = null;
  let cardNumber = '';
  let cardExpiry = '';
  let cardCVV = '';
  let showSuccessPopup = false;
  let cardAdded = false;

  // Form data
  let departamento = '';
  let provincia = '';
  let distrito = '';
  let calle = '';
  let numero = '';

  // Delivery options
  let availableDeliveryOptions: Array<{id: string, name: string, description: string}> = [];

  // Load delivery options on mount
  /*onMount(async () => {
    try {
      availableDeliveryOptions = await getDeliveryOptions();
    } catch (error) {
      console.error('Error al cargar opciones de envío:', error);
      errorMessage = 'No se pudieron cargar las opciones de envío';
    }
  });*/

  async function handleDeliveryOptionClick(option: string) {
    selectedDeliveryOption = option;
    showAddressModal = true;
  }

  function handlePaymentMethodClick(method: string) {
    selectedPaymentMethod = method;
    if (method === 'credit') {
      showCreditCardForm = true;
    } else {
      showCreditCardForm = false;
    }
  }

  function formatCardNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.slice(i, i + 4));
    }
    cardNumber = parts.join(' ');
  }

  function formatExpiry(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2));
      if (month > 12) value = '12' + value.slice(2);
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    if (value.length > 5) value = value.slice(0, 5);
    cardExpiry = value;
  }

  function formatCVV(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    cardCVV = value;
  }

  async function handleSubmitCard(e: Event) {
    e.preventDefault();
    if (cardNumber && cardExpiry && cardCVV) {
      showSuccessPopup = true;
      cardAdded = true;
      setTimeout(() => {
        showSuccessPopup = false;
        showCreditCardForm = false;
      }, 2000);
    }
  }

  async function handleConfirmAddress() {
    if (departamento && provincia && distrito && calle && numero) {
      // Comentamos temporalmente la validación con el backend
      /*const addressData: Address = {
        departamento,
        provincia,
        distrito,
        calle,
        numero
      };

      try {
        // Validar la dirección con el backend
        await validateAddress(addressData);
        
        // Calcular costos de envío
        const shippingResult = await calculateShipping(addressData);
        shippingCost = shippingResult.cost;

        addressConfirmed = true;
        confirmedAddress = `${calle} ${numero}, ${distrito}, ${provincia}, ${departamento}`;
        showAddressModal = false;
        errorMessage = '';
      } catch (error) {
        console.error('Error al validar la dirección:', error);
        errorMessage = 'Error al validar la dirección. Por favor, inténtalo de nuevo.';
      }*/

      // Por ahora, simplemente confirmamos la dirección
      addressConfirmed = true;
      confirmedAddress = `${calle} ${numero}, ${distrito}, ${provincia}, ${departamento}`;
      showAddressModal = false;
      errorMessage = '';
    }
  }

  function handleChangeAddress() {
    showAddressModal = true;
  }

  async function handleContinueToPayment() {
    if (!showPaymentSection) {
      if (addressConfirmed) {
        showPaymentSection = true;
      }
    } else if (cardAdded) {
      isLoading = true;
      errorMessage = '';

      try {
        // Comentamos temporalmente el procesamiento de pago
        /*const checkoutData: CheckoutData = {
          address: {
            departamento,
            provincia,
            distrito,
            calle,
            numero
          },
          deliveryOption: selectedDeliveryOption!,
          paymentMethod: selectedPaymentMethod!,
          cardDetails: selectedPaymentMethod === 'credit' ? {
            cardNumber,
            cardExpiry,
            cardCVV
          } : undefined,
          items: $cart.map(item => ({
            id: item.id,
            cantidad: item.cantidad,
            precio: item.precio
          })),
          subtotal: $subtotal,
          shipping: shippingCost,
          total: $subtotal + shippingCost,
          termsAccepted,
          cmrTermsAccepted
        };

        await processPayment(checkoutData);*/
        
        // Simulamos un proceso de pago exitoso
        await new Promise(resolve => setTimeout(resolve, 2000));
        showPurchaseSuccess = true;
        // Cerramos el popup después de 3 segundos y redirigimos al carrito
        setTimeout(() => {
          showPurchaseSuccess = false;
          goto('/carrito');
        }, 3000);
      } catch (error) {
        console.error('Error al procesar el pago:', error);
        errorMessage = 'Error al procesar el pago. Por favor, inténtalo de nuevo.';
      } finally {
        isLoading = false;
      }
    }
  }
</script>

<div class="max-w-7xl mx-auto px-4 py-12">
  <!-- Progress Steps -->
  <div class="flex justify-center mb-16">
    <div class="flex items-center w-2/3 max-w-3xl">
      <!-- Cart Step -->
      <div class="flex flex-col items-center flex-1">
        <div class="w-10 h-10 rounded-full {!showPaymentSection ? 'bg-green-500' : 'bg-green-500'} flex items-center justify-center text-white">
          <span class="text-sm">1</span>
        </div>
        <span class="text-sm font-medium {!showPaymentSection ? 'text-green-500' : 'text-green-500'} mt-2">Cart</span>
      </div>

      <!-- Line 1 -->
      <div class="h-0.5 w-full {!showPaymentSection ? 'bg-gray-200' : 'bg-green-500'}"></div>

      <!-- Delivery Step -->
      <div class="flex flex-col items-center flex-1">
        <div class="w-10 h-10 rounded-full {!showPaymentSection ? 'bg-gray-200' : 'bg-green-500'} flex items-center justify-center {!showPaymentSection ? 'text-gray-500' : 'text-white'}">
          <span class="text-sm">2</span>
        </div>
        <span class="text-sm font-medium {!showPaymentSection ? 'text-gray-500' : 'text-green-500'} mt-2">Delivery</span>
      </div>

      <!-- Line 2 -->
      <div class="h-0.5 w-full bg-gray-200"></div>

      <!-- Payment Step -->
      <div class="flex flex-col items-center flex-1">
        <div class="w-10 h-10 rounded-full {showPaymentSection ? 'bg-gray-500' : 'bg-gray-200'} flex items-center justify-center text-white">
          <span class="text-sm">3</span>
        </div>
        <span class="text-sm font-medium text-gray-500 mt-2">Payment</span>
      </div>
    </div>
  </div>

  <div class="grid lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2">
      {#if !showPaymentSection}
        <!-- Delivery Section Content -->
        {#if addressConfirmed}
          <!-- Address Summary -->
          <div class="mb-6 bg-white rounded-lg border p-4">
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-3">
                <div class="text-gray-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-gray-600">Dirección -</div>
                  <div class="text-gray-900">{confirmedAddress}</div>
                </div>
              </div>
              <button 
                class="text-sm text-gray-600 hover:text-gray-900 underline"
                on:click={handleChangeAddress}
              >
                Cambiar
              </button>
            </div>
          </div>
        {/if}

        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Choose a delivery type</h2>
        
        <div class="space-y-4">
          <!-- Pickup Option -->
          <button 
            class="w-full bg-white rounded-lg p-6 border hover:border-green-500 transition-colors duration-200"
            on:click={() => handleDeliveryOptionClick('pickup')}
          >
            <div class="flex items-start gap-4">
              <div class="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">Pickup</h3>
                <p class="text-sm text-gray-500">Select the place where you want to pick up your order</p>
              </div>
            </div>
          </button>

          <!-- Express Delivery -->
          <button 
            class="w-full bg-white rounded-lg p-6 border hover:border-green-500 transition-colors duration-200"
            on:click={() => handleDeliveryOptionClick('express')}
          >
            <div class="flex items-start gap-4">
              <div class="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">Express Delivery</h3>
                <p class="text-sm text-gray-500">Add your address to know availability</p>
              </div>
            </div>
          </button>

          <!-- Scheduled Delivery -->
          <button 
            class="w-full bg-white rounded-lg p-6 border hover:border-green-500 transition-colors duration-200"
            on:click={() => handleDeliveryOptionClick('scheduled')}
          >
            <div class="flex items-start gap-4">
              <div class="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">Scheduled Delivery</h3>
                <p class="text-sm text-gray-500">Select a date and time for your delivery</p>
              </div>
            </div>
          </button>

          <!-- Date Range Delivery -->
          <button 
            class="w-full bg-white rounded-lg p-6 border hover:border-green-500 transition-colors duration-200"
            on:click={() => handleDeliveryOptionClick('date-range')}
          >
            <div class="flex items-start gap-4">
              <div class="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">Date Range Delivery</h3>
                <p class="text-sm text-gray-500">Select a date range for your delivery</p>
              </div>
            </div>
          </button>
        </div>
      {:else}
        <!-- Payment Section -->
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Add your payment method</h2>
        
        <div class="space-y-4">
          <!-- CMR Card -->
          <button class="w-full bg-white rounded-lg p-4 border hover:border-green-500 transition-colors duration-200 flex items-center gap-4">
            <div class="bg-green-500 text-white p-2 rounded">
              <span class="text-sm font-medium">CMR</span>
            </div>
            <span class="font-medium text-gray-900">CMR Card</span>
          </button>

          <!-- Credit Card -->
          <button 
            class="w-full bg-white rounded-lg p-4 border {selectedPaymentMethod === 'credit' ? 'border-green-500' : 'hover:border-green-500'} transition-colors duration-200 flex items-center gap-4"
            on:click={() => handlePaymentMethodClick('credit')}
          >
            <div class="bg-blue-600 text-white p-2 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1">
              <span class="font-medium text-gray-900">Credit Card</span>
              {#if cardAdded}
                <p class="text-sm text-gray-500 mt-1">**** **** **** {cardNumber.slice(-4)}</p>
              {/if}
            </div>
          </button>

          {#if showCreditCardForm}
            <div class="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Tarjeta de crédito</h3>
              <form class="space-y-4" on:submit={handleSubmitCard}>
                <!-- Card Number -->
                <div>
                  <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta</label>
                  <input
                    type="text"
                    id="cardNumber"
                    bind:value={cardNumber}
                    on:input={formatCardNumber}
                    placeholder="0000 0000 0000 0000"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Expiration -->
                  <div>
                    <label for="cardExpiry" class="block text-sm font-medium text-gray-700 mb-1">Expiración</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      bind:value={cardExpiry}
                      on:input={formatExpiry}
                      placeholder="MM/AA"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
                    />
                  </div>

                  <!-- CVV -->
                  <div>
                    <label for="cardCVV" class="block text-sm font-medium text-gray-700 mb-1">Código de seguridad</label>
                    <input
                      type="text"
                      id="cardCVV"
                      bind:value={cardCVV}
                      on:input={formatCVV}
                      placeholder="CVV"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  class="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Agregar
                </button>
              </form>
            </div>
          {/if}

          <!-- Success Popup -->
          {#if showSuccessPopup}
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg p-6 shadow-xl border border-gray-200 flex items-center gap-3">
                <div class="text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p class="text-gray-900 font-medium">Tarjeta agregada exitosamente</p>
              </div>
            </div>
          {/if}

          <!-- Debit Card -->
          <button class="w-full bg-white rounded-lg p-4 border hover:border-green-500 transition-colors duration-200 flex items-center gap-4">
            <div class="bg-teal-600 text-white p-2 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="font-medium text-gray-900">Debit Card</span>
          </button>

          <!-- Gift Card -->
          <div class="w-full bg-white rounded-lg p-4 border flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="bg-red-100 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd" />
                  <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                </svg>
              </div>
              <span class="font-medium text-gray-900">Gift Card</span>
            </div>
            <span class="text-gray-500 text-sm">No Available</span>
          </div>
        </div>

        <div class="mt-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Other options</h3>
          <!-- Yape Option -->
          <div class="w-full bg-white rounded-lg p-4 border flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="bg-purple-100 p-2 rounded">
                <span class="font-medium text-purple-600">Y</span>
              </div>
              <span class="font-medium text-gray-900">Yape</span>
            </div>
            <span class="text-gray-500 text-sm">No Available</span>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="mt-8 space-y-4">
          <label class="flex items-start gap-2">
            <input
              type="checkbox"
              bind:checked={termsAccepted}
              class="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span class="text-sm text-gray-600">
              Declaro que he leído y aceptado los
              <a href="#" class="text-green-600 hover:underline">términos y condiciones</a>
            </span>
          </label>

          <label class="flex items-start gap-2">
            <input
              type="checkbox"
              bind:checked={cmrTermsAccepted}
              class="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span class="text-sm text-gray-600">
              Accept the
              <a href="#" class="text-green-600 hover:underline">términos y condiciones</a>
              access to CMR Points
            </span>
          </label>
        </div>
      {/if}
    </div>

    <!-- Order Summary -->
    <div class="lg:col-span-1">
      <div class="bg-white rounded-lg shadow-sm p-6 sticky top-6">
        <h2 class="text-lg font-semibold mb-4">Order Summary</h2>
        
        <!-- Products -->
        <div class="flex justify-between py-3 border-b border-gray-200">
          <span class="text-gray-600">Products ({totalProductos})</span>
          <span class="font-medium">USD {totalAPagar}</span>
        </div>

        <!-- Discounts -->
        <div class="flex justify-between py-3 border-b border-gray-200">
          <span class="text-gray-600">Discounts</span>
          <span class="text-green-600">-USD 0.00</span>
        </div>

        <!-- Total -->
        <div class="flex justify-between py-3 mt-2">
          <span class="text-lg font-semibold">Total:</span>
          <span class="text-lg font-semibold">USD {totalAPagar}</span>
        </div>

        <!-- Action Button -->
        <button 
          class="w-full mt-6 py-3 rounded-lg font-medium transition text-center relative {!showPaymentSection ? (addressConfirmed ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed') : (selectedPaymentMethod && termsAccepted ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed')}"
          disabled={!showPaymentSection ? !addressConfirmed : !selectedPaymentMethod || !termsAccepted}
          on:click={handleContinueToPayment}
        >
          {#if isLoading}
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <span class="opacity-0">
              {showPaymentSection ? 'Continuar' : 'Continue to payment'}
            </span>
          {:else}
            {showPaymentSection ? 'Continuar' : 'Continue to payment'}
          {/if}
        </button>

        <!-- Need Invoice -->
        {#if showPaymentSection}
          <div class="mt-6 flex items-center justify-between border-t pt-6">
            <span class="text-gray-600">¿Necesitas factura?</span>
            <button class="px-4 py-1 border rounded hover:bg-gray-50">
              Solicitar
            </button>
          </div>
        {/if}

        <!-- Payment methods info -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-600 text-center">Now you can pay for your purchases with Yape!</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Address Modal -->
{#if showAddressModal}
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">Enter your address</h3>
        <button 
          class="text-gray-400 hover:text-gray-600" 
          on:click={() => showAddressModal = false}
        >
          ✕
        </button>
      </div>

      <form class="space-y-4" on:submit|preventDefault={handleConfirmAddress}>
        <!-- Departamento -->
        <div>
          <label for="departamento" class="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
          <div class="relative">
            <select 
              id="departamento"
              bind:value={departamento}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2 appearance-none pr-8"
            >
              <option value="">Select a State</option>
              <option value="Florida">Florida</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Provincia -->
        <div>
          <label for="provincia" class="block text-sm font-medium text-gray-700 mb-1">Province</label>
          <div class="relative">
            <select 
              id="provincia"
              bind:value={provincia}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2 appearance-none pr-8"
            >
              <option value="">Select a Province</option>
              <option value="Miami">Miami</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Distrito -->
        <div>
          <label for="distrito" class="block text-sm font-medium text-gray-700 mb-1">District</label>
          <div class="relative">
            <select 
              id="distrito"
              bind:value={distrito}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2 appearance-none pr-8"
            >
              <option value="">Select a District</option>
              <option value="Fort Lauderdale">Fort Lauderdale</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Street Address -->
        <div>
          <label for="calle" class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <input
            type="text"
            id="calle"
            bind:value={calle}
            placeholder="Enter street name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
          />
        </div>

        <!-- Number -->
        <div>
          <label for="numero" class="block text-sm font-medium text-gray-700 mb-1">Number</label>
          <input
            type="text"
            id="numero"
            bind:value={numero}
            placeholder="Enter street number"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2"
          />
        </div>

        <div class="flex justify-end gap-4 mt-6">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            on:click={() => showAddressModal = false}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Confirm Address
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Purchase Success Popup -->
{#if showPurchaseSuccess}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 shadow-xl max-w-md w-full mx-4 text-center">
      <div class="mb-6 text-green-500 flex justify-center">
        <svg class="h-16 w-16" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="18" fill="#00C853"/>
          <path d="M15 22.2L9.8 17l-1.4 1.4L15 25l12-12-1.4-1.4z" fill="white"/>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">¡COMPRA REALIZADA EXITOSAMENTE!</h2>
      <p class="text-gray-600">Gracias por tu compra. Recibirás un correo con los detalles de tu pedido.</p>
    </div>
  </div>
{/if}

<!-- Success Popup -->
{#if showSuccessPopup}
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg p-6 shadow-xl border border-gray-200 flex items-center gap-3">
                <div class="text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p class="text-gray-900 font-medium">Tarjeta agregada exitosamente</p>
              </div>
            </div>
          {/if}

<!-- Mostrar mensaje de error si existe -->
{#if errorMessage}
  <div class="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
    {errorMessage}
  </div>
{/if}

<style>
  /* Add these styles for the form elements to work properly */
  :global(.border-gray-300) {
    border-color: #D1D5DB;
  }
  :global(.focus\:border-green-500:focus) {
    border-color: #10B981;
  }
  :global(.focus\:ring-green-500:focus) {
    --tw-ring-color: #10B981;
  }
</style> 