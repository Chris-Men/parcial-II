<template>
  <div class="max-w-7xl w-full p-8 bg-white rounded-lg shadow-md mx-auto">
    <h3>
      <a
        target="_blank"
        href="https://rapidapi.com/sibaridev/api/rapid-translate-multi-traduction"
        class="text-blue-600 hover:underline"
      >
        Rapid Multi Traduction API
      </a>
    </h3>

    <div class="border border-blue-200 rounded-md shadow-sm">
      <div class="flex border-b border-blue-200">
        <textarea
          v-model="fromText"
          spellcheck="false"
          class="h-64 w-full border-none outline-none resize-none bg-blue-50 text-lg p-2"
          placeholder="Ingresa el texto aquí"
        ></textarea>
        <div
          class="border-l border-blue-200 h-64 w-full overflow-auto p-2 bg-blue-50"
          v-html="toText"
          readonly
          contenteditable="true"
        ></div>
      </div>
      <ul class="flex flex-col space-y-3 p-3">
        <li class="flex items-center justify-between">
          <div class="flex items-center w-2/5">
            <div class="flex space-x-2">
              <i
                class="fas fa-volume-up text-blue-400 text-lg cursor-pointer"
                @click="speak('from')"
              ></i>
              <i
                class="fas fa-copy text-blue-400 text-lg cursor-pointer"
                @click="copy('from')"
              ></i>
            </div>
            <select
              v-model="translateFrom"
              class="border-none outline-none text-lg pl-2 bg-blue-50"
            >
              <option v-for="(name, code) in countries" :value="code" :key="code">{{ name }}</option>
            </select>
          </div>
          <div
            class="text-blue-400 cursor-pointer text-lg"
            @click="swapLanguages"
          >
            <i class="fas fa-exchange-alt"></i>
          </div>
          <div class="flex items-center w-2/5">
            <select
              v-model="translateTo"
              class="border-none outline-none text-lg pl-2 bg-blue-50"
            >
              <option v-for="(name, code) in countries" :value="code" :key="code">{{ name }}</option>
            </select>
            <div class="flex space-x-2">
              <i
                class="fas fa-volume-up text-blue-400 text-lg cursor-pointer"
                @click="speak('to')"
              ></i>
              <i
                class="fas fa-copy text-blue-400 text-lg cursor-pointer"
                @click="copy('to')"
              ></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <button
      @click="translateText"
      class="w-full py-3 mt-5 text-white text-lg font-medium rounded-md bg-blue-600 hover:bg-blue-500 transition duration-200"
    >
      Traducir Texto
    </button>
    <div class="mt-4">
      <h4 class="text-lg font-semibold">Idiomas seleccionados:</h4>
      <p class="text-gray-700">
        Desde: {{ countries[translateFrom] }} - Hasta: {{ countries[translateTo] }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const fromText = ref('');
    const toText = ref('');
    const translateFrom = ref('en-GB');
    const translateTo = ref('es-ES');

    const countries = {
      'en-GB': 'Inglés',
      'ar-SA': 'Árabe',
      'es-ES': 'Español',
      'fr-FR': 'Francés',
      'de-DE': 'Alemán',
      'it-IT': 'Italiano',
      'pt-PT': 'Portugués',
      'ru-RU': 'Ruso',
      'zh-CN': 'Chino',
      'ja-JP': 'Japonés',
      'ko-KR': 'Coreano',
    };

    const translateText = () => {
      if (!fromText.value) return;

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'c2432b444dmsh909f603234f0c69p1a0e09jsne64b3c285be3',
          'X-RapidAPI-Host': 'ultra-fast-translation.p.rapidapi.com',
        },
        body: JSON.stringify({
          from: translateFrom.value,
          to: translateTo.value,
          e: '',
          q: fromText.value.split('\n'),
        }),
      };

      fetch('https://ultra-fast-translation.p.rapidapi.com/t', options)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toText.value = `<span class='text-red-600'>${data.message}</span>`;
          } else {
            toText.value = data.map((e) => e || e[0]).join('<br/>');
            saveTranslation(); // Guardar la traducción en el historial
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          toText.value = "<span class='text-red-600'>Error en la traducción</span>";
        });
    };

    const saveTranslation = () => {
      const history = JSON.parse(localStorage.getItem('translationHistory')) || [];
      history.push({
        fromLang: translateFrom.value,
        toLang: translateTo.value,
        originalText: fromText.value,
        translatedText: toText.value.replace(/<br\/>/g, '\n'), // Convertir HTML a texto
        date: new Date().toISOString(),
      });
      localStorage.setItem('translationHistory', JSON.stringify(history));
    };

    const swapLanguages = () => {
      const tempLang = translateFrom.value;
      translateFrom.value = translateTo.value;
      translateTo.value = tempLang;
      const tempText = fromText.value;
      fromText.value = toText.value;
      toText.value = tempText;
    };

    const copy = (type) => {
      const textToCopy = type === 'from' ? fromText.value : toText.value;
      navigator.clipboard.writeText(textToCopy);
    };

    const speak = (type) => {
      const utterance = new SpeechSynthesisUtterance(type === 'from' ? fromText.value : toText.value);
      utterance.lang = type === 'from' ? translateFrom.value : translateTo.value;
      speechSynthesis.speak(utterance);
    };

    return {
      fromText,
      toText,
      translateFrom,
      translateTo,
      countries,
      translateText,
      swapLanguages,
      copy,
      speak,
    };
  },
};
</script>
