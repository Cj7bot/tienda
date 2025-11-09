<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  import { nombre as nombreStore } from '$lib/stores/user.js';

  let id_usuario = "";
  let nombre = "";
  let email = "";
  let isEditing = false;
  let editedNombre = "";
  let isLoading = true;
  let isAuthenticated = false;

  // 🔒 SEGURIDAD: Verificar autenticación y cargar datos del backend
  onMount(async () => {
    await checkAuthAndLoadProfile();
  });

  async function checkAuthAndLoadProfile() {
    const token = sessionStorage.getItem('authToken');
    
    if (!token) {
      // No hay token, redirigir al login
      goto('/login');
      return;
    }

    try {
      // Verificar token y obtener datos del perfil desde el backend
      const response = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api'}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        // Sanitizar datos del backend
        id_usuario = String(userData.id || '').slice(0, 50);
        nombre = String(userData.username || '').slice(0, 100);
        email = String(userData.email || '').slice(0, 255);
        editedNombre = nombre;
        isAuthenticated = true;
      } else if (response.status === 401) {
        // Token inválido o expirado
        sessionStorage.removeItem('authToken');
        goto('/login');
        return;
      } else {
        console.error('Error loading profile');
        goto('/login');
        return;
      }
    } catch (error) {
      console.error('Network error:', error);
      goto('/login');
      return;
    } finally {
      isLoading = false;
    }
  }

  // 🔒 LOGOUT SEGURO: Invalidar token en el backend
  async function logout() {
    if (!confirm("Are you sure you want to sign out?")) {
      return;
    }

    const token = sessionStorage.getItem('authToken');
    
    try {
      // Invalidar token en el backend
      if (token) {
        await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api'}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Limpiar datos locales
      sessionStorage.removeItem('authToken');
      nombreStore.set('');
      goto('/login');
    }
  }

  // Name editing functions
  function startEditing() {
    isEditing = true;
    editedNombre = nombre;
  }

  // 🔒 GUARDAR CAMBIOS: Actualizar en el backend
  async function saveChanges() {
    if (!editedNombre.trim() || editedNombre.length > 100) {
      alert('El nombre debe tener entre 1 y 100 caracteres.');
      return;
    }

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      goto('/login');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api'}/profile/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ 
          username: editedNombre.trim() 
        })
      });

      if (response.ok) {
        nombre = editedNombre.trim();
        nombreStore.set(nombre);
        isEditing = false;
      } else if (response.status === 401) {
        sessionStorage.removeItem('authToken');
        goto('/login');
      } else {
        alert('Error al actualizar el perfil. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Error de conexión. Inténtalo de nuevo.');
    }
  }

  function cancelEditing() {
    editedNombre = nombre;
    isEditing = false;
  }

  // 🔒 FUNCIÓN SEGURA: Obtener iniciales con sanitización
  function getInitials(name: string): string {
    if (!name || typeof name !== 'string') return 'U';
    
    return name
      .trim()
      .split(" ")
      .filter(word => word.length > 0)
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .replace(/[^A-Z]/g, '') // Solo letras
      .slice(0, 2) || 'U';
  }

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
</script>

<!-- 🔒 GUARD DE AUTENTICACIÓN -->
{#if isLoading}
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Cargando perfil...</p>
    </div>
  </div>
{:else if !isAuthenticated}
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
    <div class="text-center">
      <p class="text-red-600 mb-4">Acceso no autorizado</p>
      <a href="/login" class="text-amber-600 hover:underline">Ir al login</a>
    </div>
  </div>
{:else}
<div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
  <div class="max-w-4xl mx-auto px-4">
    <!-- Header with breadcrumb -->
    <div class="mb-8">
      <nav class="flex text-sm text-gray-600 mb-4">
        <a href="/" class="hover:text-amber-600 transition-colors">Home</a>
        <span class="mx-2">/</span>
        <span class="text-gray-800 font-medium">My Profile</span>
      </nav>
    </div>

    <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- Profile Header -->
      <div class="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-12">
        <div class="flex items-center space-x-6">
          <!-- Avatar -->
          <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold backdrop-blur-sm">
            {nombre ? getInitials(nombre) : "U"}
          </div>
          
          <!-- User Info -->
          <div class="text-white">
            <h1 class="text-3xl font-bold mb-2">
              {nombre || "User"}
            </h1>
            <p class="text-amber-100 text-lg">{email}</p>
            <div class="flex items-center mt-3">
              <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span class="text-amber-100 text-sm">Active</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="p-8">
        <!-- Personal Information Section -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Personal Information
          </h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Name Field -->
            <div class="space-y-2">
              <label for="name-input" class="block text-sm font-medium text-gray-700">Name</label>
              {#if isEditing}
                <div class="flex space-x-2">
                  <input
                    id="name-input"
                    bind:value={editedNombre}
                    type="text"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                  <button
                    on:click={saveChanges}
                    class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    aria-label="Save changes"
                    title="Save"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </button>
                  <button
                    on:click={cancelEditing}
                    class="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    aria-label="Cancel editing"
                    title="Cancel"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              {:else}
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span class="text-gray-800">{nombre || "No name"}</span>
                  <button
                    on:click={startEditing}
                    class="text-amber-600 hover:text-amber-700 transition-colors"
                    aria-label="Edit name"
                    title="Edit name"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                </div>
              {/if}
            </div>

            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email-display" class="block text-sm font-medium text-gray-700">Email</label>
              <div id="email-display" class="p-4 bg-gray-50 rounded-lg">
                <span class="text-gray-800">{email || "Not specified"}</span>
              </div>
            </div>

            <!-- User ID Field -->
            <div class="space-y-2">
              <label for="user-id-display" class="block text-sm font-medium text-gray-700">User ID</label>
              <div id="user-id-display" class="p-4 bg-gray-50 rounded-lg font-mono text-sm">
                <span class="text-gray-600">{id_usuario || "Not available"}</span>
              </div>
            </div>

            <!-- Member Since -->
            <div class="space-y-2">
              <label for="member-since-display" class="block text-sm font-medium text-gray-700">Member Since</label>
              <div id="member-since-display" class="p-4 bg-gray-50 rounded-lg">
                <span class="text-gray-800">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Actions -->
        <div class="border-t pt-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Account Actions
          </h2>
          
          <div class="flex flex-wrap gap-4">
            <a
              href="/"
              class="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0V11a1 1 0 011-1h2a1 1 0 011 1v10m-6 0h6"></path>
              </svg>
              Go to Home
            </a>
            
            <button
              on:click={logout}
              class="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}
