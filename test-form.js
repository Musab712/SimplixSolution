/**
 * Node.js Form Testing Script
 * Alternative to bash script - can be run with: node test-form.js
 */

const API_URL = 'http://localhost:3000/api/contact/submit';

const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m',
};

async function testForm() {
    console.log('==========================================');
    console.log('Contact Form API Testing');
    console.log('==========================================\n');

    // Test 1: Valid submission
    console.log(`${colors.yellow}Test 1: Valid form submission${colors.reset}`);
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1234567890',
                message: 'This is a test message with enough characters to pass validation',
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log(`${colors.green}✓ PASSED${colors.reset} - Status: ${response.status}`);
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.log(`${colors.red}✗ FAILED${colors.reset} - Status: ${response.status}`);
            console.log('Response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.log(`${colors.red}✗ ERROR${colors.reset}:`, error.message);
    }
    console.log('');

    // Test 2: XSS attempt
    console.log(`${colors.yellow}Test 2: XSS attempt (should be rejected)${colors.reset}`);
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'John',
                email: 'john@example.com',
                message: 'Hello <script>alert("xss")</script> world',
            }),
        });
        const data = await response.json();
        if (response.status === 400) {
            console.log(`${colors.green}✓ PASSED${colors.reset} - XSS blocked (Status: ${response.status})`);
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.log(`${colors.red}✗ FAILED${colors.reset} - XSS not blocked (Status: ${response.status})`);
            console.log('Response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.log(`${colors.red}✗ ERROR${colors.reset}:`, error.message);
    }
    console.log('');

    // Test 3: Invalid email
    console.log(`${colors.yellow}Test 3: Invalid email format${colors.reset}`);
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'John Doe',
                email: 'invalid-email',
                message: 'This is a test message with enough characters',
            }),
        });
        const data = await response.json();
        if (response.status === 400) {
            console.log(`${colors.green}✓ PASSED${colors.reset} - Invalid email rejected (Status: ${response.status})`);
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.log(`${colors.red}✗ FAILED${colors.reset} - Invalid email accepted (Status: ${response.status})`);
            console.log('Response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.log(`${colors.red}✗ ERROR${colors.reset}:`, error.message);
    }
    console.log('');

    // Test 4: Invalid phone
    console.log(`${colors.yellow}Test 4: Invalid phone format${colors.reset}`);
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'John Doe',
                email: 'john@example.com',
                phone: 'abc123',
                message: 'This is a test message with enough characters',
            }),
        });
        const data = await response.json();
        if (response.status === 400) {
            console.log(`${colors.green}✓ PASSED${colors.reset} - Invalid phone rejected (Status: ${response.status})`);
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.log(`${colors.red}✗ FAILED${colors.reset} - Invalid phone accepted (Status: ${response.status})`);
            console.log('Response:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.log(`${colors.red}✗ ERROR${colors.reset}:`, error.message);
    }
    console.log('');

    // Test 5: Rate limiting
    console.log(`${colors.yellow}Test 5: Rate limiting (5 requests allowed, 6th should be blocked)${colors.reset}`);
    console.log('Submitting 6 requests quickly...\n');

    for (let i = 1; i <= 6; i++) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `Test User ${i}`,
                    email: `test${i}@example.com`,
                    message: `Testing rate limit - request ${i}`,
                }),
            });
            const data = await response.json();

            if (i <= 5) {
                if (response.ok) {
                    console.log(`  Request ${i}: ${colors.green}✓${colors.reset} Allowed (Status: ${response.status})`);
                } else {
                    console.log(`  Request ${i}: ${colors.red}✗${colors.reset} Unexpected status: ${response.status}`);
                }
            } else {
                if (response.status === 429) {
                    console.log(`  Request ${i}: ${colors.green}✓${colors.reset} Rate limited (Status: ${response.status}) - Expected!`);
                    console.log('  Response:', JSON.stringify(data, null, 2));
                } else {
                    console.log(`  Request ${i}: ${colors.red}✗${colors.reset} Not rate limited (Status: ${response.status}) - Unexpected!`);
                }
            }
        } catch (error) {
            console.log(`  Request ${i}: ${colors.red}✗ ERROR${colors.reset}:`, error.message);
        }
    }
    console.log('');

    console.log('==========================================');
    console.log('Testing Complete');
    console.log('==========================================');
    console.log('\nNote: Rate limiting resets after 15 minutes');
    console.log('To test rate limiting again, wait 15 minutes or restart the backend server');
}

// Run tests
testForm().catch(console.error);

