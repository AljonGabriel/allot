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
    userProfile: userInfo.profileImage,
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

const pfUpload = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  // Check if req.file is defined
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const fePostImages = req.file.filename; // Update this line based on the file information

  const newUpload = new UploadModel({
    uploadedUserID: userInfo._id,
    uploadedBy: userInfo.fname + ' ' + userInfo.lname,
    images: fePostImages,
    postedDate: formatDate(new Date()),
    userProfile: fePostImages,
  });

  try {
    const uploaded = await newUpload.save();
    if (uploaded) {
      userInfo.profileImage = `${uploaded.images}`;
      await userInfo.save(); // Corrected the method name here
      res.status(200).json({ uploaded, updatedProfile: userInfo });
    }
  } catch (err) {
    res.status(400).json({ error: 'Posting failed' });
  }
});

export { post, getPost, pfUpload };
