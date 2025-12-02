# Testing Guide for Form Validations and Security

## Manual Testing Checklist

### 1. Frontend Max Length Validation

#### Name Field (max 100 characters)
- [ ] Enter 100 characters - should accept
- [ ] Enter 101 characters - should show error "Name must be less than 100 characters"
- [ ] HTML maxLength attribute prevents typing beyond 100

#### Email Field (max 255 characters)
- [ ] Enter valid email with 255 characters - should accept
- [ ] Enter email with 256 characters - should show error "Email must be less than 255 characters"
- [ ] HTML maxLength attribute prevents typing beyond 255

#### Phone Field (max 20 characters)
- [ ] Enter phone with 20 characters - should accept
- [ ] Enter phone with 21 characters - should show error "Phone number must be less than 20 characters"
- [ ] HTML maxLength attribute prevents typing beyond 20

#### Message Field (max 5000 characters)
- [ ] Enter message with 5000 characters - should accept
- [ ] Enter message with 5001 characters - should show error "Message must be less than 5000 characters"
- [ ] HTML maxLength attribute prevents typing beyond 5000

### 2. Phone Format Validation

#### Valid Phone Formats
- [ ] `+1234567890` - should accept
- [ ] `+1 (555) 123-4567` - should accept
- [ ] `(555) 123-4567` - should accept
- [ ] `555-123-4567` - should accept
- [ ] `5551234567` - should accept

#### Invalid Phone Formats
- [ ] `abc123` - should show error "Please enter a valid phone number"
- [ ] `123` - should show error (too short)
- [ ] `123456789012345678901` - should show error (too long)

### 3. XSS Protection Testing

#### Frontend Sanitization
Test in the form fields:

- [ ] Name: Enter `<script>alert('xss')</script>John` - should be sanitized to "John"
- [ ] Email: Enter `<b>test</b>@example.com` - should be sanitized to "test@example.com"
- [ ] Message: Enter `Hello <script>alert('xss')</script> world` - script tags should be removed

#### Backend XSS Protection
Submit forms with:

- [ ] Message with `<script>alert('xss')</script>` - should be rejected with "Message contains invalid content"
- [ ] Message with `<img onerror="alert(1)" src="x">` - should be rejected
- [ ] Message with `onclick="alert(1)"` - should be rejected

### 4. Input Sanitization

#### Whitespace Normalization
- [ ] Name: Enter `John    Doe` - should normalize to "John Doe"
- [ ] Message: Enter multiple spaces - should normalize to single spaces
- [ ] Message: Enter multiple line breaks - should normalize to max 2 consecutive line breaks

#### HTML Tag Removal
- [ ] All fields: Enter HTML tags - should be stripped
- [ ] Message: Enter `<b>bold</b>` - should become "bold"

### 5. Rate Limiting Testing

#### Test Rate Limit (5 requests per 15 minutes)
1. Submit form 5 times quickly - all should succeed
2. Submit form 6th time immediately - should get error:
   ```
   {
     "success": false,
     "message": "Too many form submissions. Please try again in 15 minutes."
   }
   ```
3. Wait 15 minutes (or modify rate limit window for testing) - should allow submission again

#### Test Different IPs
- [ ] Use different IP addresses - each should have separate rate limit counter

### 6. Edge Cases

#### Empty/Whitespace Only
- [ ] Name: Only spaces - should show "Name is required"
- [ ] Email: Only spaces - should show "Email is required"
- [ ] Message: Only spaces - should show "Message is required"
- [ ] Phone: Only spaces - should be treated as empty (optional)

#### Special Characters
- [ ] Name: Unicode characters (é, ñ, etc.) - should accept
- [ ] Email: Plus signs, dots - should accept valid email format
- [ ] Phone: International formats with + - should accept

#### Form Submission Flow
- [ ] Submit valid form - should succeed and show success toast
- [ ] Submit invalid form - should show validation errors
- [ ] Submit form with XSS attempt - should be blocked
- [ ] Submit form exceeding rate limit - should show rate limit error

## Automated Testing

### Running Tests

#### Backend Tests
```bash
cd backend
npm test
```

#### Frontend Tests (if using Vitest)
```bash
npm test
```

### Test Coverage

- **Validation Tests**: `backend/src/middleware/__tests__/validation.test.ts`
- **Rate Limit Tests**: `backend/src/middleware/__tests__/rateLimit.test.ts`
- **Sanitization Tests**: `src/lib/__tests__/sanitize.test.ts`

## Security Testing Tools

### Recommended Tools for Additional Testing

1. **OWASP ZAP** - For security vulnerability scanning
2. **Burp Suite** - For penetration testing
3. **Postman** - For API testing and rate limit verification

### Test Payloads

#### XSS Test Payloads
```
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
javascript:alert('XSS')
```

#### SQL Injection Test Payloads (should be handled by Zod validation)
```
'; DROP TABLE contacts; --
' OR '1'='1
```

## Notes

- Rate limiting uses in-memory storage (resets on server restart)
- For production, consider using Redis for rate limiting
- All validations are enforced on both frontend and backend
- Backend validation is the source of truth

