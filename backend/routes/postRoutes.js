import express from 'express';
const router = express.Router();

import {
  post,
  getPost,
  pfUpload,
  getPostByUserId,
  getSpecificPostByUserId,
  deleteAllPost,
} from '../controllers/postControllers.js';

import { protect } from '../middlewares/authMiddleware.js';
import {
  postUploadMiddleWare,
  pfUploadMiddleWare,
} from '../middlewares/MulterMiddleware.js';

router.post('/', protect, postUploadMiddleWare.array('postImages', 4), post);
router.post(
  '/createProfilePic',
  protect,
  pfUploadMiddleWare.single('pfImage'),
  pfUpload,
);
router.get('/view', protect, getPost);
router.get('/viewById', protect, getPostByUserId);
router.get('/viewSpecificById', protect, getSpecificPostByUserId);

//testing purposes

router.delete('/deleteAllPost', deleteAllPost);

export default router;
