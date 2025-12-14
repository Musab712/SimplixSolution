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

// Helper function to add timeout to promises
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
    ),
  ]);
};

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
    // Add connection timeout settings to prevent 2-minute hangs
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000, // 5 seconds
    socketTimeout: 10000, // 10 seconds
    // Additional timeout settings
    pool: false, // Don't use connection pooling
    maxConnections: 1,
    maxMessages: 1,
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

  // Wrap sendMail with a timeout (10 seconds total)
  try {
    await withTimeout(transporter.sendMail(mailOptions), 10000);
    console.log('✅ Email notification sent successfully');
  } catch (error) {
    console.error('❌ Email send error:', error instanceof Error ? error.message : error);
    throw error; // Re-throw so caller knows it failed
  }
};
