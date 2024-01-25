import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    uploadedUserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    uploadedBy: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image paths
    },
    description: {
      type: String,
    },
    postedDate: {
      type: String,
    },
    userProfile: {
      type: String,
      required: true,
    },
    postAudience: {
      type: String,
      required: true,
      enum: ['public', 'friends', 'private'],
    },
  },
  {
    timestamps: true,
  },
);

const PostModel = mongoose.model('posts', postSchema);

export default PostModel;
