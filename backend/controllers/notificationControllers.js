import asyncHandler from 'express-async-handler';
import NotificationModel from '../models/notification/notificationModel.js';

const fetchNotifications = asyncHandler(async (req, res) => {
  const notification = await NotificationModel.findMany()
    .populate('friendRequestId')
    .exec();

  if (notification) {
    res.status(200).json(notification);
  }
});

export { fetchNotifications };
