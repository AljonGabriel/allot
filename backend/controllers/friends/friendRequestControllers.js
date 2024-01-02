import asyncHandler from 'express-async-handler';
import FriendRequestModel from '../../models/friends/friendRequestModel.js';
import UserModel from '../../models/userModel.js';

import FriendListModel from '../../models/friends/friendListModel.js';

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

const cancelRequest = asyncHandler(async (req, res) => {
  const { feRequesterId, feRequesteeId } = req.body;

  const cancelled = await FriendRequestModel.deleteOne({
    requesterId: feRequesterId,
    requesteeId: feRequesteeId,
  });

  if (cancelled) {
    res.status(200).json({ cancelled });
  } else {
    res.status(401);
    throw new Error('Request cancell failed');
  }
});

const checkRequest = asyncHandler(async (req, res) => {
  const { feRequesterId, feRequesteeId } = req.query;

  let query = {};
  if (feRequesterId && feRequesteeId) {
    query = {
      requesterId: feRequesterId,
      requesteeId: feRequesteeId,
    };
  } else if (feRequesteeId) {
    query = {
      requesteeId: feRequesteeId,
    };
  }

  await FriendRequestModel.find(query)
    .then((checked) => {
      res.status(200).json(checked);
    })
    .catch((err) => res.status(400).json({ err }));
});

const acceptRequest = asyncHandler(async (req, res) => {
  const { feRequesteeId, feRequesterId } = req.body;

  // Step 1: Find or Create the FriendList Document
  const friendList = await FriendListModel.findOne({
    loggedInUserId: feRequesteeId,
  });

  // If no friendList document exists, you may want to create one.
  if (!friendList) {
    const newFriendList = new FriendListModel({
      loggedInUserId: feRequesteeId,
    });
    await newFriendList.save();
  }

  // Step 2: Update the `friends` Array
  const requestDeleted = await FriendRequestModel.findOneAndDelete({
    requesteeId: feRequesteeId,
    requesterId: feRequesterId,
    status: 'pending',
  });

  if (requestDeleted) {
    // Assuming `friendId` is the field in the FriendList model.
    friendList.friends.push({ friendId: feRequesterId });
    await friendList.save();

    res.status(200).json({ requestDeleted });
  } else {
    res.status(400).json({ error: 'No request found' });
  }
});

export { addRequest, checkRequest, cancelRequest, acceptRequest };
