# Backend API

This is the backend API for the Apex Automate website. It handles contact form submissions and can be extended to forward leads to email, CRM, or other services.

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

