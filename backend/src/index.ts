import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';

// Health check endpoint - MUST be registered before any middleware
// This ensures it's accessible without CORS restrictions
app.get('/api/health', (_req, res) => {
  // Set permissive CORS headers manually for health checks
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Handle OPTIONS preflight for health endpoint - also before any middleware
app.options('/api/health', (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

// Parse FRONTEND_URL to support multiple origins (comma-separated)
const allowedOrigins = FRONTEND_URL.split(',').map(url => url.trim());

// Add Railway and common monitoring origins to allowed list for production
if (process.env.NODE_ENV === 'production') {
  // Allow Railway's internal health checks and common monitoring services
  allowedOrigins.push('https://railway.app', 'https://*.railway.app');
}

// CORS configuration with support for multiple origins
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Always allow requests with no origin (like mobile apps, Postman, health checks, monitoring tools, etc.)
    // This is necessary for health checks and monitoring services
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Log the rejected origin for debugging
      console.log('CORS rejected origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply JSON parsing middleware first (needed for all routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply CORS middleware with health endpoint exclusion
// This middleware runs for all requests, but we check the path first
app.use((req, res, next) => {
  // Completely skip CORS for health endpoint - check multiple path variations
  const isHealthEndpoint = req.path === '/api/health' || 
                          req.path === '/health' ||
                          req.url === '/api/health' || 
                          req.url === '/health' ||
                          req.originalUrl === '/api/health' ||
                          req.originalUrl?.startsWith('/api/health');
  
  if (isHealthEndpoint) {
    // Set permissive headers for health checks
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    // If it's an OPTIONS request, respond immediately
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    
    // Continue to next middleware/route handler
    return next();
  }
  
  // Apply CORS for all other routes
  return cors(corsOptions)(req, res, next);
});

// API Routes
// Note: Rate limiting is applied in the route AFTER validation
// This ensures only valid requests are rate limited
app.use('/api/contact', contactRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction): void => {
  console.error('Unhandled error:', err);
  console.error('Error message:', err.message);
  console.error('Error stack:', err.stack);
  
  // Handle CORS errors specifically
  if (err.message && err.message.includes('CORS')) {
    res.status(403).json({
      success: false,
      message: 'CORS policy violation',
    });
    return;
  }
  
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
