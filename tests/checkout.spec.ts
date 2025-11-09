import { test, expect } from '@playwright/test';

test.describe('End-to-end Checkout Flow', () => {

  test('should complete the entire checkout process as a logged-in user', async ({ page }) => {
    // --- 1. Configuración inicial: Mock de las respuestas de la API ---
    await page.route('**/api/validateAddress', route => route.fulfill({ status: 200, json: { valid: true } }));
    await page.route('**/api/calculateShipping', route => route.fulfill({ status: 200, json: { cost: 5.00 } }));
    await page.route('**/checkout/process-order', route => route.fulfill({ status: 200, json: { success: true, orderId: 'mock123', message: 'Pedido procesado exitosamente' } }));

    // --- 2. Navegar al checkout primero ---
    await page.goto('/checkout');
    
    // --- 3. Configurar localStorage y sessionStorage DESPUÉS de la navegación ---
    await page.evaluate(() => {
      // Simular un usuario logueado
      localStorage.setItem('nombre', 'Test User');
      // Añadir token de autenticación (requerido por processPayment)
      sessionStorage.setItem('authToken', 'mock-jwt-token-for-testing');
      // Añadir un producto al carrito para la prueba
      localStorage.setItem('cart', JSON.stringify([
        {
          id: 'prod1',
          nombre: 'Super Alimento Andino',
          precio: 19.99,
          imagen: '/placeholder.jpg',
          cantidad: 1
        }
      ]));
    });

    // Recargar la página para que Svelte lea el nuevo estado del localStorage
    await page.reload();
    
    // Esperar a que la página esté completamente cargada e interactiva
    await page.waitForLoadState('networkidle');

    // --- 3. Sección de Envío ---
    // Seleccionar una opción de envío para abrir el modal de dirección
    const deliveryButton = page.getByRole('button', { name: /Express Delivery/i });
    await deliveryButton.waitFor({ state: 'visible' });
    // Forzar el click para asegurar que el event handler se dispare
    await deliveryButton.click({ force: true });

    // Esperar a que el modal de dirección y su contenido estén listos,
    // apuntando directamente al selector de país para evitar condiciones de carrera.
    const paisSelector = page.locator('select#pais');
    await expect(paisSelector).toBeVisible();

    // Rellenar el formulario de dirección
    await paisSelector.selectOption('Perú');
    await page.locator('select#departamento').selectOption('Lima');
    await page.locator('select#provincia').selectOption('Lima');
    await page.locator('select#distrito').selectOption('Miraflores');
    await page.locator('input[id="calle"]').fill('Av. Larco');
    await page.locator('input[id="numero"]').fill('123');

    // Confirmar la dirección
    await page.getByRole('button', { name: /Confirm Address/i }).click();

    // Esperar a que el modal se cierre y la dirección aparezca en el resumen
    await expect(paisSelector).not.toBeVisible();
    // FIX: Usar getByText para un localizador único y específico
    const addressSummary = page.getByText(/Av\. Larco 123, Miraflores/);
    await expect(addressSummary).toBeVisible();

    // --- 4. Continuar a la sección de Pago ---
    await page.getByRole('button', { name: /Continue to payment/i }).click();

    // Verificar que la sección de pago está visible
    await expect(page.locator('h2:has-text("Add your payment method")')).toBeVisible();

    // --- 5. Sección de Pago ---
    // Seleccionar método de pago con tarjeta de crédito
    await page.getByRole('button', { name: /Credit Card/i }).click();

    // Rellenar el formulario de la tarjeta de crédito
    const cardForm = page.locator('div:has-text("Tarjeta de crédito")').last();
    await expect(cardForm).toBeVisible();
    await cardForm.locator('input#cardNumber').fill('4242 4242 4242 4242');
    await cardForm.locator('input#cardExpiry').fill('12/28');
    await cardForm.locator('input#cardCVV').fill('123');

    // Agregar la tarjeta
    await cardForm.getByRole('button', { name: 'Agregar' }).click();

    // Esperar a que aparezca el popup de éxito y luego desaparezca
    await expect(page.getByText('Tarjeta agregada exitosamente').first()).toBeVisible();
    await expect(page.getByText('Tarjeta agregada exitosamente').first()).not.toBeVisible({ timeout: 5000 });

    // Aceptar los términos y condiciones
    await page.locator('input[type="checkbox"]').first().check();

    // --- 6. Finalizar la compra ---
    // Hacer clic en el botón final para pagar
    await page.getByRole('button', { name: /Continuar/i }).click();

    // --- 7. Verificación Final ---
    // Verificar que NO aparece un mensaje de error
    const errorMessage = page.getByText(/Error al procesar el pago/);
    await expect(errorMessage).not.toBeVisible({ timeout: 3000 });
    
    // La prueba finaliza aquí, verificando que el flujo completo fue exitoso sin errores.
  });
});
