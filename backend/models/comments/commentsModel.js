import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    postedById: {
      type: String,
      required: true,
    },
    commentedBy: {
      type: String,
      required: true,
    },
    commentedById: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CommentModel = mongoose.model('comments', commentSchema);

export default CommentModel;
