/**
 * routes/users.js
 *
 * User authentication flow and staff/manager account management.
 */

import express from 'express';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  registerUser,
  verifyUserOtp,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
  logoutUser,
  deleteCurrentUser,
  deleteUser,
} from '../controllers/userController.js';
import {
  verifyShopifySession,
  requireManager,
  authenticateUser,
  authenticateUserForDeletion,
} from '../middleware/auth.js';
import { validateUserCreate, validateUserRegistration } from '../middleware/validation.js';

const router = express.Router();

// Standard auth endpoints
router.post('/register', validateUserRegistration, registerUser);
router.post('/verify-otp', verifyUserOtp);
router.post('/login', loginUser);
router.get('/me', authenticateUser, getCurrentUser);
router.patch('/me', authenticateUser, updateCurrentUser);
router.post('/logout', authenticateUser, logoutUser);
router.delete('/me', authenticateUserForDeletion, deleteCurrentUser);

// Existing store-scoped staff management endpoints
router.get('/', verifyShopifySession, requireManager, getUsers);
router.post('/', verifyShopifySession, requireManager, validateUserCreate, createUser);
router.get('/:id', verifyShopifySession, requireManager, getUser);
router.patch('/:id', verifyShopifySession, requireManager, updateUser);
router.post('/:id/logout', verifyShopifySession, requireManager, logoutUser);
router.delete('/:id', verifyShopifySession, requireManager, deleteUser);

export default router;
