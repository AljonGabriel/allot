import asyncHandler from 'express-async-handler';
import NotificationModel from '../models/notification/notificationModel.js';

const fetchNotifications = asyncHandler(async (req, res) => {
  const { feLoggedInUserId } = req.query;
  const notification = await NotificationModel.find({
    notificationForId: feLoggedInUserId,
  })
    .populate({
      path: 'friendRequestId',
      model: 'friendRequest',
      populate: {
        path: 'requesterId', // Populate the requesterId within the friendRequest model
        model: 'Users',
      },
    })
    .exec();

  console.log(feLoggedInUserId);

  if (notification) {
    res.status(200).json(notification);
  }
});

export { fetchNotifications };
