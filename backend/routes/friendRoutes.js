import express from 'express';
const router = express.Router();

import {
  addRequest,
  checkRequest,
} from '../controllers/friendRequestControllers.js';

import { protect } from '../middlewares/authMiddleware.js';

router.post('/', protect, addRequest);
router.get('/check', protect, checkRequest);

export default router;
