import express from 'express';

const router = express.Router();

import {
  addComment,
  viewPostComments,
  deleteAllComments,
} from './../controllers/commentControllers.js';

router.post('/', addComment);
router.get('/view', viewPostComments);

//testing purposes
router.delete('/deleteAllComment', deleteAllComments);

export default router;
