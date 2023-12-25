import asyncHandler from 'express-async-handler';
import FriendRequestModel from '../models/friendRequestModel.js';
import UserModel from '../models/userModel.js';

const addRequest = asyncHandler(async (req, res) => {
  const { feRequesterId, feRequesterName, feRequesteeId, feRequesteeName } =
    req.body;

  // Check if the requesteeId exists in the database (you may want to add more validation)
  const requesteeExists = await UserModel.findById(feRequesteeId);

  if (!requesteeExists) {
    return res.status(400).json({ error: 'Invalid requesteeId' });
  }

  // Check if the friend request already exists
  const existingRequest = await FriendRequestModel.findOne({
    feRequesterId,
    feRequesteeId,
  });

  if (existingRequest) {
    return res.status(400).json({ error: 'Friend request already exists' });
  }

  // Create a new friend request
  const friendRequest = new FriendRequestModel({
    requesterId: feRequesterId,
    requesterName: feRequesterName,
    requesteeId: feRequesteeId,
    requesteeName: feRequesteeName,
    status: 'pending',
  });

  // Save the friend request to the database
  await friendRequest.save();

  res.status(201).json({ message: 'Friend request added successfully' });
});

export { addRequest };