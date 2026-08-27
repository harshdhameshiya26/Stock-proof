// Audit session lifecycle (setup, review, submission, approval)
import express from 'express';
import * as auditController from '../controllers/auditController.js';
import { verifyShopifySession, requireManager } from '../middleware/auth.js';
import { validateAuditSetup } from '../middleware/validation.js';

const router = express.Router();

// POST /api/audits/start — Create a new audit session & snapshot baseline stock
router.post('/start', verifyShopifySession, validateAuditSetup, auditController.setupAudit);

// GET /api/audits — Fetch all historical audit logs
router.get('/', verifyShopifySession, auditController.getAuditHistory);

// GET /api/audits/:id — Get details/status of a specific audit session
router.get('/:id', verifyShopifySession, auditController.getAuditSession);

// PATCH /api/audits/:id/items/:itemId — Update a line item count or reason tag
router.patch('/:id/items/:itemId', verifyShopifySession, auditController.updateLineItem);

// POST /api/audits/:id/submit — Submit audit for auto-sync or manager review
router.post('/:id/submit', verifyShopifySession, auditController.submitAudit);

// POST /api/audits/:id/approve — Manager approval for audits exceeding thresholds
router.post('/:id/approve', verifyShopifySession, requireManager, auditController.approveAudit);

export default router;