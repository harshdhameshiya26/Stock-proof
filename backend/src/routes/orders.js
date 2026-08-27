//Order endpoints
import express from 'express';
import * as orderController from '../controllers/orderController.js';
import { verifyShopifySession } from '../middleware/auth.js';

const router = express.Router();

// Reference active orders during inventory audit calculations
router.get('/', verifyShopifySession, orderController.getActiveOrders);

export default router;