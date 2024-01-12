import mongoose from 'mongoose';

const uploadSchema = mongoose.Schema(
  {
    uploadedUserID: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image paths
    },
    description: {
      type: String,
    },
    postedDate: {
      type: String,
    },
    userProfile: {
      type: String,
      required: true,
    },
    postAudience: {
      type: String,
      required: true,
      enum: ['public', 'friends', 'private'],
    },
  },
  {
    timestamps: true,
  },
);

const UploadModel = mongoose.model('Uploads', uploadSchema);

export default UploadModel;
