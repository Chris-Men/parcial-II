import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar el envío de correos
app.post('/send-email', async (req, res) => {
  const { email, message, recipient } = req.body; //  incluir 'recipient'

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'diegohs889@gmail.com', // correo
      pass: 'kijl npez kyla racq', //  contraseña de aplicación
    },
  });

  const mailOptions = {
    from: email, // Correo desde el cual se envía
    to: recipient, // Correo de destino ingresado en el formulario
    subject: 'Nuevo mensaje de contacto',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo.' });
  }
});

// Ruta GET para la raíz ('/')
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente. Usa /send-email para enviar correos.');
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
