import nodemailer from 'nodemailer';

const {
  ZEPTOMAIL_HOST = 'smtp.zeptomail.com',
  ZEPTOMAIL_PORT = '587',
  ZEPTOMAIL_USER,
  ZEPTOMAIL_API_KEY,
  ZEPTOMAIL_FROM,
  ZEPTOMAIL_TO,
} = process.env;

export interface EmailPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
}

export const sendContactNotification = async (payload: EmailPayload): Promise<void> => {
  if (!ZEPTOMAIL_TO || !ZEPTOMAIL_USER || !ZEPTOMAIL_API_KEY) {
    console.warn('ZeptoMail not fully configured; skipping email send.');
    return;
  }

  const fromAddress = ZEPTOMAIL_FROM || ZEPTOMAIL_USER;
  if (!fromAddress) {
    console.warn('ZEPTOMAIL_FROM/ZEPTOMAIL_USER not configured; skipping email send.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: ZEPTOMAIL_HOST,
    port: Number(ZEPTOMAIL_PORT),
    secure: false, // ZeptoMail uses TLS on 587 via STARTTLS
    auth: {
      user: ZEPTOMAIL_USER,
      pass: ZEPTOMAIL_API_KEY,
    },
  });

  const mailOptions = {
    from: fromAddress,
    to: ZEPTOMAIL_TO,
    replyTo: payload.email || undefined,
    subject: `New contact form submission from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || 'N/A'}`,
      `Submitted At: ${payload.submittedAt}`,
      '',
      'Message:',
      payload.message,
    ].join('\n'),
  };

  await transporter.sendMail(mailOptions);
};
