// Validates Shopify session tokens, JWT-based user auth, and role-based access control

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Shop from '../models/Shop.js';
import logger from '../utils/logger.js';
import { AppError } from '../utils/helpers.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'stock-proof-dev-secret';
const revokedTokens = new Set();

export { revokedTokens };

// ── 1. JWT User Authentication ───────────────────────────────────────────────

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Unauthorized: Missing or malformed Authorization header. Expected: Bearer <token>', 401);
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      throw new AppError('Unauthorized: JWT token is required', 401);
    }

    if (revokedTokens.has(token)) {
      throw new AppError('Unauthorized: Token has been revoked', 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.sub || decoded.userId)
      .select('name email role shopId lastLoginAt lastLogoutAt jwtToken isEmailVerified')
      .lean();

    if (!user) {
      throw new AppError('Unauthorized: User not found for this token', 401);
    }

    if (user.jwtToken && user.jwtToken !== token) {
      throw new AppError('Unauthorized: Token mismatch', 401);
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Unauthorized: Token has expired', 401));
    }

    if (err.isOperational) return next(err);
    logger.error('[Auth] authenticateUser error', { message: err.message });
    next(new AppError('Unauthorized: Invalid or expired token', 401));
  }
};

// Allows a recently logged-out user to complete account deletion with the same
// JWT. The token remains blocked for every other authenticated endpoint.
export const authenticateUserForDeletion = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Unauthorized: Missing or malformed Authorization header. Expected: Bearer <token>', 401);
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.sub || decoded.userId)
      .select('name email role shopId lastLoginAt lastLogoutAt jwtToken isEmailVerified')
      .lean();

    if (!user) throw new AppError('Unauthorized: User not found for this token', 401);

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Unauthorized: Token has expired', 401));
    }
    if (err.isOperational) return next(err);
    next(new AppError('Unauthorized: Invalid or expired token', 401));
  }
};

// ── 2. Shopify Session Guard ──────────────────────────────────────────────────

/**
 * verifyShopifySession
 *
 * In production this would decode the Shopify App Bridge JWT (session token)
 * to extract the shop domain and validate it is a legitimate Shopify session.
 *
 * For development / Postman testing:
 *   Pass  Authorization: Bearer <any-string>
 *         x-store-domain: yourshop.myshopify.com
 *
 * Attaches to req:
 *   req.storeDomain  — validated shop domain string
 *   req.shop         — Shop document from DB (lean)
 */
export const verifyShopifySession = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const storeDomain = (req.headers['x-store-domain'] || '').trim().toLowerCase();

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Unauthorized: Missing or malformed Authorization header. Expected: Bearer <token>', 401);
    }
    if (!storeDomain) {
      throw new AppError('Unauthorized: Missing x-store-domain header', 401);
    }

    // ── Production path (uncomment when Shopify App Bridge JWT is configured) ──
    //
    // const token = authHeader.split(' ')[1];
    // const { payload } = await shopifyApp.api.session.decodeSessionToken(token);
    // const verifiedDomain = payload.dest.replace('https://', '');
    // if (verifiedDomain !== storeDomain) {
    //   throw new AppError('Unauthorized: Session token domain mismatch', 401);
    // }

    // Verify shop exists and is active
    const shop = await Shop.findOne({ shopifyDomain: storeDomain, isActive: true })
      .select('-accessToken')
      .lean();

    if (!shop) {
      throw new AppError(`Unauthorized: Shop '${storeDomain}' not found or app is not installed`, 401);
    }

    req.storeDomain = storeDomain;
    req.shop = shop;
    next();
  } catch (err) {
    if (err.isOperational) return next(err);
    logger.error('[Auth] verifyShopifySession error', { message: err.message });
    next(new AppError('Authentication failed', 401));
  }
};

// ── 3. Role-Based Access Control ──────────────────────────────────────────────

/**
 * requireRole — factory that returns a middleware enforcing the given roles.
 *
 * Reads staff identity from:
 *   1. req.headers['x-staff-id']  (Postman / App Bridge embedded header)
 *   2. req.body.staffId           (fallback for some endpoints)
 *
 * Attaches to req:
 *   req.user — User document (lean)
 */
export const requireRole = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const staffId =
        req.headers['x-staff-id'] ||
        req.body?.staffId ||
        req.query?.staffId;

      if (!staffId) {
        throw new AppError(
          'Forbidden: Staff identity header (x-staff-id) is required for this action',
          403
        );
      }

      const shopId = req.shop?._id;
      const staff = await User.findOne({ _id: staffId, shopId })
        .select('name email role shopId')
        .lean();

      if (!staff) {
        throw new AppError('Forbidden: Staff account does not belong to this store', 403);
      }

      if (!allowedRoles.includes(staff.role)) {
        throw new AppError(
          `Forbidden: This action requires ${allowedRoles.join(' or ')} role. ` +
          `Your role is: ${staff.role}`,
          403
        );
      }

      req.user = staff;
      next();
    } catch (err) {
      if (err.isOperational) return next(err);
      logger.error('[Auth] requireRole error', { message: err.message });
      next(new AppError('Authorization check failed', 403));
    }
  };
};

// ── 4. Convenience Role Guards ────────────────────────────────────────────────

/** Requires MANAGER or ADMIN role */
export const requireManager = requireRole(['MANAGER', 'ADMIN']);

/** Requires any authenticated staff (STAFF, MANAGER, or ADMIN) */
export const requireStaff = requireRole(['STAFF', 'MANAGER', 'ADMIN']);