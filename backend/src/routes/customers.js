//Customer-related endpoints
import express from 'express';
import * as customerController from '../controllers/customerController.js';
import { verifyShopifySession } from '../middleware/auth.js';

const router = express.Router();

// Optional customer data reference endpoints
router.get('/', verifyShopifySession, customerController.getCustomers);
router.get('/:id', verifyShopifySession, customerController.getCustomerById);

export default router;