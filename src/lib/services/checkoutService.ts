import type { CheckoutData } from '$lib/types/checkout';
import { API_URL } from '$lib/config/api';

export async function processPayment(checkoutData: CheckoutData) {
  const token = sessionStorage.getItem('authToken');
  if (!token) {
    // Falla rápido si el usuario no está autenticado.
    throw new Error('Usuario no autenticado');
  }

  const response = await fetch(`${API_URL}/checkout/process-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(checkoutData),
    credentials: 'include'
  });

  // Si la respuesta no es OK, lanza un error con el mensaje del backend.
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al procesar el pago');
    } catch (e) {
      // Si el cuerpo del error no es JSON, lanza un error genérico.
      throw new Error(`Error del servidor: ${response.statusText}`);
    }
  }

  // Si todo fue bien, devuelve la respuesta.
  return await response.json();
}

export async function validateAddress(addressData: any) {
  console.warn('Usando datos mock para validación de dirección. Implementar el endpoint en el backend.', addressData);

  // Simulando una demora de la red
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simular una respuesta exitosa
  return { success: true, message: 'Dirección validada (mock)' };
}

export async function getDeliveryOptions() {
  console.warn('Usando datos mock para opciones de envío. Implementar el endpoint en el backend.');

  // Simulando una demora de la red
  await new Promise(resolve => setTimeout(resolve, 500));

  // Datos de prueba
  const mockOptions = [
    { id: 'pickup', name: 'Pickup', description: 'Select the place where you want to pick up your order' },
    { id: 'express', name: 'Express Delivery', description: 'Add your address to know availability' },
    { id: 'scheduled', name: 'Scheduled Delivery', description: 'Select a date and time for your delivery' },
    { id: 'date-range', name: 'Date Range Delivery', description: 'Select a date range for your delivery' }
  ];

  return mockOptions;
}

export async function calculateShipping(addressData: any) {
  console.warn('Usando datos mock para cálculo de envío. Implementar el endpoint en el backend.', addressData);

  // Simulando una demora de la red
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simular un costo de envío
  return { cost: 0, currency: 'USD', message: 'Costo de envío calculado (mock)' };
} 