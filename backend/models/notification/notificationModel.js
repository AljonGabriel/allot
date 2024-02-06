import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema(
  {
    type: {
      required: true,
      enum: ['friendRequest', 'post', 'comment'],
      type: String,
    },
    notificationForId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    notificationFor: {
      // Changed from 'for' to 'notificationFor'
      type: String,
      required: true,
    },
    friendRequestId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comments',
    },
  },
  {
    timestamps: true,
  },
);

const NotificationModel = mongoose.model('notifications', notificationSchema);

export default NotificationModel;
