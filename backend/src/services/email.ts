import nodemailer from 'nodemailer';

const {
  ZEPTOMAIL_HOST = 'smtp.zeptomail.com',
  ZEPTOMAIL_PORT = '465',
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
    // Add connection timeout settings
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 30000, // 30 seconds
    // Debug logging
    logger: true,
    debug: true,
    // Additional settings
    pool: false,
    maxConnections: 1,
    maxMessages: 1,
  } as any);

  console.log(`Attempting to send email via ${ZEPTOMAIL_HOST}:${ZEPTOMAIL_PORT} as ${ZEPTOMAIL_USER}...`);

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

  // Wrap sendMail with a timeout (30 seconds total)
  try {
    await withTimeout(transporter.sendMail(mailOptions), 30000);
    console.log('✅ Email notification sent successfully');
  } catch (error) {
    console.error('❌ Email send error:', error instanceof Error ? error.message : error);
    // Log full error details for debugging
    console.error('Full error details:', JSON.stringify(error, null, 2));
    throw error;
  }
};