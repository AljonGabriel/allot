import express from 'express';
const router = express.Router();

import {
  authUser,
  checkInputsAndSendCode,
  verifyEmailCodeThenCreateUser,
  logout,
  profilePicUpload,
} from '../controllers/usersController.js';

import { protect } from '../middlewares/authMiddleware.js';

//Imported multer
import multer from 'multer';

const storage = multer.memoryStorage(); // Use memory storage for storing binary data
const upload = multer({ storage: storage });

router.post('/auth', authUser);
router.post('/verify', checkInputsAndSendCode);
router.post('/create', verifyEmailCodeThenCreateUser);
router.post('/logout', logout);
router.post(
  '/profile-upload',
  protect,
  upload.single('image'),
  profilePicUpload,
);

export default router;
