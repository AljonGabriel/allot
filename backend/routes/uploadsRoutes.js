import express from 'express';
const router = express.Router();

import { post, getPost } from '../controllers/uploadsController.js';

import { protect } from '../middlewares/authMiddleware.js';
import uploadMiddleWare from '../middlewares/MulterMiddleware.js';

router.post('/', protect, uploadMiddleWare.array('postImages', 4), post);

router.get('/view', protect, getPost);

export default router;
