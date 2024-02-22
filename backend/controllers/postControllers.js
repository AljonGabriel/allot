import asyncHandler from 'express-async-handler';
import PostModel from '../models/postModels.js';
import formatDate from '../utils/formatDate.js';
import path from 'path';
import fs from 'fs';

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
  const { postId } = req.body; // Assuming you pass the post ID through the URL params

  try {
    // Retrieve the post details
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete each image file associated with the post
    for (const filename of post.images) {
      const filePath = path.resolve(
        'frontend',
        'src',
        'assets',
        'uploads',
        `${post.uploadedUserID}`,
        'post',
        `${formatDate(post.createdAt)}`,
        filename,
      );

      console.log('file path:', filePath);

      // Check if the file exists before attempting to delete
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        console.log('File deleted successfully:', filePath);

        // Now delete the post itself from the database
        await PostModel.deleteOne({ _id: postId });

        res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        console.log('File does not exist:', filePath);
        res.status(400).json({ message: 'File does not exist' });
      }
    }
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
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

  userPost
    ? res.status(200).json({ userPost })
    : res.status(404).json({ err: 'No Post' });
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
  deleteOwnPost,
};
