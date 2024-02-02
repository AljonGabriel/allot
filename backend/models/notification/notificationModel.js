import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema(
  {
    type: {
      required: true,
      enum: ['friendRequest', 'post'],
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
      ref: 'friendRequest',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
    },
  },
  {
    timestamps: true,
  },
);

const NotificationModel = mongoose.model('notifications', notificationSchema);

export default NotificationModel;
