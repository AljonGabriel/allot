import express from 'express';
const router = express.Router();

import {
  authUser,
  checkInputsAndSendCode,
  verifyEmailCodeThenCreateUser,
  logout,
} from '../controllers/usersController.js';

router.post('/auth', authUser);
router.post('/verify', checkInputsAndSendCode);
router.post('/create', verifyEmailCodeThenCreateUser);
router.post('/logout', logout);

export default router;
