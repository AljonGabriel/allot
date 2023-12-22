import express from 'express';
const router = express.Router();

import { addRequest } from '../controllers/friendRequestControllers.js';

import { protect } from '../middlewares/authMiddleware.js';

router.post('/add', protect, addRequest);

export default router;
