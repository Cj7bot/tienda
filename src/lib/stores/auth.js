// src/lib/stores/auth.js
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

// Lee el token y el nombre de usuario del sessionStorage al iniciar
const initialToken = typeof window !== 'undefined' ? sessionStorage.getItem('authToken') : null;
const initialUser = typeof window !== 'undefined' ? sessionStorage.getItem('username') : null;

export const token = writable(initialToken);
export const user = writable(initialUser ? { username: initialUser } : null);

const API_BASE_URL = import.meta.env.PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';

/**
 * Objeto de autenticación con métodos para login y logout.
 */
export const auth = {
  /**
   * Inicia sesión enviando credenciales al backend.
   * @param {string} email - El email del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login_check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Requerido para cookies y sesiones con CORS
        body: JSON.stringify({
          username: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('username', data.username);
        token.set(data.token);
        user.set({ username: data.username });
        return { success: true };
      } else {
        // Login fallido - proporciona más detalles del error
        const errorMessage = data.error || data.message || `Error ${response.status}: ${response.statusText}`;
        
        // En desarrollo, muestra más información
        if (import.meta.env.DEV) {
          console.error('Login failed:', {
            status: response.status,
            statusText: response.statusText,
            data: data
          });
        }
        
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      return { success: false, error: 'No se pudo conectar con el servidor.' };
    }
  },

  /**
   * Cierra la sesión del usuario.
   */
  async logout() {
    const tokenValue = sessionStorage.getItem('authToken');
    if (tokenValue) {
      try {
        // Intenta invalidar el token en el backend
        await fetch(`${API_BASE_URL}/api/logout`, {
          method: 'GET', // Cambiado a GET para evitar el error 405
          headers: {
            'Authorization': `Bearer ${tokenValue}`
          },
          credentials: 'include'
        });
      } catch (e) {
        console.error('Failed to invalidate token on server:', e);
      }
    }

    // Limpia los datos de sesión locales independientemente del resultado del backend
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');
    token.set(null);
    user.set(null);
    goto('/login'); // Redirige al login
  }
};
