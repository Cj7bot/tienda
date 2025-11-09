import type { CheckoutData } from '$lib/types/checkout';

/**
 * Procesa un pago simulado (MOCK).
 * No requiere conexión con el backend.
 */
export async function processPayment(checkoutData: CheckoutData) {
  // 1. Verificar si el usuario está autenticado (localmente)
  const token = sessionStorage.getItem('authToken');
  if (!token) {
    throw new Error('Debes iniciar sesión para realizar una compra.');
  }

  console.log('⚠️ Modo MOCK: Simulando procesamiento de pago...');
  console.log('Checkout Data:', checkoutData);

  // 2. Simular una demora de red de 1.5 segundos
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 3. Simular una respuesta de pago exitosa
  const mockResponse = {
    success: true,
    message: 'Pago procesado exitosamente (MOCK)',
    order_id: Math.floor(Math.random() * 10000),
  };

  console.log('✅ MOCK Response:', mockResponse);
  return mockResponse;
}

// --- Otras funciones MOCK para el checkout ---

export async function validateAddress(addressData: any) {
  console.warn('Usando datos mock para validación de dirección');
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: 'Dirección validada (mock)' };
}

export async function getDeliveryOptions() {
  console.warn('Usando datos mock para opciones de envío');
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 'pickup', name: 'Pickup', description: 'Recoge en tienda' },
    { id: 'express', name: 'Express Delivery', description: 'Entrega rápida' },
  ];
}

export async function calculateShipping(addressData: any) {
  console.warn('Usando datos mock para cálculo de envío');
  await new Promise(resolve => setTimeout(resolve, 500));
  return { cost: 5.99, currency: 'USD', message: 'Costo mock calculado' };
}