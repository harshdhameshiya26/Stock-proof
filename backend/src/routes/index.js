//Master router setup
import express from 'express';
import auditRoutes from './audits.js';
import customerRoutes from './customers.js';
import orderRoutes from './orders.js';
import productRoutes from './products.js';
import settingsRoutes from './settings.js';
import webhookRoutes from './webhooks.js';
import userRoutes from './users.js';
import billingRoutes from './billing.js';

const router = express.Router();

// Mount all application route modules
router.use('/audits', auditRoutes);
router.use('/customers', customerRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/settings', settingsRoutes);
router.use('/webhooks', webhookRoutes);
router.use('/users', userRoutes);
router.use('/billing', billingRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

export default router;