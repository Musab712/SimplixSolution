import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { ContactFormResponse } from '../types/contact.js';

/**
 * Rate limiting middleware for contact form submissions
 * Limits: 5 successful requests per 1 minute per IP address
 * Note: This should be applied AFTER validation, so only valid requests are rate limited
 */
export const contactFormRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  handler: (_req: Request, res: Response) => {
    const response: ContactFormResponse = {
      success: false,
      message: 'Too many form submissions. Please try again in 1 minute.',
    };
    res.status(429).json(response);
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Use IP address from request
  keyGenerator: (req: Request) => {
    // Try to get real IP from various headers (for proxies/load balancers)
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      (req.headers['x-real-ip'] as string) ||
      req.ip ||
      req.socket.remoteAddress ||
      'unknown'
    );
  },
});

