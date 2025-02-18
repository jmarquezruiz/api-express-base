import nodemailer from "nodemailer";
import { SMTP_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "./constants";

export async function sendMail(
  to: string,
  subject: string,
  text: string,
  html?: string,
): Promise<void> {
  try {
    // Configurar el transporter con nodemailer para Gmail
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true, // true para usar SSL/TLS con el puerto 465
      auth: {
        user: SMTP_USER, // Tu email de Gmail
        pass: SMTP_PASSWORD, // Contraseña de la aplicación generada
      },
    });

    // Enviar el correo
    const info = await transporter.sendMail({
      from: SMTP_FROM, // Dirección del remitente
      to, // Dirección del destinatario
      subject, // Asunto del correo
      text, // Texto del correo
      html, // HTML opcional
    });

    console.log("Correo enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("Error al enviar el correo");
  }
}
