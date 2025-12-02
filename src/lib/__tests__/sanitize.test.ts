/**
 * Sanitization Utility Tests
 * 
 * Tests for frontend sanitization functions:
 * - HTML tag removal
 * - XSS script injection prevention
 * - Whitespace normalization
 * - Special character handling
 */

import { sanitizeName, sanitizeEmail, sanitizePhone, sanitizeMessage } from '../sanitize';

describe('Sanitization Functions', () => {
  describe('sanitizeName', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeName('<b>John</b> Doe')).toBe('John Doe');
    });

    it('should normalize whitespace', () => {
      expect(sanitizeName('John    Doe')).toBe('John Doe');
    });

    it('should trim whitespace', () => {
      expect(sanitizeName('  John Doe  ')).toBe('John Doe');
    });

    it('should remove script tags', () => {
      expect(sanitizeName('<script>alert("xss")</script>John')).toBe('John');
    });
  });

  describe('sanitizeEmail', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeEmail('<b>test</b>@example.com')).toBe('test@example.com');
    });

    it('should convert to lowercase', () => {
      expect(sanitizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com');
    });

    it('should trim whitespace', () => {
      expect(sanitizeEmail('  test@example.com  ')).toBe('test@example.com');
    });
  });

  describe('sanitizePhone', () => {
    it('should keep valid phone characters', () => {
      expect(sanitizePhone('+1 (555) 123-4567')).toBe('+1 (555) 123-4567');
    });

    it('should remove invalid characters', () => {
      expect(sanitizePhone('+1-555-abc-123')).toBe('+1-555-123');
    });

    it('should remove HTML tags', () => {
      expect(sanitizePhone('<b>+1234567890</b>')).toBe('+1234567890');
    });

    it('should trim whitespace', () => {
      expect(sanitizePhone('  +1234567890  ')).toBe('+1234567890');
    });
  });

  describe('sanitizeMessage', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeMessage('Hello <b>world</b>')).toBe('Hello world');
    });

    it('should remove script tags', () => {
      expect(sanitizeMessage('Hello <script>alert("xss")</script> world')).toBe('Hello  world');
    });

    it('should preserve line breaks', () => {
      const message = 'Line 1\n\nLine 2';
      expect(sanitizeMessage(message)).toContain('\n');
    });

    it('should normalize multiple spaces', () => {
      expect(sanitizeMessage('Hello    world')).toBe('Hello world');
    });

    it('should normalize multiple line breaks', () => {
      expect(sanitizeMessage('Line 1\n\n\n\nLine 2')).toBe('Line 1\n\nLine 2');
    });

    it('should trim whitespace', () => {
      expect(sanitizeMessage('  Hello world  ')).toBe('Hello world');
    });
  });
});

// Note: This test file requires a test framework like Jest or Vitest
// For Vitest (recommended for Vite projects):
// npm install --save-dev vitest @vitest/ui
// Then add to vite.config.ts and run: npm test

