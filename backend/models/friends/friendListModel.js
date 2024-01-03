import mongoose from 'mongoose';

const friendListSchema = mongoose.Schema({
  userId: {
    type: 'String',
    required: true,
  },
  friends: [
    {
      friendId: {
        type: 'String',
        ref: 'UserModel', // Reference to the User model
      },
    },
  ],
});

const FriendListModel = mongoose.model('friendList', friendListSchema);

export default FriendListModel;
