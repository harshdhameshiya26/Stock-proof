//Threshold rules & reason tag settings endpoints
import express from 'express';
import * as settingsController from '../controllers/settingsController.js';
import { verifyShopifySession, requireManager } from '../middleware/auth.js';
import { validateSettingsUpdate } from '../middleware/validation.js';

const router = express.Router();

// GET /api/settings/:storeId — Retrieve store variance threshold limits & reason tags
router.get('/:storeId', verifyShopifySession, settingsController.getSettings);

// PUT /api/settings/:storeId — Update threshold limits and reason tags (Manager only)
router.put('/:storeId', verifyShopifySession, requireManager, validateSettingsUpdate, settingsController.updateSettings);

export default router;