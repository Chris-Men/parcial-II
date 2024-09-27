<template>
    <div class="flex min-h-screen bg-gradient-to-r from-purple-500 to-blue-600">
      <div class="flex flex-col items-center justify-center w-full max-w-7xl mx-auto p-6">
        <h2 class="text-4xl font-bold text-white mb-6">Iniciar Sesión</h2>
        <form @submit.prevent="login" class="flex flex-col space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div>
            <label for="email" class="block text-gray-700 font-semibold mb-2">Correo electrónico</label>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="Ingresa tu correo"
              required
              class="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label for="password" class="block text-gray-700 font-semibold mb-2">Contraseña</label>
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Ingresa tu contraseña"
              required
              class="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <button
            type="submit"
            :disabled="loading" 
            class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-300"
          >
            <span v-if="loading">Cargando...</span>
            <span v-else>Iniciar Sesión</span>
          </button>
        </form>
        <p class="text-white mt-6">
          ¿No tienes cuenta? <router-link to="/registro" class="underline font-semibold">Regístrate</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const loading = ref(false);
  
  const login = async () => {
    loading.value = true;
  
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
  
    if (!storedEmail || !storedPassword) {
      alert('No hay credenciales almacenadas. Por favor regístrate primero.');
      loading.value = false;
      return;
    }
  
    if (email.value === storedEmail && password.value === storedPassword) {
      localStorage.setItem('token', 'your-authentication-token');
      router.replace('/HomePagina');
    } else {
      alert('Correo electrónico o contraseña incorrectos');
    }
  
    loading.value = false;
  };
  </script>
  