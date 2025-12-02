/**
 * Sanitization utilities for form inputs
 * Removes HTML tags, normalizes whitespace, and prevents XSS attacks
 */

/**
 * Removes HTML tags from a string
 */
const stripHtmlTags = (input: string): string => {
  return input.replace(/<[^>]*>/g, '');
};

/**
 * Normalizes whitespace (multiple spaces/tabs/newlines to single space)
 * Preserves line breaks for messages
 */
const normalizeWhitespace = (input: string, preserveLineBreaks = false): string => {
  if (preserveLineBreaks) {
    // Replace multiple spaces/tabs with single space, but keep newlines
    return input.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');
  }
  // Replace all whitespace with single space
  return input.replace(/\s+/g, ' ');
};

/**
 * Sanitizes name input
 * - Trims whitespace
 * - Removes HTML tags
 * - Normalizes whitespace
 */
export const sanitizeName = (input: string): string => {
  return normalizeWhitespace(stripHtmlTags(input.trim()));
};

/**
 * Sanitizes email input
 * - Trims whitespace
 * - Removes HTML tags
 * - Converts to lowercase
 */
export const sanitizeEmail = (input: string): string => {
  return stripHtmlTags(input.trim().toLowerCase());
};

/**
 * Sanitizes phone input
 * - Trims whitespace
 * - Removes HTML tags
 * - Keeps only digits, +, spaces, dashes, parentheses
 */
export const sanitizePhone = (input: string): string => {
  const cleaned = stripHtmlTags(input.trim());
  // Keep only valid phone characters: digits, +, spaces, dashes, parentheses
  return cleaned.replace(/[^\d\+\s\-\(\)]/g, '');
};

/**
 * Sanitizes message input
 * - Trims whitespace
 * - Removes HTML tags (prevents XSS)
 * - Normalizes whitespace but preserves line breaks
 * - Less aggressive to preserve user intent
 */
export const sanitizeMessage = (input: string): string => {
  const stripped = stripHtmlTags(input.trim());
  return normalizeWhitespace(stripped, true);
};

