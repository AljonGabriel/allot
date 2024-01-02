import mongoose from 'mongoose';

const friendListSchema = mongoose.Schema({
  loggedInUserId: {
    type: 'String',
    required: true,
  },
  friends: [
    {
      friendId: {
        type: 'String',
        ref: 'users', // Reference to the User model
      },
    },
  ],
});

const FriendListModel = mongoose.model('friendList', friendListSchema);

export default FriendListModel;
