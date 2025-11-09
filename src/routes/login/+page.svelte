<script>
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth.js';

  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;

  async function handleLogin() {
    error = '';
    isLoading = true;

    const result = await auth.login(email, password);

    if (result.success) {
      goto('/'); // Redirige al home en caso de éxito
    } else {
      error = result.error || 'Ocurrió un error inesperado.';
    }

    isLoading = false;
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
          autocomplete="email"
        />
      </div>

      <div>
        <div class="flex justify-between items-center">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <a href="/forgot-password" class="text-sm text-green-600 hover:underline">Forgot password?</a>
        </div>
        <input
          id="password"
          type="password"
          bind:value={password}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
          required
          autocomplete="current-password"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        class="w-full py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if isLoading}
          <span>Iniciando sesión...</span>
        {:else}
          <span>Sign in</span>
        {/if}
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-gray-600">
      Not a member? 
      <a href="/register" class="text-green-600 hover:underline">Create an account</a>
    </p>
  </div>
</div>