import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'cart';

function loadInitialCart() {
  if (!browser) return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Guarda el carrito en localStorage.
 * @param {Array<{ id: string, nombre: string, precio: number, imagen: string, cantidad: number }>} cartItems
 */
function persistCart(cartItems) {
  if (browser) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error('Error saving cart to localStorage:', err);
    }
  }
}


export const cart = writable(loadInitialCart());

cart.subscribe(persistCart);

// --- OPERACIONES PRINCIPALES ---

/**
 * Agrega un producto al carrito.
 * Si ya existe, aumenta la cantidad.
 * @param {Object} producto - Producto con id, nombre, precio, imagen
 */
export function addToCart(producto) {
  const precioNumerico = typeof producto.precio === 'string' ? parseFloat(producto.precio) : producto.precio;

  if (!producto?.id || typeof precioNumerico !== 'number' || isNaN(precioNumerico)) return;

  cart.update((items) => {
    const index = items.findIndex((item) => item.id === producto.id);
    if (index !== -1) {
      const updated = [...items];
      updated[index] = {
        ...updated[index],
        cantidad: updated[index].cantidad + 1,
      };
      return updated;
    }
    return [...items, { ...producto, precio: precioNumerico, cantidad: 1 }];
  });
}

/**
 * Elimina un producto completamente del carrito por ID.
 * @param {string} id
 */
export function removeFromCart(id) {
  cart.update((items) => items.filter((item) => item.id !== id));
}

/**
 * Disminuye la cantidad de un producto. Si llega a 0, lo elimina.
 * @param {string} id
 */
export function decreaseQty(id) {
  cart.update((items) =>
    items
      .map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0)
  );
}

/**
 * Limpia completamente el carrito.
 */
export function clearCart() {
  cart.set([]);
}

// --- DERIVADOS ---

/**
 * Total de productos (sumatoria de cantidades).
 */
export const totalItems = derived(cart, ($cart) =>
  $cart.reduce((acc, item) => acc + item.cantidad, 0)
);

/**
 * Subtotal en dinero (sin envío ni impuestos).
 */
export const subtotal = derived(cart, ($cart) =>
  $cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
);
