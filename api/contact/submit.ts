import { z } from 'zod';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters').trim(),
  company: z
    .string()
    .min(2, 'Company must be at least 2 characters')
    .max(150, 'Company must be less than 150 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .max(20, 'Phone number must be less than 20 characters')
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const cleaned = val.replace(/[\s\-\(\)]/g, '');
      return /^[\+]?[0-9]{7,15}$/.test(cleaned);
    }, { message: 'Please enter a valid phone number' })
    .transform((val) => (val === '' ? undefined : val)),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim()
    .refine((val) => {
      const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
      const eventHandlerPattern = /on\w+\s*=\s*["'][^"']*["']/gi;
      return !scriptPattern.test(val) && !eventHandlerPattern.test(val);
    }, { message: 'Message contains invalid content' }),
});

const stripHtmlTags = (input: string): string => input.replace(/<[^>]*>/g, '');

const removeScripts = (input: string): string =>
  input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '');

const sanitizeString = (value: string, preserveLineBreaks = false): string => {
  let sanitized = removeScripts(stripHtmlTags(value));
  if (preserveLineBreaks) {
    sanitized = sanitized.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');
  } else {
    sanitized = sanitized.replace(/\s+/g, ' ').trim();
  }
  return sanitized.trim();
};

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)),
  ]);
};

async function sendContactNotification(payload: {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
}): Promise<void> {
  const {
    ZEPTOMAIL_HOST = 'smtp.zeptomail.com',
    ZEPTOMAIL_PORT = '587',
    ZEPTOMAIL_USER,
    ZEPTOMAIL_API_KEY,
    ZEPTOMAIL_FROM,
    ZEPTOMAIL_TO,
  } = process.env;

  // Email is optional; if not configured, silently skip.
  if (!ZEPTOMAIL_TO || !ZEPTOMAIL_USER || !ZEPTOMAIL_API_KEY) return;

  const fromAddress = ZEPTOMAIL_FROM || ZEPTOMAIL_USER;
  if (!fromAddress) return;

  const transporter = nodemailer.createTransport({
    host: ZEPTOMAIL_HOST,
    port: Number(ZEPTOMAIL_PORT),
    secure: false, // TLS via STARTTLS on 587
    auth: {
      user: ZEPTOMAIL_USER,
      pass: ZEPTOMAIL_API_KEY,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  } as any);

  await withTimeout(
    transporter.sendMail({
      from: fromAddress,
      to: ZEPTOMAIL_TO,
      replyTo: payload.email || undefined,
      subject: `New contact form submission from ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Company: ${payload.company}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone || 'N/A'}`,
        `Submitted At: ${payload.submittedAt}`,
        '',
        'Message:',
        payload.message,
      ].join('\n'),
    }),
    30000
  );
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const parsed = contactFormSchema.parse(req.body);

    const data = {
      ...parsed,
      name: sanitizeString(parsed.name),
      company: sanitizeString(parsed.company),
      email: stripHtmlTags(parsed.email.trim().toLowerCase()),
      phone: parsed.phone ? stripHtmlTags(parsed.phone.trim()).replace(/[^\d\+\s\-\(\)]/g, '') : undefined,
      message: sanitizeString(parsed.message, true),
    };

    const submittedAt = new Date().toISOString();

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return res.status(500).json({ success: false, message: 'Server misconfigured (Supabase env missing)' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error } = await supabase.from('contacts').insert({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
      submitted_at: submittedAt,
      status: 'new',
      notes: null,
    });

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to submit your message right now. Please try again later.',
      });
    }

    // In serverless, do email *before* responding so it reliably runs.
    try {
      await sendContactNotification({ ...data, submittedAt });
    } catch {
      // Email failure shouldn't fail the user — data is already saved.
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    });
  } catch (err: any) {
    // Zod error
    if (err?.issues && Array.isArray(err.issues)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err.issues.map((e: any) => ({
          field: (e.path || []).join('.'),
          message: e.message,
        })),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
}


