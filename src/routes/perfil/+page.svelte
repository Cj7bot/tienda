<script lang="ts">
  import { onMount } from "svelte";

  let id_usuario = "";
  let nombre = "";
  let email = "";

  // Cargar datos del usuario al montar
  onMount(() => {
    id_usuario = localStorage.getItem("id_usuario") || "";
    nombre = localStorage.getItem("nombre") || "";
    email = localStorage.getItem("email") || "";
  });

  // Función para cerrar sesión
  function logout() {
    localStorage.clear(); // elimina todos los datos del usuario
    window.location.href = "/login"; // redirigir a login
  }
</script>

<div class="max-w-2xl mx-auto mt-10 p-6 bg-white border-amber-200 shadow rounded">
  <h1 class="text-2xl font-bold mb-4">My Profile</h1>

  <div class="space-y-3">
    <p><strong>User ID:</strong> {id_usuario}</p>
    <p><strong>Name:</strong> {nombre}</p>
    <p><strong>Email:</strong> {email}</p>
  </div>

  <div class="mt-6">
    <a
      href="/"
      class="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Go to Home
    </a>
  </div>

  <!-- Botón real para cerrar sesión -->
  <div class="mt-4">
    <button
      on:click={logout}
      class="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Sign Out
    </button>
  </div>
</div>
