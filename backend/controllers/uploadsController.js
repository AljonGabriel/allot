import asyncHandler from 'express-async-handler';
import UploadModel from '../models/uploadsModel.js';
import formatDate from '../utils/formatDate.js';

const post = asyncHandler(async (req, res) => {
  const { fePostDescription, fePostSort } = req.body;
  const fePostImages = req.files.map((file) => file.filename);

  const userInfo = req.user;

  console.log(fePostDescription, fePostSort);

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
  await UploadModel.find()
    .sort({ postedDate: -1 })
    .then((posted) => res.status(200).json({ posted }))
    .catch((err) => res.status(400).json(err));
});

const getPostByUserId = asyncHandler(async (req, res) => {
  const uId = req.query.id;

  const userPost = await UploadModel.find({
    uploadedUserID: uId,
  }).sort({ postedDate: -1 });

  userPost && res.status(200).json({ userPost });
});

const getSpecificPostByUserId = asyncHandler(async (req, res) => {
  const img = req.query.img;

  const userPost = await UploadModel.findOne({
    userProfile: img,
  });

  userPost && res.status(200).json({ userPost });
});

const pfUpload = asyncHandler(async (req, res) => {
  const userInfo = req.user;

  const { feDescription } = req.body;

  // Check if req.file is defined
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const fePostImages = req.file.filename;

  const newUpload = new UploadModel({
    uploadedUserID: userInfo._id,
    uploadedBy: userInfo.fname + ' ' + userInfo.lname,
    images: fePostImages,
    description: feDescription,
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

export { post, getPost, pfUpload, getPostByUserId, getSpecificPostByUserId };
