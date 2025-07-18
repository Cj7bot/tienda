<script>
  import { nombre } from '$lib/stores/user.js';
  import { goto } from '$app/navigation';

  let email    = '';
  let password = '';
  let error    = '';

  function handleLogin() {
    error = '';

    // Simulación de autenticación:
    if (email.trim() && password) {
      // Podrías llamar a tu API aquí; 
      // para la demo tomamos la parte antes de la @ como nombre
      const usuario = email.split('@')[0];
      nombre.set(usuario);
      // redirige al home
      goto('/');
    } else {
      error = 'Email y contraseña son obligatorios.';
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <div class="max-w-md w-full bg-white p-8 shadow-md rounded-md">
    <h1 class="text-2xl font-semibold mb-6 text-center">Sign in to your account</h1>
    {#if error}
      <p class="text-red-500 mb-4">{error}</p>
    {/if}
    <form on:submit|preventDefault={handleLogin} class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email address</label>
        <input
          type="email"
          bind:value={email}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
          required
        />
      </div>

      <div>
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <a href="#" class="text-sm text-green-600 hover:underline">Forgot password?</a>
        </div>
        <input
          type="password"
          bind:value={password}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition"
      >
        Sign in
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-gray-600">
      Not a member? 
      <a href="/register" class="text-green-600 hover:underline">Create an account</a>
    </p>
  </div>
</div>
