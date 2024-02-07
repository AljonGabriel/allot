import asyncHandler from 'express-async-handler';
import NotificationModel from '../models/notification/notificationModel.js';

const fetchNotifications = asyncHandler(async (req, res) => {
  const { feLoggedInUserId } = req.query;
  const notifications = await NotificationModel.find({
    notificationForId: feLoggedInUserId,
  })
    .populate([
      {
        path: 'friendRequestId',
        model: 'friendRequest',
        populate: {
          path: 'requesterId',
          model: 'Users',
        },
      },
      {
        path: 'postId',
        model: 'posts',
        populate: {
          path: 'uploadedUserID',
          model: 'Users',
        },
      },
      {
        path: 'commentId',
        model: 'comments',
        populate: {
          path: 'commentedById',
          model: 'Users',
        },
      },
    ])
    .exec();

  console.log(notifications);

  if (notifications) {
    res.status(200).json(notifications);
  }
});

export { fetchNotifications };
