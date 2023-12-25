import mongoose from 'mongoose';

const friendRequestSchema = mongoose.Schema(
  {
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    requesterName: {
      type: String,
      required: true,
    },
    requesteeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    requesteeName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'rejected'],
    },
  },
  {
    timestamps: true,
  },
);

const FriendRequestModel = mongoose.model('friendRequest', friendRequestSchema);

export default FriendRequestModel;
