#!/bin/bash

# Form Testing Script
# Tests the contact form API endpoint with various scenarios

API_URL="http://localhost:3000/api/contact/submit"

echo "=========================================="
echo "Contact Form API Testing"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Valid submission
echo -e "${YELLOW}Test 1: Valid form submission${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "This is a test message with enough characters to pass validation"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✓ PASSED${NC} - Status: $HTTP_CODE"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAILED${NC} - Status: $HTTP_CODE"
  echo "Response: $BODY"
fi
echo ""

# Test 2: XSS attempt
echo -e "${YELLOW}Test 2: XSS attempt (should be rejected)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "message": "Hello <script>alert(\"xss\")</script> world"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 400 ]; then
  echo -e "${GREEN}✓ PASSED${NC} - XSS blocked (Status: $HTTP_CODE)"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAILED${NC} - XSS not blocked (Status: $HTTP_CODE)"
  echo "Response: $BODY"
fi
echo ""

# Test 3: Invalid email
echo -e "${YELLOW}Test 3: Invalid email format${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email",
    "message": "This is a test message with enough characters"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 400 ]; then
  echo -e "${GREEN}✓ PASSED${NC} - Invalid email rejected (Status: $HTTP_CODE)"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAILED${NC} - Invalid email accepted (Status: $HTTP_CODE)"
  echo "Response: $BODY"
fi
echo ""

# Test 4: Invalid phone format
echo -e "${YELLOW}Test 4: Invalid phone format${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "abc123",
    "message": "This is a test message with enough characters"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 400 ]; then
  echo -e "${GREEN}✓ PASSED${NC} - Invalid phone rejected (Status: $HTTP_CODE)"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAILED${NC} - Invalid phone accepted (Status: $HTTP_CODE)"
  echo "Response: $BODY"
fi
echo ""

# Test 5: Message too short
echo -e "${YELLOW}Test 5: Message too short${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Short"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 400 ]; then
  echo -e "${GREEN}✓ PASSED${NC} - Short message rejected (Status: $HTTP_CODE)"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAILED${NC} - Short message accepted (Status: $HTTP_CODE)"
  echo "Response: $BODY"
fi
echo ""

# Test 6: Rate limiting (submit 6 times quickly)
echo -e "${YELLOW}Test 6: Rate limiting (5 requests allowed, 6th should be blocked)${NC}"
echo "Submitting 6 requests quickly..."
for i in {1..6}; do
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"Test User $i\",
      \"email\": \"test$i@example.com\",
      \"message\": \"Testing rate limit - request $i\"
    }")
  
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')
  
  if [ "$i" -le 5 ]; then
    if [ "$HTTP_CODE" -eq 200 ]; then
      echo -e "  Request $i: ${GREEN}✓${NC} Allowed (Status: $HTTP_CODE)"
    else
      echo -e "  Request $i: ${RED}✗${NC} Unexpected status: $HTTP_CODE"
    fi
  else
    if [ "$HTTP_CODE" -eq 429 ]; then
      echo -e "  Request $i: ${GREEN}✓${NC} Rate limited (Status: $HTTP_CODE) - Expected!"
      echo "  Response: $BODY"
    else
      echo -e "  Request $i: ${RED}✗${NC} Not rate limited (Status: $HTTP_CODE) - Unexpected!"
    fi
  fi
done
echo ""

# Test 7: Name too long
echo -e "${YELLOW}Test 7: Name too long (over 100 characters)${NC}"
LONG_NAME=$(printf 'A%.0s' {1..101})
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$LONG_NAME\",
    \"email\": \"john@example.com\",
    \"message\": \"This is a test message with enough characters\"
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 400 ]; then
  echo -e "${GREEN}✓ PASSED${NC} - Long name rejected (Status: $HTTP_CODE)"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAILED${NC} - Long name accepted (Status: $HTTP_CODE)"
  echo "Response: $BODY"
fi
echo ""

# Test 8: HTML tags in name (should be sanitized, not rejected)
echo -e "${YELLOW}Test 8: HTML tags in name (should be sanitized)${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<b>John</b> Doe",
    "email": "john@example.com",
    "message": "This is a test message with enough characters"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "${GREEN}✓ PASSED${NC} - HTML tags sanitized (Status: $HTTP_CODE)"
  echo "Response: $BODY"
else
  echo -e "${RED}✗ FAILED${NC} - Unexpected status: $HTTP_CODE"
  echo "Response: $BODY"
fi
echo ""

echo "=========================================="
echo "Testing Complete"
echo "=========================================="
echo ""
echo "Note: Rate limiting resets after 15 minutes"
echo "To test rate limiting again, wait 15 minutes or restart the backend server"


