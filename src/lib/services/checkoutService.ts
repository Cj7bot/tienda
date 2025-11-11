import type { CheckoutData } from '$lib/types/checkout';

/**
 * Procesa un pago y envía la orden al backend.
 */
export async function processPayment(checkoutData: CheckoutData) {
  // 1. Verificar si el usuario está autenticado
  const token = sessionStorage.getItem('authToken');
  if (!token) {
    throw new Error('Debes iniciar sesión para realizar una compra.');
  }

  console.log('🛒 Procesando pago...');
  console.log('📦 Datos del checkout:', checkoutData);

  try {
    // 2. Hacer petición al backend
    const response = await fetch('http://localhost:8000/api/checkout/process-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(checkoutData)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error en la respuesta del servidor:', data);
      console.error('❌ Detalles del error:', JSON.stringify(data, null, 2));
      if (data.error) {
        console.error('❌ Error completo:', data.error);
      }
      throw new Error(data.message || 'Error al procesar el pago');
    }

    // 3. Mostrar información del email en la consola
    console.log('✅ Pedido creado exitosamente');
    console.log('📋 Order ID:', data.orderId || data.order_id);
    console.log('📧 Email enviado:', data.emailSent);
    
    if (data.emailError) {
      console.error('❌ Error al enviar email:', data.emailError);
      console.warn('⚠️ El pedido se creó pero no se pudo enviar el comprobante por email');
    } else if (data.emailSent) {
      console.log('✉️ Comprobante enviado exitosamente al email del usuario');
    }

    // 4. Mostrar toda la respuesta para debugging
    console.log('📄 Respuesta completa del servidor:', data);

    // 5. Opcional: Alertar al usuario si el email falló
    if (!data.emailSent) {
      console.warn('⚠️ IMPORTANTE: El pedido se procesó correctamente pero no se pudo enviar el email de confirmación');
    }

    return data;
  } catch (error) {
    console.error('💥 Error al procesar el pago:', error);
    throw error;
  }
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