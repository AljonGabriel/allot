import express from 'express';
const router = express.Router();

import {
  addRequest,
  checkRequest,
  cancelRequest,
} from '../controllers/friendRequestControllers.js';

import { protect } from '../middlewares/authMiddleware.js';

router.post('/', protect, addRequest);
router.get('/check', protect, checkRequest);

router.delete('/delete', protect, cancelRequest);

export default router;
