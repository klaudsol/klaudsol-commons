import nodemailer from 'nodemailer';

export const createEmailTransporter = async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.KS_SES_HOST,
    port: 587, // Use the appropriate port for your email provider (STARTTLS Port: 25, 587 or 2587) | TLS Wrapper Port 465 or 2465
    secure: false, // Set to true if using a secure connection (e.g., port 465)
    auth: {
      user: process.env.KS_SES_ACCESS_KEY_ID,
      pass: process.env.KS_SES_SECRET_ACCESS_KEY,
      },
  });

  return transporter;
}

export const sendEmail = async (subject, html, replyToAddress, fromAddress, toAddress) => {
  try {
    const transporter = await createEmailTransporter();
    const params = {
      from: fromAddress ?? process.env.KS_SES_MAIL_SENDER,
      to: toAddress ?? process.env.KS_SES_INQUIRY_RECEIVER,
      subject: subject,
      html: html, 
      replyTo: replyToAddress
    }
    const receiverEmail = await transporter.sendMail(params);
  } catch (err) {
    throw new Error(err);
  }
}