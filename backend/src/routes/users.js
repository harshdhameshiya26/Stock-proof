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
  activateUser,
  verifyActivationOtp,
  verifyLoginOtp,
  getCurrentUser,
  updateCurrentUser,
  logoutUser,
  deleteCurrentUser,
  deleteUser,
  requestDeleteOtp,
  requestPasswordResetOtp,
  requestRoleChangeOtp,
} from '../controllers/userController.js';
import {
  verifyShopifySession,
  authenticateUser,
  authenticateUserForDeletion,
} from '../middleware/auth.js';
import { validateUserCreate, validateUserRegistration } from '../middleware/validation.js';

const router = express.Router();

// Standard auth endpoints
router.post('/register', validateUserRegistration, registerUser);
router.post('/verify-otp', verifyUserOtp);
router.post('/login', loginUser);
router.post('/activate', activateUser);
router.post('/activate/verify-otp', verifyActivationOtp);
router.post('/login/verify-otp', verifyLoginOtp);
router.get('/me', authenticateUser, getCurrentUser);
router.patch('/me', authenticateUser, updateCurrentUser);
router.post('/logout', authenticateUser, logoutUser);
router.delete('/me', authenticateUserForDeletion, deleteCurrentUser);

// Existing store-scoped staff management endpoints
router.get('/', verifyShopifySession, getUsers);
router.post('/', verifyShopifySession, validateUserCreate, createUser);
router.get('/:id', verifyShopifySession, getUser);
router.patch('/:id', verifyShopifySession, updateUser);
router.post('/:id/password-otp', verifyShopifySession, requestPasswordResetOtp);
router.post('/:id/role-otp', verifyShopifySession, requestRoleChangeOtp);
router.post('/:id/logout', verifyShopifySession, logoutUser);
router.post('/:id/delete-otp', verifyShopifySession, requestDeleteOtp);
router.delete('/:id', verifyShopifySession, deleteUser);

export default router;
