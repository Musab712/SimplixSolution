import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ContactFormResponse } from '../types/contact.js';

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
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
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true;
        // Remove spaces, dashes, parentheses for validation
        const cleaned = val.replace(/[\s\-\(\)]/g, '');
        // International phone format: 7-15 digits, optionally starting with +
        return /^[\+]?[0-9]{7,15}$/.test(cleaned);
      },
      { message: 'Please enter a valid phone number' }
    )
    .transform((val) => (val === '' ? undefined : val)),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim()
    .refine(
      (val) => {
        // XSS protection: reject if contains script tags or event handlers
        const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        const eventHandlerPattern = /on\w+\s*=\s*["'][^"']*["']/gi;
        return !scriptPattern.test(val) && !eventHandlerPattern.test(val);
      },
      { message: 'Message contains invalid content' }
    ),
});

export const validateContactForm = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const validatedData = contactFormSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response: ContactFormResponse = {
        success: false,
        message: 'Validation failed',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
      res.status(400).json(response);
      return;
    }
    next(error);
  }
};
