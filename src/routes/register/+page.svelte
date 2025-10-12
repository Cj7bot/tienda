<script lang="ts">
  import { goto } from '$app/navigation';
  import { API_URL } from '$lib/config/api';
  
  let nombre = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let mensaje = "";
  let error = "";
  let showPassword = false;
  let showConfirmPassword = false;
  let isLoading = false;
  let registrationAttempts = 0;
  const MAX_ATTEMPTS = 3;

  // 🔒 VALIDACIONES SEGURAS
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const nameRegex = /^[a-zA-Z\s\u00C0-\u017F]{2,50}$/; // Solo letras y espacios, 2-50 caracteres

  const getPasswordError = (password: string) => {
    if (password.length < 12) return "La contraseña debe tener al menos 12 caracteres";
    if (password.length > 128) return "La contraseña no puede exceder 128 caracteres";
    if (!/[A-Z]/.test(password)) return "La contraseña debe contener al menos una mayúscula";
    if (!/[a-z]/.test(password)) return "La contraseña debe contener al menos una minúscula";
    if (!/[0-9]/.test(password)) return "La contraseña debe contener al menos un número";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "La contraseña debe contener al menos un carácter especial";
    
    // Verificar patrones comunes inseguros
    const commonPatterns = ['123456', 'password', 'qwerty', 'abc123', 'admin'];
    const lowerPassword = password.toLowerCase();
    for (const pattern of commonPatterns) {
      if (lowerPassword.includes(pattern)) {
        return "La contraseña contiene patrones comunes inseguros";
      }
    }
    
    return null;
  };
  
  const validateForm = () => {
    // Validar nombre
    if (!nombre.trim()) return "El nombre es requerido";
    if (nombre.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
    if (nombre.trim().length > 50) return "El nombre no puede exceder 50 caracteres";
    if (!nameRegex.test(nombre.trim())) return "El nombre solo puede contener letras y espacios";
    
    // Validar email
    if (!email.trim()) return "El email es requerido";
    if (email.length > 254) return "El email es demasiado largo";
    if (!emailRegex.test(email.trim())) return "El formato del email no es válido";
    
    // Validar contraseñas
    if (!password) return "La contraseña es requerida";
    if (!confirmPassword) return "Debes confirmar la contraseña";
    if (password !== confirmPassword) return "Las contraseñas no coinciden";
    
    return null;
  };

  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };
  
  const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword = !showConfirmPassword;
  };
  
  // 🔒 FUNCIÓN DE SANITIZACIÓN
  function sanitizeText(text: string): string {
    if (!text || typeof text !== 'string') return '';
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  async function handleRegister() {
    mensaje = "";
    error = "";

    // 🔒 RATE LIMITING: Verificar intentos
    if (registrationAttempts >= MAX_ATTEMPTS) {
      error = "Demasiados intentos de registro. Espera unos minutos.";
      return;
    }

    // Validar todos los campos
    const formError = validateForm();
    if (formError) {
      error = formError;
      return;
    }

    // Validar complejidad de contraseña
    const passwordCheckError = getPasswordError(password);
    if (passwordCheckError) {
      error = passwordCheckError;
      return;
    }

    isLoading = true;

    try {
      const registerUrl = `${API_URL}/register`;
      console.log('🔍 Registrando en:', registerUrl);
      
      const registerData = {
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        password: password
      };
      console.log('🔍 Datos a enviar:', { ...registerData, password: '[HIDDEN]' });
      
      // 🔒 SEGURIDAD: Enviar al backend Symfony
      const res = await fetch(registerUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(registerData)
      });
      
      console.log('🔍 Response status:', res.status);
      console.log('🔍 Response ok:', res.ok);

      if (res.ok) {
        mensaje = "¡Registro exitoso! Redirigiendo al login...";
        
        // Limpiar formulario
        nombre = "";
        email = "";
        password = "";
        confirmPassword = "";
        registrationAttempts = 0;
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          goto('/login');
        }, 2000);
        
      } else if (res.status === 400) {
        // Error de validación del backend
        const data = await res.json();
        // 🔒 SEGURIDAD: Solo mostrar errores genéricos
        if (data.error && data.error.includes('email')) {
          error = "El email ya está registrado.";
        } else {
          error = "Datos inválidos. Verifica la información.";
        }
        registrationAttempts++;
      } else if (res.status === 429) {
        error = "Demasiados intentos. Inténtalo más tarde.";
        registrationAttempts = MAX_ATTEMPTS;
      } else {
        error = "Error al procesar el registro. Inténtalo de nuevo.";
        registrationAttempts++;
      }

    } catch (e) {
      error = "Error de conexión. Verifica tu conexión a internet.";
      registrationAttempts++;
      // 🔒 SEGURIDAD: No revelar detalles del error en producción
      if (import.meta.env.DEV) {
        console.error('Registration error:', e);
      }
    } finally {
      isLoading = false;
    }
  }
</script>

<!-- 🔒 SEGURIDAD: Usar íconos locales en lugar de CDN externo -->

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Create your Account</h2>

    {#if mensaje}
      <div class="bg-green-100 text-green-700 p-2 rounded mb-4 text-center" role="status">
        {@html sanitizeText(mensaje)}
      </div>
    {/if}

    {#if error}
      <div class="bg-red-100 text-red-700 p-2 rounded mb-4 text-center" role="alert">
        {@html sanitizeText(error)}
      </div>
    {/if}

    <form on:submit|preventDefault={handleRegister} class="space-y-4">
      <div>
        <label for="nombre" class="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          id="nombre"
          type="text"
          bind:value={nombre}
          placeholder="John Doe"
          maxlength="50"
          autocomplete="name"
          class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          placeholder="correo@ejemplo.com"
          maxlength="254"
          autocomplete="email"
          class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <div class="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            bind:value={password}
            placeholder="••••••••••••"
            maxlength="128"
            autocomplete="new-password"
            class="mt-1 block w-full px-4 py-2 pr-10 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            type="button"
            class="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
            on:click={togglePasswordVisibility}
            aria-label="Mostrar/Ocultar contraseña"
          >
            {#if showPassword}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
            {:else}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            {/if}
          </button>
        </div>
      </div>

      <!-- Confirmar Contraseña -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
        <div class="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            bind:value={confirmPassword}
            placeholder="••••••••••••"
            maxlength="128"
            autocomplete="new-password"
            class="mt-1 block w-full px-4 py-2 pr-10 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            type="button"
            class="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
            on:click={toggleConfirmPasswordVisibility}
            aria-label="Mostrar/Ocultar confirmación de contraseña"
          >
            {#if showConfirmPassword}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
            {:else}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            {/if}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Registrando...' : 'Registrarse'}
      </button>
      
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600">
          ¿Ya tienes cuenta? 
          <a href="/login" class="text-green-600 hover:underline">Inicia sesión</a>
        </p>
      </div>
    </form>
  </div>
</div>
