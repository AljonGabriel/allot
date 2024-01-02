import express from 'express';
const router = express.Router();

import {
  authUser,
  checkInputsAndSendCode,
  verifyEmailCodeThenCreateUser,
  logout,
  search,
  getProfile,
  checkToken,
} from '../controllers/usersController.js';

import { protect } from '../middlewares/authMiddleware.js';

router.post('/auth', authUser);
router.post('/verify', checkInputsAndSendCode);
router.post('/create', verifyEmailCodeThenCreateUser);
router.post('/logout', logout);

router.get('/search', protect, search);
router.get('/profile', protect, getProfile);

router.get('/protected', checkToken);

export default router;
