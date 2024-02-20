import asyncHandler from 'express-async-handler';
import PostModel from '../models/postModels.js';
import formatDate from '../utils/formatDate.js';

const post = asyncHandler(async (req, res) => {
  const { fePostDescription, fePostAudience } = req.body;
  const fePostImages = req.files.map((file) => file.filename);

  const userInfo = req.user;

  const newUpload = new PostModel({
    uploadedUserID: userInfo._id,
    uploadedBy: userInfo.fname + userInfo.lname,
    images: fePostImages,
    description: fePostDescription,
    postedDate: formatDate(new Date()),
    userProfile: userInfo.profileImage,
    postAudience: fePostAudience,
  });

  try {
    const uploaded = await newUpload.save();

    res.status(200).json({ uploaded });
  } catch (err) {
    res.status(400).json({ error: 'Posting failed' });
  }
});

const deleteOwnPost = asyncHandler(async (req, res) => {
  const photoPaths = deletedPost.images.map((filename) =>
    path.join(__dirname, 'uploads', filename),
  );
});

const getPost = asyncHandler(async (req, res) => {
  await PostModel.find()
    .sort({ postedDate: -1 })
    .then((posted) => res.status(200).json({ posted }))
    .catch((err) => res.status(400).json(err));
});

const getPostByUserId = asyncHandler(async (req, res) => {
  const uId = req.query.id;

  const userPost = await PostModel.find({
    uploadedUserID: uId,
  }).sort({ postedDate: -1 });

  userPost && res.status(200).json({ userPost });
});

const getSpecificPostByUserId = asyncHandler(async (req, res) => {
  const img = req.query.img;

  const userPost = await PostModel.findOne({
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

  const fePostImage = req.file.filename;

  console.log(fePostImage);

  const newUpload = new PostModel({
    uploadedUserID: userInfo._id,
    uploadedBy: userInfo.fname + ' ' + userInfo.lname,
    images: fePostImage,
    description: feDescription,
    postedDate: formatDate(new Date()),
    userProfile: fePostImage,
    postAudience: 'public',
  });

  try {
    const uploaded = await newUpload.save();

    // Update user's profile image
    userInfo.profileImage = fePostImage;
    await userInfo.save();

    res.status(200).json({ uploaded, updatedProfile: userInfo });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Posting failed' });
  }
});

//Testing purposes

const deleteAllPost = asyncHandler(async (req, res) => {
  const deleted = await PostModel.deleteMany();

  if (deleted) {
    res.status(200).json({ res: 'All post deleted' });
  } else {
    res.status(400).json({ error: 'Deleting all post failed!' });
  }
});

export {
  post,
  getPost,
  pfUpload,
  getPostByUserId,
  getSpecificPostByUserId,
  deleteAllPost,
};
