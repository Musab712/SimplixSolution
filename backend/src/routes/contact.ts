import { Router } from 'express';
import { submitContactForm } from '../controllers/contactController.js';
import { validateContactForm } from '../middleware/validation.js';
import { sanitizeInput } from '../middleware/sanitize.js';
import { contactFormRateLimit } from '../middleware/rateLimit.js';

const router = Router();

// Order: Validate first (to catch XSS), then rate limit (only valid requests),
// then sanitize (to clean data), then process
router.post('/submit', validateContactForm, contactFormRateLimit, sanitizeInput, submitContactForm);

export default router;
