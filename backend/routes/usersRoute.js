import express from 'express';
const router = express.Router();

import {
  authUser,
  checkInputsAndSendCode,
  verifyEmailCodeThenCreateUser,
} from '../controllers/usersController.js';

router.post('/auth', authUser);
router.post('/verify', checkInputsAndSendCode);
router.post('/create', verifyEmailCodeThenCreateUser);

export default router;
