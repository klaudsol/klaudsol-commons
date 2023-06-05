import nodemailer from 'nodemailer';

export const createEmailTransporter = async (host, user, pass) => {
  const transporter = nodemailer.createTransport({
    host: host ?? process.env.KS_SES_HOST,
    port: 587, // Use the appropriate port for your email provider (STARTTLS Port: 25, 587 or 2587) | TLS Wrapper Port 465 or 2465
    secure: false, // Set to true if using a secure connection (e.g., port 465)
    auth: {
      user: user ?? process.env.KS_SES_ACCESS_KEY_ID,
      pass: pass ?? process.env.KS_SES_SECRET_ACCESS_KEY,
      },
  });

  return transporter;
}