import asyncHandler from 'express-async-handler';
import FriendRequestModel from '../models/friendModel.js';

const addRequest = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: 'Request' });
});

export { addRequest };
