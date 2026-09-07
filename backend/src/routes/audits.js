/**
 * routes/audits.js
 *
 * Audit session lifecycle endpoints.
 * All routes require a valid Shopify session (x-store-domain + Bearer token).
 * Manager-only routes additionally require requireManager middleware.
 */

import express from 'express';
import * as auditController from '../controllers/auditController.js';
import { verifyShopifySession, requireManager, requireStaff } from '../middleware/auth.js';
import {
  validateAuditSetup,
  validateLineItemUpdate,
  validateSessionApproval,
  validateSessionRejection,
  validateItemApproval,
  validateItemRejection,
  validateSessionCancel,
} from '../middleware/validation.js';

const router = express.Router();

// All audit routes require a verified Shopify session
router.use(verifyShopifySession);

// ─── Session Lifecycle ────────────────────────────────────────────────────────

// POST /api/audits/start — Create a new audit session & snapshot baseline stock
router.post(
  '/start',
  requireStaff,
  validateAuditSetup,
  auditController.setupAudit
);

// GET /api/audits — List sessions with filters + pagination
router.get('/', auditController.getAuditHistory);

// GET /api/audits/:id — Get session details + line items + summary counts
router.get('/:id', auditController.getAuditSession);

// GET /api/audits/:id/logs — Fetch immutable event log for a session
router.get('/:id/logs', auditController.getAuditLogs);

// PATCH /api/audits/:id/pause — Pause an in-progress session
router.patch('/:id/pause', requireStaff, auditController.pauseAudit);

// PATCH /api/audits/:id/resume — Resume a paused session
router.patch('/:id/resume', requireStaff, auditController.resumeAudit);

// DELETE /api/audits/:id/cancel — Cancel a session (any non-terminal status)
router.delete(
  '/:id/cancel',
  requireStaff,
  validateSessionCancel,
  auditController.cancelAudit
);

// ─── Line Item Counting ───────────────────────────────────────────────────────

// PATCH /api/audits/:id/items/:itemId — Update actual count, reason code, or note
router.patch(
  '/:id/items/:itemId',
  requireStaff,
  validateLineItemUpdate,
  auditController.updateLineItem
);

// ─── Per-Item Approval (Manager Only) ────────────────────────────────────────

// POST /api/audits/:id/items/:itemId/approve — Manager approves a single line item
router.post(
  '/:id/items/:itemId/approve',
  requireManager,
  validateItemApproval,
  auditController.approveLineItem
);

// POST /api/audits/:id/items/:itemId/reject — Manager rejects a single line item
router.post(
  '/:id/items/:itemId/reject',
  requireManager,
  validateItemRejection,
  auditController.rejectLineItem
);

// ─── Session Submission & Approval ───────────────────────────────────────────

// POST /api/audits/:id/submit — Submit for auto-sync or manager review
router.post(
  '/:id/submit',
  requireStaff,
  auditController.submitAudit
);

// POST /api/audits/:id/approve — Manager bulk-approves session → COMPLETED + Shopify sync
router.post(
  '/:id/approve',
  requireManager,
  validateSessionApproval,
  auditController.approveAudit
);

// POST /api/audits/:id/approval-otp — send one approval OTP to the manager
router.post(
  '/:id/approval-otp',
  requireManager,
  auditController.requestApprovalOtp
);

// POST /api/audits/:id/reject — Manager rejects session → back to IN_PROGRESS
router.post(
  '/:id/reject',
  requireManager,
  validateSessionRejection,
  auditController.rejectAudit
);

export default router;