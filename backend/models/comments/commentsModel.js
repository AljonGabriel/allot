import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    postedById: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    commentedBy: {
      type: String,
      required: true,
    },
    commentedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
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
