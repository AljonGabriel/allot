import mongoose from 'mongoose';

const friendListSchema = mongoose.Schema({
  loggedInUserId: {
    type: 'String',
  },
});
