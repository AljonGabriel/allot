import express from 'express';

const router = express.Router();

import {
  addComment,
  viewPostComments,
} from './../controllers/commentControllers.js';

router.post('/', addComment);
router.get('/view', viewPostComments);

export default router;
