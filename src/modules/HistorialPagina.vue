<template>
  <div class="max-w-7xl w-full p-8 bg-gray-100 rounded-lg shadow-md mx-auto">
    <h3 class="text-2xl font-bold text-blue-600 mb-4">Historial de Traducción</h3>
    <div v-if="translations.length === 0" class="text-gray-500">
      No hay historial de traducción disponible.
    </div>
    <div v-else>
      <div
        v-for="(item, index) in translations"
        :key="index"
        class="border-b border-gray-300 py-2 flex justify-between items-center hover:bg-gray-200 transition duration-200"
      >
        <div class="flex-1">
          <div class="text-gray-800"><strong>Idioma Original:</strong> {{ countries[item.fromLang] }}</div>
          <div class="text-gray-800"><strong>Texto Original:</strong> {{ item.originalText }}</div>
          <div class="text-gray-800"><strong>Idioma Traducido:</strong> {{ countries[item.toLang] }}</div>
          <div class="text-gray-800"><strong>Texto Traducido:</strong> {{ item.translatedText }}</div>
          <div class="text-gray-500"><strong>Fecha:</strong> {{ item.date }}</div>
        </div>
        <button @click="removeTranslation(index)" class="ml-4 text-red-600 hover:text-red-800">
          Eliminar
        </button>
      </div>
    </div>
    <button @click="clearHistory" class="mt-4 w-full py-2 text-white bg-blue-600 hover:bg-blue-500 rounded-md transition duration-200">
      Borrar Historial
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const translations = ref([]);
    
    // Define el objeto countries para mostrar los nombres de los idiomas
    const countries = {
      'en-GB': 'English',
      'ar-SA': 'Arabic',
      'es-ES': 'Spanish',
      'fr-FR': 'French',
      'de-DE': 'German',
      'it-IT': 'Italian',
      'pt-PT': 'Portuguese',
      'ru-RU': 'Russian',
      'zh-CN': 'Chinese',
      'ja-JP': 'Japanese',
      'ko-KR': 'Korean',
    };

    onMounted(() => {
      loadTranslationHistory();
    });

    const loadTranslationHistory = () => {
      const history = JSON.parse(localStorage.getItem('translationHistory')) || [];
      const formattedHistory = history.map(item => ({
        fromLang: item.fromLang, // Idioma original
        originalText: item.originalText, // Texto original
        toLang: item.toLang, // Idioma traducido
        translatedText: item.translatedText, // Texto traducido
        date: new Date(item.date).toLocaleString(), // Formatear la fecha
      }));
      translations.value = formattedHistory;
    };

    const removeTranslation = (index) => {
      const history = JSON.parse(localStorage.getItem('translationHistory')) || [];
      history.splice(index, 1); // Eliminar el item del historial
      localStorage.setItem('translationHistory', JSON.stringify(history)); // Actualizar el localStorage
      loadTranslationHistory(); // Recargar el historial
    };

    const clearHistory = () => {
      localStorage.removeItem('translationHistory'); // Borrar el historial del localStorage
      translations.value = []; // Vaciar el array de traducciones
    };

    return {
      translations,
      clearHistory,
      removeTranslation,
      countries,
    };
  },
};
</script>

