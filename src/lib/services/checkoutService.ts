import type { CheckoutData } from '$lib/types/checkout';
import { API_URL } from '$lib/config/api';

export async function processPayment(checkoutData: CheckoutData) {
  try {
    const response = await fetch(`${API_URL}/checkout/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
      credentials: 'include' // Para manejar cookies de sesión si es necesario
    });

    if (!response.ok) {
      throw new Error('Error al procesar el pago');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en el proceso de pago:', error);
    throw error;
  }
}

export async function validateAddress(addressData: any) {
  try {
    const response = await fetch(`${API_URL}/checkout/validate-address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al validar la dirección');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al validar la dirección:', error);
    throw error;
  }
}

export async function getDeliveryOptions() {
  try {
    const response = await fetch(`${API_URL}/checkout/delivery-options`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al obtener opciones de envío');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener opciones de envío:', error);
    throw error;
  }
}

export async function calculateShipping(addressData: any) {
  try {
    const response = await fetch(`${API_URL}/checkout/calculate-shipping`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al calcular costos de envío');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al calcular costos de envío:', error);
    throw error;
  }
} 