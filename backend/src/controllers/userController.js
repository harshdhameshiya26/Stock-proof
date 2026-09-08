/**
 * controllers/userController.js
 *
 * User authentication flow and staff/account management.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import User from '../models/User.js';
import Shop from '../models/Shop.js';
import PendingUserRegistration from '../models/PendingUserRegistration.js';
import { revokedTokens } from '../middleware/auth.js';
import { AppError } from '../utils/helpers.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'stock-proof-dev-secret';

// ── Session Blacklist (in-memory for dev; replace with Redis in production) ────
// Stores { userId: loggedOutAt } pairs to invalidate active sessions.
const loggedOutUsers = new Map();
export { loggedOutUsers };

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  shopId: user.shopId || null,
  isEmailVerified: user.isEmailVerified || false,
  lastLoginAt: user.lastLoginAt || null,
  lastLogoutAt: user.lastLogoutAt || null,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const signToken = (user) => jwt.sign(
  {
    sub: user._id.toString(),
    email: user.email,
    role: user.role,
    jti: randomUUID(),
  },
  JWT_SECRET,
  { expiresIn: '7d' }
);

const createOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const createTransporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465,
  auth:
    process.env.SMTP_USER && process.env.SMTP_PASS
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  tls: {
    rejectUnauthorized: false,
  },
});

export const verifySmtpConnection = async () => {
  const hasSmtpConfig = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  if (!hasSmtpConfig) {
    return { connected: false, configured: false, reason: 'SMTP configuration missing' };
  }

  try {
    await createTransporter().verify();
    return { connected: true, configured: true };
  } catch (error) {
    return {
      connected: false,
      configured: true,
      reason: error.message || 'SMTP connection failed',
    };
  }
};

export const sendOtpEmail = async (email, otp) => {
  const hasSmtpConfig = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  if (!hasSmtpConfig) {
    return { skipped: true, reason: 'SMTP configuration missing' };
  }

  try {
    const transporter = createTransporter();
    const mailInfo = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'StockProof Email Verification OTP',
      text: `Your StockProof verification code is: ${otp}. It expires in 10 minutes.`,
      html: `<p>Your StockProof verification code is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
    });

    return { skipped: false, messageId: mailInfo.messageId };
  } catch (error) {
    return {
      skipped: true,
      reason: error.message || 'SMTP send failed',
      error,
    };
  }
};

// ── Register User ─────────────────────────────────────────────────────────────

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, shopId } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      throw new AppError('Name is required and must be at least 2 characters long', 400);
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new AppError('A valid email is required', 400);
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      throw new AppError('Password is required and must be at least 8 characters long', 400);
    }

    const normalizedEmail = email.toLowerCase().trim();
    const [existingUser, pendingRegistration] = await Promise.all([
      User.findOne({ email: normalizedEmail }).lean(),
      PendingUserRegistration.findOne({ email: normalizedEmail }).lean(),
    ]);
    if (existingUser) {
      throw new AppError(`User with email '${normalizedEmail}' already exists`, 409);
    }
    if (pendingRegistration) {
      throw new AppError('Registration is already pending OTP verification', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otpCode = createOtp();
    let registrationShopId = null;

    if (shopId) {
      if (mongoose.isValidObjectId(shopId)) {
        const shop = await Shop.findById(shopId).select('_id').lean();
        if (!shop) throw new AppError(`Shop not found: ${shopId}`, 404);
        registrationShopId = shop._id;
      } else {
        const shop = await Shop.findOne({
          shopifyDomain: shopId.toLowerCase().trim(),
          isActive: true,
        }).select('_id').lean();
        if (!shop) throw new AppError(`Active shop not found: ${shopId}`, 404);
        registrationShopId = shop._id;
      }
    }

    const pending = await PendingUserRegistration.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      otp: otpCode,
      otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      isEmailVerified: false,
      role: role || 'STAFF',
      shopId: registrationShopId,
    });

    const emailResult = await sendOtpEmail(normalizedEmail, otpCode);

    const response = {
      message: 'User registered successfully. Please verify your email using the OTP sent to your inbox.',
      registrationId: pending._id,
      email: pending.email,
      otpSent: !emailResult.skipped,
    };

    if (process.env.NODE_ENV !== 'production' && emailResult.skipped) {
      response.devOtp = otpCode;
      response.smtpNote = emailResult.reason || 'SMTP unavailable; using dev OTP for testing';
    }

    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export const verifyUserOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new AppError('A valid email is required', 400);
    }

    if (!otp || typeof otp !== 'string' || otp.trim().length !== 6) {
      throw new AppError('A valid 6-digit OTP is required', 400);
    }

    const normalizedEmail = email.toLowerCase().trim();
    const pending = await PendingUserRegistration.findOne({ email: normalizedEmail })
      .select('+password +otp');

    if (!pending) {
      throw new AppError('Pending registration not found. Please register again.', 404);
    }

    if (!pending.otp || !pending.otpExpiresAt || new Date(pending.otpExpiresAt).getTime() < Date.now()) {
      throw new AppError('OTP has expired. Please register again to receive a new one', 401);
    }

    if (pending.otp !== otp.trim()) {
      throw new AppError('Invalid OTP', 401);
    }

    const existingUser = await User.findOne({ email: normalizedEmail }).lean();
    if (existingUser) throw new AppError(`User with email '${normalizedEmail}' already exists`, 409);

    const user = await User.create({
      name: pending.name,
      email: pending.email,
      password: pending.password,
      role: pending.role,
      shopId: pending.shopId,
      isEmailVerified: true,
    });
    const token = signToken(user);
    user.jwtToken = token;
    user.lastLoginAt = new Date();
    await user.save();
    await PendingUserRegistration.findByIdAndDelete(pending._id);

    return res.status(200).json({
      message: 'OTP verified successfully',
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

// ── Login User ────────────────────────────────────────────────────────────────

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new AppError('A valid email is required', 400);
    }

    if (!password || typeof password !== 'string') {
      throw new AppError('Password is required', 400);
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password +jwtToken');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || '');
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    if (!user.isEmailVerified) {
      throw new AppError('Email is not verified. Please verify the OTP first.', 403);
    }

    if (user.jwtToken) revokedTokens.add(user.jwtToken);
    const token = signToken(user);
    user.jwtToken = token;

    user.lastLoginAt = new Date();
    await user.save();

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user) throw new AppError('User not found', 404);
    return res.status(200).json({ user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
};

export const updateCurrentUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (role !== undefined) throw new AppError('Role can only be changed by a manager or administrator', 403);

    const user = await User.findById(req.user._id).select('+password +jwtToken');
    if (!user) throw new AppError('User not found', 404);

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length < 2) {
        throw new AppError('Name must be at least 2 characters long', 400);
      }
      user.name = name.trim();
    }

    let tokenNeedsRefresh = false;
    if (email !== undefined) {
      if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new AppError('A valid email is required', 400);
      }
      const normalizedEmail = email.toLowerCase().trim();
      const emailInUse = await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } }).lean();
      if (emailInUse) throw new AppError(`User with email '${normalizedEmail}' already exists`, 409);
      user.email = normalizedEmail;
      tokenNeedsRefresh = true;
    }

    if (password !== undefined) {
      if (typeof password !== 'string' || password.length < 8) {
        throw new AppError('Password must be at least 8 characters long', 400);
      }
      user.password = await bcrypt.hash(password, 12);
    }

    if (tokenNeedsRefresh) {
      if (user.jwtToken) revokedTokens.add(user.jwtToken);
      user.jwtToken = signToken(user);
    }

    await user.save();
    return res.status(200).json({
      message: 'Profile updated successfully',
      ...(tokenNeedsRefresh ? { token: user.jwtToken } : {}),
      user: sanitizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

// ── Create User ───────────────────────────────────────────────────────────────

/**
 * POST /api/users
 * Body: { name, email, role, shopId, password }
 */
export const createUser = async (req, res, next) => {
  try {
    const { name, email, role, shopId, password } = req.body;

    let shopObjectId = null;
    if (shopId) {
      if (mongoose.isValidObjectId(shopId)) {
        const shop = await Shop.findById(shopId).select('_id').lean();
        if (!shop) throw new AppError(`Shop not found: ${shopId}`, 404);
        shopObjectId = shop._id;
      } else {
        let shop = await Shop.findOne({ shopifyDomain: shopId }).select('_id').lean();
        if (!shop) {
          shop = await Shop.create({
            shopifyDomain: shopId,
            accessToken: req.body.accessToken || 'dev_token',
            isActive: req.body.isActive !== false,
          });
        }
        shopObjectId = shop._id;
      }
    }

    const normalizedEmail = (email || '').toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail }).select('_id name email role shopId').lean();
    if (existing) {
      if (existing.shopId?.toString() === shopObjectId?.toString()) {
        throw new AppError(`A user with email '${normalizedEmail}' is already a member of this store`, 409);
      }

      if (!existing.shopId && shopObjectId) {
        const linkedUser = await User.findByIdAndUpdate(
          existing._id,
          {
            $set: {
              shopId: shopObjectId,
              name: (name || existing.name).trim(),
              role: role || existing.role || 'STAFF',
            },
          },
          { new: true, runValidators: true }
        );

        return res.status(200).json({
          message: 'Existing user added to this store successfully',
          userId: linkedUser._id,
          user: sanitizeUser(linkedUser),
        });
      }

      throw new AppError(`A user with email '${normalizedEmail}' belongs to another store`, 409);
    }

    const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;
    const user = await User.create({
      name: (name || '').trim(),
      email: normalizedEmail,
      role: role || 'STAFF',
      shopId: shopObjectId,
      ...(hashedPassword ? { password: hashedPassword } : {}),
    });

    return res.status(201).json({
      message: 'User created successfully',
      userId: user._id,
      user: sanitizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

// ── Get All Users (for a store) ───────────────────────────────────────────────

/**
 * GET /api/users
 * Query params: shopId (optional — if omitted, all users returned for admins)
 */
export const getUsers = async (req, res, next) => {
  try {
    const { shopId } = req.query;
    const filter = req.shop?._id ? { shopId: req.shop._id } : {};

    if (shopId) {
      if (mongoose.isValidObjectId(shopId)) {
        filter.shopId = shopId;
      } else {
        const shop = await Shop.findOne({ shopifyDomain: shopId }).select('_id').lean();
        filter.shopId = shop?._id || null;
      }
    }

    const users = await User.find(filter)
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ count: users.length, users });
  } catch (err) {
    next(err);
  }
};

// ── Get Single User ───────────────────────────────────────────────────────────

/**
 * GET /api/users/:id
 */
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new AppError('Invalid user ID', 400);

    const user = await User.findById(id).select('-__v').lean();
    if (!user) throw new AppError('User not found', 404);

    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

// ── Update User Role ──────────────────────────────────────────────────────────

/**
 * PATCH /api/users/:id
 * Body: { role }
 */
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!mongoose.isValidObjectId(id)) throw new AppError('Invalid user ID', 400);

    const VALID_ROLES = ['STAFF', 'MANAGER', 'ADMIN'];
    if (!role || !VALID_ROLES.includes(role)) {
      throw new AppError(`'role' must be one of: ${VALID_ROLES.join(', ')}`, 400);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: { role } },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!user) throw new AppError('User not found', 404);

    return res.status(200).json({
      message: 'User role updated',
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

// ── Logout User ───────────────────────────────────────────────────────────────

/**
 * POST /api/users/logout or POST /api/users/:id/logout
 */
export const logoutUser = async (req, res, next) => {
  try {
    const token = req.token || (req.headers.authorization || '').replace('Bearer ', '').trim();
    const userId = req.user?._id?.toString();

    if (!token || !userId) {
      throw new AppError('Unauthorized: You must be logged in to log out', 401);
    }

    revokedTokens.add(token);
    loggedOutUsers.set(userId, new Date().toISOString());

    const user = await User.findById(userId).select('_id name email jwtToken');
    if (!user) throw new AppError('User not found', 404);

    if (user.jwtToken) {
      revokedTokens.add(user.jwtToken);
      user.jwtToken = null;
      user.lastLogoutAt = new Date();
      await user.save();
    }

    return res.status(200).json({
      message: `User '${user.name}' has been logged out successfully`,
      userId,
      loggedOutAt: loggedOutUsers.get(userId),
    });
  } catch (err) {
    next(err);
  }
};

// ── Delete Current User ──────────────────────────────────────────────────────

export const deleteCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user?._id?.toString();
    if (!userId) {
      throw new AppError('Unauthorized: You must be logged in to delete your account', 401);
    }

    const user = await User.findById(userId).select('_id name email jwtToken');
    if (!user) throw new AppError('User not found', 404);

    if (req.token) revokedTokens.add(req.token);
    if (user.jwtToken) {
      revokedTokens.add(user.jwtToken);
    }
    user.jwtToken = null;
    await user.save();
    loggedOutUsers.set(userId, new Date().toISOString());

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: `User '${user.name}' has been permanently deleted`,
      deletedUserId: userId,
    });
  } catch (err) {
    next(err);
  }
};

// ── Delete User ───────────────────────────────────────────────────────────────

/**
 * DELETE /api/users/:id
 * Manager/admin flow only.
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) throw new AppError('Invalid user ID', 400);

    if (req.user && req.user._id?.toString() === id) {
      throw new AppError('You cannot delete your own account from this route. Use DELETE /api/users/me instead.', 400);
    }

    const user = await User.findById(id).select('_id name email shopId').lean();
    if (!user) throw new AppError('User not found', 404);

    if (req.shop && user.shopId?.toString() !== req.shop._id?.toString()) {
      throw new AppError('Forbidden: User does not belong to this store', 403);
    }

    await User.findByIdAndDelete(id);
    loggedOutUsers.delete(id);

    return res.status(200).json({
      message: `User '${user.name}' has been permanently deleted`,
      deletedUserId: id,
    });
  } catch (err) {
    next(err);
  }
};
