/**
 * server.js
 *
 * StockProof Express application entry point.
 *
 * Boot order:
 *  1. Load env vars
 *  2. Register raw-body capture middleware (BEFORE express.json)
 *  3. Mount webhook routes (raw body required for HMAC verification)
 *  4. Register express.json (for all other routes)
 *  5. Mount API routes
 *  6. Error handlers
 *  7. Connect to MongoDB → start server
 */

import express  from 'express';
import mongoose from 'mongoose';
import dotenv   from 'dotenv';
dotenv.config();

import apiRoutes     from './src/routes/index.js';
import webhookRoutes from './src/routes/webhooks.js';
import { verifySmtpConnection } from './src/controllers/userController.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';
import logger from './src/utils/logger.js';

const app = express();

// ── 1. Body Parsers & Raw Body Capture ──────────────────────────────────────────
//
// We use express.json() for all routes. To support Shopify webhook HMAC
// verification, we use the `verify` callback to save the raw, unmodified
// request body to `req.rawBody` before it is parsed into JSON.
app.use(
  express.json({
    limit: '10mb',
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── 2. Webhook Routes ─────────────────────────────────────────────────────────
// Webhooks can now use req.rawBody (populated by express.json above) for HMAC.
app.use('/api/webhooks', webhookRoutes);

// ── 4. CORS ───────────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  const allowedOrigins = (process.env.FRONTEND_URL || '*').split(',').map((o) => o.trim());
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (allowedOrigins.includes('*')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods',  'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers',  'Content-Type, Authorization, x-store-domain, x-staff-id');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ── 5. Request Logging ────────────────────────────────────────────────────────
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => logger.http(req, res.statusCode, Date.now() - start));
  next();
});

// ── 6. API Routes ─────────────────────────────────────────────────────────────
app.use('/api', apiRoutes);

// ── 7. Error Handlers ─────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── 8. Database Connection & Server Start ────────────────────────────────────
const PORT = parseInt(process.env.PORT || '4000', 10);

const connectAndStart = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS:          45_000,
    });
    logger.info(`🚀 MongoDB connected`);

    const smtpStatus = await verifySmtpConnection();
    if (smtpStatus.connected) {
      logger.info(`📧 SMTP connected `);
    } else if (smtpStatus.configured) {
      logger.error(`❌ SMTP connection failed: ${smtpStatus.reason}`);
    } else {
      logger.warn(`⚠️ SMTP not configured: ${smtpStatus.reason}`);
    }

    app.listen(PORT, () => {
      logger.info(`🌐 Server running on port ${PORT} `);
    });
  } catch (err) {
    logger.error('❌ MongoDB connection failed', { message: err.message });
    process.exit(1);
  }
};

connectAndStart();

// ── 9. Graceful Shutdown ──────────────────────────────────────────────────────
const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received — shutting down gracefully`);
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    logger.error('Error during shutdown', { message: err.message });
    process.exit(1);
  }
};

process.on('SIGINT',  () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Surface unhandled promise rejections so they aren't silently swallowed
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection', { reason: String(reason) });
});

export default app;