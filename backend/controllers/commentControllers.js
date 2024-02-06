import asyncHandler from 'express-async-handler';
import CommentModel from '../models/comments/commentsModel.js';
import PostModel from '../models/postModels.js';
import NotificationModel from '../models/notification/notificationModel.js';

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

    const newNotification = {
      type: 'comment',
      notificationForId: fePostedById,
      notificationFor: fePostedBy,
      commentId: newComment._id,
    };

    if (newComment) {
      const commented = await CommentModel.create(newComment);

      if (commented) {
        await NotificationModel.create(newNotification);
        res.status(200).json({ commentRes: commented });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

const viewPostComments = asyncHandler(async (req, res) => {
  const { fePostId } = req.query;

  const comment = await CommentModel.find({
    postId: fePostId,
  })
    .populate('commentedById')
    .exec();

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(400).json({ error: 'Cant find comments' });
  }
});

//Testing purposes

const deleteAllComments = asyncHandler(async (req, res) => {
  try {
    await CommentModel.deleteMany();
    res.status(200).json({ res: 'All comments deleted' });
  } catch (err) {
    res.status(400).json(err);
  }
});

export { addComment, viewPostComments, deleteAllComments };
