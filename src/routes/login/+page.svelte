<script>
  import { nombre } from '$lib/stores/user.js';
  import { goto } from '$app/navigation';

  // Configuración del backend Symfony (ajusta según tu setup)
  const API_BASE_URL = import.meta.env.PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';

  let email    = '';
  let password = '';
  let error    = '';
  let isLoading = false;
  let loginAttempts = 0;
  const MAX_ATTEMPTS = 5;

  // 🔄 FUNCIÓN ACTUALIZADA: Mueve la lógica de autenticación al Back-end
  async function handleLogin() {
    error = '';

    // Client-side rate limiting
    if (loginAttempts >= MAX_ATTEMPTS) {
      error = 'Demasiados intentos. Por favor, espera unos minutos.';
      return;
    }

    if (!email.trim() || !password) {
      error = 'Email y contraseña son obligatorios.';
      return;
    }

    isLoading = true;

    try {
      // 1. Envía las credenciales al endpoint de autenticación de Symfony
      const response = await fetch(`${API_BASE_URL}/api/login_check`, { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Incluye cookies para CORS con backend separado
        body: JSON.stringify({ username: email.trim(), password: password }) 
      });

      // 2. Maneja la respuesta segura del Back-end
      if (response.ok) {
        const data = await response.json(); 
        
        // Validación básica del token JWT
        if (!data.token || typeof data.token !== 'string' || data.token.split('.').length !== 3) {
          error = 'Respuesta del servidor inválida.';
          return;
        }
        
        // 🔒 SEGURIDAD: Usar httpOnly cookie es más seguro, pero si usas localStorage:
        // Nota: Considera migrar a httpOnly cookies en el backend
        sessionStorage.setItem('authToken', data.token); // sessionStorage > localStorage
        
        // Solo confiar en datos del backend
        if (data.username && typeof data.username === 'string') {
          nombre.set(data.username);
        }

        // Reset intentos en login exitoso
        loginAttempts = 0;
        
        // Limpiar credenciales de memoria
        email = '';
        password = '';

        // Redirige al home
        goto('/');
      } else if (response.status === 401) {
        loginAttempts++;
        error = 'Credenciales inválidas.';
      } else if (response.status === 429) {
        error = 'Demasiados intentos. Inténtalo más tarde.';
      } else {
        error = 'Error al procesar la solicitud.';
      }

    } catch (err) {
      // No revelar detalles del error en producción
      error = 'Error de conexión. Inténtalo de nuevo.';
      // Log solo en desarrollo
      if (import.meta.env.DEV) {
        console.error('Login error:', err);
      }
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <div class="max-w-md w-full bg-white p-8 shadow-md rounded-md">
    <h1 class="text-2xl font-semibold mb-6 text-center">Sign in to your account</h1>
    {#if error}
      <p class="text-red-500 mb-4" role="alert">{error}</p>
    {/if}
    <form on:submit|preventDefault={handleLogin} class="space-y-5">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
          required
        />
      </div>

      <div>
        <div class="flex justify-between items-center">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <a href="#" class="text-sm text-green-600 hover:underline">Forgot password?</a>
        </div>
        <input
          id="password"
          type="password"
          bind:value={password}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        class="w-full py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Iniciando sesión...' : 'Sign in'}
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-gray-600">
      Not a member? 
      <a href="/register" class="text-green-600 hover:underline">Create an account</a>
    </p>
  </div>
</div>