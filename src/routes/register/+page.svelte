<script>
  let nombre = "";
  let email = "";
  let password = "";
  let mensaje = "";
  let error = "";

  let showPassword = false;

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  async function handleRegister() {
    mensaje = "";
    error = "";

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        mensaje = data.message;
        nombre = email = password = "";
      } else {
        error = data.error || "Error en el registro";
      }
    } catch (e) {
      error = "Error de conexión con el servidor";
    }
  }
</script>

<!-- Requiere fontawesome para los íconos -->
<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Create your Account</h2>

    {#if mensaje}
      <div class="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">{mensaje}</div>
    {/if}

    {#if error}
      <div class="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">{error}</div>
    {/if}

    <form on:submit|preventDefault={handleRegister} class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre completo</label>
        <input
          type="text"
          bind:value={nombre}
          placeholder="John Doe"
          class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email"
          bind:value={email}
          placeholder="correo@ejemplo.com"
          class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Contraseña</label>
        <div class="relative">
          <input
            type={showPassword ? "text" : "password"}
            bind:value={password}
            placeholder="••••••••"
            class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            type="button"
            class="absolute right-3 top-3 text-gray-600"
            on:click={togglePasswordVisibility}
            aria-label="Mostrar/Ocultar contraseña"
          >
            <i class={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
      >
        Registrarse
      </button>
    </form>
  </div>
</div>
