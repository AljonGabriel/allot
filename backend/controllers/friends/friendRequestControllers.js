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

  try {
    // Step 1: Find or Create the FriendList Document
    let friendList = await FriendListModel.findOne({ userId: feRequesteeId });

    // If no friendList document exists, create one
    if (!friendList) {
      friendList = await FriendListModel.create({ userId: feRequesteeId });
    }

    // Step 2: Update the `friends` Array
    await FriendRequestModel.findOneAndDelete({
      requesteeId: feRequesteeId,
      requesterId: feRequesterId,
      status: 'pending',
    });

    // Check if there is a pending request from the requester and delete it
    await FriendRequestModel.findOneAndDelete({
      requesteeId: feRequesterId,
      requesterId: feRequesteeId,
      status: 'pending',
    });

    // Assuming `friendId` is the field in the FriendList model.
    friendList.friends.push({ friendId: feRequesterId });
    await friendList.save();

    res.status(200).json({ friendList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const checkIfFriend = asyncHandler(async (req, res) => {
  const { userId1, userId2 } = req.query;

  console.log(userId1, userId2);

  try {
    // Step 1: Find friend list for user 1
    const friendList1 = await FriendListModel.findOne({ userId: userId1 });

    console.log(friendList1);

    // Step 2: Check if user 2 is in the friend list of user 1
    const isFriend1To2 = friendList1
      ? friendList1.friends.some((friend) => friend.friendId === userId2)
      : false;

    // Step 5: Respond based on the friendship status
    if (isFriend1To2) {
      res.status(200).json({ areFriends: true });
    } else {
      res.status(200).json({ areFriends: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export {
  addRequest,
  checkRequest,
  cancelRequest,
  acceptRequest,
  checkIfFriend,
};
