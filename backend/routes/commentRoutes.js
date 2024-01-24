import express from 'express';

const router = express.Router();

import { addComment } from './../controllers/commentControllers.js';

router.post('/', addComment);

export default router;
