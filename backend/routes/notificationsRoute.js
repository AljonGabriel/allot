import express from 'express';
const router = express.Router();

import { fetchNotifications } from './../controllers/notificationControllers.js';

router.get('/', fetchNotifications);

export default router;
