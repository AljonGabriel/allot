import express from 'express';
const router = express.Router();

import { authUser, createUser } from '../controllers/usersController.js';

router.post('/auth', authUser);
router.post('/create', createUser);

export default router;
