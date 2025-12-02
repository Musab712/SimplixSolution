# Backend API

This is the backend API for the Apex Automate website. It handles contact form submissions and triggers n8n workflows.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `backend/` directory (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
   - `N8N_WEBHOOK_URL`: Your n8n workflow webhook URL
   - `FRONTEND_URL`: Your frontend URL (default: http://localhost:8080)
   - `PORT`: Backend server port (default: 3000)

## Development

Run the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints

### POST `/api/contact/submit`

Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890", // optional
  "message": "Your message here"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! We will get back to you soon."
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## n8n Integration

The backend triggers an n8n webhook when a contact form is submitted. The webhook receives the following payload:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Your message here",
  "submittedAt": "2024-01-01T00:00:00.000Z"
}
```

Make sure your n8n workflow is configured to:
1. Receive POST requests at the webhook URL
2. Store the data in Supabase (or perform other actions)

## Building for Production

Build the TypeScript code:
```bash
npm run build
```

Run the production server:
```bash
npm start
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend URL for CORS configuration
- `N8N_WEBHOOK_URL`: n8n workflow webhook URL (required)

