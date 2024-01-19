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
  const { feRequesteeId, feRequesterId, feRequesteeName, feRequesterName } =
    req.body;

  try {
    // Step 1: Find or Create the FriendList Document
    let requestee = await FriendListModel.findOne({ userId: feRequesteeId });

    let requester = await FriendListModel.findOne({ userId: feRequesterId });

    // If no friendList document exists, create one
    if (!requestee) {
      requestee = await FriendListModel.create({
        userId: feRequesteeId,
        userName: feRequesteeName,
      });
    }

    // If no friendList document exists, create one
    if (!requester) {
      requester = await FriendListModel.create({
        userId: feRequesterId,
        userName: feRequesterName,
      });
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
    requestee.friends.push({
      friendId: feRequesterId,
      friendName: feRequesterName,
    });
    requester.friends.push({
      friendId: feRequesteeId,
      friendName: feRequesteeName,
    });
    await requestee.save();
    await requester.save();

    res.status(200).json({ requestee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const checkIfFriend = asyncHandler(async (req, res) => {
  const { loggedInUserId, otherUserId } = req.query;

  console.log('otherUserId:', typeof otherUserId);

  try {
    //Check if loggedin user is exist
    const loggedInUser = await FriendListModel.findOne({
      userId: loggedInUserId,
    });

    //Check if the loggedin user is friend with other otherUserId

    const isFriend = loggedInUser
      ? otherUserId
          .split(',')
          .map((userId) =>
            loggedInUser.friends.some((friend) => friend.friendId === userId),
          )
      : [];

    console.log('IsFriend:', isFriend);

    // Step 5: Respond based on the friendship status
    if (isFriend) {
      res.status(200).json({ isFriend });
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
