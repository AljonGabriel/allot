import asyncHandler from 'express-async-handler';
import UploadModel from '../models/uploadsModel.js';
import formatDate from '../utils/formatDate.js';

const post = asyncHandler(async (req, res) => {
  const { fePostDescription } = req.body;
  const fePostImages = req.files.map((file) => file.filename);

  const userInfo = req.user;

  const newUpload = new UploadModel({
    uploadedUserID: userInfo._id,
    uploadedBy: userInfo.fname + userInfo.lname,
    images: fePostImages,
    description: fePostDescription,
    postedDate: formatDate(new Date()),
  });

  try {
    const uploaded = await newUpload.save();
    res.status(200).json({ uploaded });
  } catch (err) {
    res.status(400).json({ error: 'Posting failed' });
  }
});

const getPost = asyncHandler(async (req, res) => {
  UploadModel.find()
    .sort({ postedDate: -1 })
    .then((posted) => res.status(200).json({ posted }))
    .catch((err) => res.status(400).json(err));
});

export { post, getPost };
