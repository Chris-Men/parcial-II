<template>
  <div class="relative h-screen w-screen">
    <div class="flex flex-col lg:flex-row h-full w-full">
      <div class="w-full lg:w-3/4 h-full relative">
        <iframe
          class="absolute inset-0 w-full h-full"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="mapa"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%&height=600&hl=es&q=Universidad%20Luterana%20Salvadoreña&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          style="border: 0"
        ></iframe>
      </div>

      <div
        class="w-full lg:w-1/4 bg-white p-8 flex flex-col justify-center relative z-10 shadow-lg"
      >
        <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Comentarios</h2>
        <p class="leading-relaxed mb-5 text-gray-600">Por favor, déjanos tus comentarios.</p>

        <div class="relative mb-4">
          <label for="recipient" class="leading-7 text-sm text-gray-600"
            >Correo del Destinatario</label
          >
          <input
            type="email"
            id="recipient"
            v-model="recipient"
            name="recipient"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div class="relative mb-4">
          <label for="message" class="leading-7 text-sm text-gray-600">Mensaje</label>
          <textarea
            id="message"
            v-model="message"
            name="message"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>

        <button
          @click="sendEmail"
          class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Enviar
        </button>
        <p class="text-xs text-gray-500 mt-3">Gracias por tus comentarios.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recipient: '', // Correo del destinatario
      message: '', // Mensaje a enviar
    };
  },
  methods: {
    async sendEmail() {
      try {
        const response = await axios.post('http://localhost:3000/send-email', {
          email: 'tucorreo@gmail.com',
          message: this.message,
          recipient: this.recipient,
        });
        alert('Correo enviado correctamente');
      } catch (error) {
        console.error('Error al enviar el correo', error);
        alert('Error al enviar el correo');
      }
    },
  },
};
</script>
