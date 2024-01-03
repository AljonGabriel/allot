import express from 'express';
const router = express.Router();

import {
  addRequest,
  checkRequest,
  cancelRequest,
  acceptRequest,
  checkIfFriend,
} from '../controllers/friends/friendRequestControllers.js';

import { protect } from '../middlewares/authMiddleware.js';

router.post('/', protect, addRequest);
router.get('/check', protect, checkRequest);
router.get('/isFriend', protect, checkIfFriend);

router.post('/accept', protect, acceptRequest);

router.delete('/delete', protect, cancelRequest);

export default router;
