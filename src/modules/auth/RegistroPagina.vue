<template>
    <div class="flex min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div class="flex flex-col items-center justify-center w-full p-6">
        <h2 class="text-4xl font-bold text-white mb-4">Registrarse</h2>
        <form @submit.prevent="register" class="flex flex-col space-y-4 bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <input
            type="email"
            v-model="email"
            placeholder="Correo electrónico"
            required
            class="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="password"
            v-model="password"
            placeholder="Contraseña"
            required
            class="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirmar contraseña"
            required
            class="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            type="submit"
            class="bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
          >
            Registrarse
          </button>
        </form>
        <p class="text-white mt-4">
          ¿Ya tienes cuenta? <router-link to="/login" class="underline">Inicia sesión</router-link>
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
  const confirmPassword = ref('');
  
  const register = () => {
    // Verifica que las contraseñas coincidan
    if (password.value !== confirmPassword.value) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    // Guarda el correo y la contraseña en LocalStorage
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
  
    // Registro exitoso y redirige a la página de login
    alert('Registro exitoso');
    router.push('/login');
  };
  </script>
  
  