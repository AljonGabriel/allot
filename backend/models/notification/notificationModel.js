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
      type: String,
      required: true,
    },
    friendRequestId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

const NotificationModel = mongoose.model('notifications', notificationSchema);

export default NotificationModel;
