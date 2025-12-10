import path from 'path';
import dotenv from 'dotenv';
// Load environment variables before any other imports that rely on them
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';

// Parse FRONTEND_URL to support multiple origins (comma-separated)
// Normalize: remove trailing slashes and trim whitespace
const allowedOrigins = FRONTEND_URL.split(',')
  .map(url => url.trim().replace(/\/$/, ''))
  .filter(url => url.length > 0);

// Log allowed origins on startup for debugging
console.log('🔒 Allowed CORS origins:', allowedOrigins);
console.log('📡 FRONTEND_URL from env:', FRONTEND_URL);

// CORS configuration with improved origin matching
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Log incoming origin for debugging
    console.log('🌐 Request origin:', origin || 'no origin');

    // Allow requests with no origin (health checks, Postman, mobile apps, etc.)
    if (!origin) {
      console.log('✅ Allowing request with no origin');
      return callback(null, true);
    }

    // Normalize incoming origin (remove trailing slash, lowercase for comparison)
    const normalizedOrigin = origin.replace(/\/$/, '').toLowerCase();

    // Check if origin matches any allowed origin (case-insensitive)
    const isAllowed = allowedOrigins.some(allowed => {
      const normalizedAllowed = allowed.toLowerCase();
      return normalizedAllowed === normalizedOrigin;
    });

    if (isAllowed) {
      console.log('✅ Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('❌ Origin rejected:', origin);
      console.log('   Normalized origin:', normalizedOrigin);
      console.log('   Allowed origins:', allowedOrigins);
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, // Some browsers need 200 instead of 204
  preflightContinue: false,
};

// Apply JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply CORS middleware
app.use(cors(corsOptions));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/contact', contactRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler - MUST send CORS headers even on errors
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction): void => {
  // Log minimal server-side error info without exposing stack traces to clients
  console.error('❌ Error occurred:', err.message);

  // Get the origin from the request
  const origin = req.headers.origin;
  const normalizedOrigin = origin ? origin.replace(/\/$/, '').toLowerCase() : '';

  // Check if origin is allowed (for CORS headers)
  const isOriginAllowed = !origin || allowedOrigins.some(allowed =>
    allowed.toLowerCase() === normalizedOrigin
  );

  // Always set CORS headers, even on errors
  if (isOriginAllowed && origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else {
    // If origin not allowed, still set a header to prevent browser errors
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS errors specifically
  if (err.message && err.message.includes('CORS')) {
    console.error('   CORS Error - Origin:', origin);
    console.error('   Allowed origins:', allowedOrigins);
    res.status(403).json({
      success: false,
      message: 'CORS policy violation',
      details: `Origin ${origin} is not allowed`,
    });
    return;
  }

  // Generic error response
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});
