import asyncHandler from 'express-async-handler';
import CommentModel from '../models/comments/commentsModel.js';
import PostModel from '../models/postModels.js';

const addComment = asyncHandler(async (req, res) => {
  const {
    fePostId,
    fePostedBy,
    fePostedById,
    feCommentedBy,
    feCommentedById,
    feUserComment,
  } = req.body;

  try {
    const newComment = {
      postId: fePostId,
      postedBy: fePostedBy,
      postedById: fePostedById,
      commentedBy: feCommentedBy,
      commentedById: feCommentedById,
      comment: feUserComment,
    };

    if (newComment) {
      const commented = await CommentModel.create(newComment);

      res.status(200).json({ commentRes: commented });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

const viewPostComments = asyncHandler(async (req, res) => {
  const comment = await CommentModel.find({
    postId: '65b2551b5e7a4233ae6498fb', // Assuming postId is a string representation of ObjectId
  });

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(400).json({ error: 'Cant find comments' });
  }
});

export { addComment, viewPostComments };
