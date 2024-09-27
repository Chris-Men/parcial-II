<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header v-if="!isAuthPage" class="flex items-center h-14 px-4 border-b border-gray-300 sm:h-16 md:px-6 lg:px-8">
      <div>
        <RouterLink class="flex items-center gap-2 font-semibold" to="/HomePagina">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
        </RouterLink>
      </div>
      <nav class="ml-auto space-x-4 flex items-center h-10 sm:space-x-6">
        <RouterLink class="text-gray-700 hover:text-blue-500" to="/HomePagina">Home</RouterLink>
        <RouterLink class="text-gray-700 hover:text-blue-500" to="/FavoritosPagina">Favoritos</RouterLink>
        <RouterLink class="text-gray-700 hover:text-blue-500" to="/HistorialPagina">Historial</RouterLink>
        <RouterLink class="text-gray-700 hover:text-blue-500" to="/ContactoPagina">Contactos</RouterLink>
        <button @click="logout" class="text-gray-700 hover:text-red-500">Cerrar Sesión</button>
      </nav>
    </header>
    <!-- Fin Header -->

    <!-- RouterView -->
    <main class="flex-1 flex items-center justify-center py-6">
      <RouterView />
    </main>
    <!-- Fin RouterView -->

    <!-- Footer -->
    <footer v-if="!isAuthPage" class="flex items-center h-14 px-4 border-t border-gray-300 sm:h-16 md:px-6 lg:px-8">
      <p class="flex-1 text-sm text-gray-500 text-center">
        © 20xx Acme Corporation. Derechos reservados
      </p>
    </footer>
    <!-- Fin Footer -->
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();

// Función para cerrar sesión
const logout = () => {
  localStorage.removeItem('token'); // Limpia el token
  router.push('/login'); // Redirige a la página de login
};

// Computed property para determinar si estamos en la página de login o registro
const isAuthPage = computed(() => route.path === '/login' || route.path === '/registro');
</script>

<style scoped>
/* Estilos específicos para la aplicación, si es necesario */
</style>
