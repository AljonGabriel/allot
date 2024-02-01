import multer from 'multer';
import path from 'path';
import {
  pathFolderForPost,
  pathFolderForProfilePic,
} from '../utils/createFolder.js';
import formatDate from '../utils/formatDate.js';
import { v4 as uuidv4 } from 'uuid';

const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userInfo = req.user;

    const folderPath = pathFolderForPost(userInfo._id);

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    cb(
      null,
      `${uniqueId}_${formatDate(new Date())}${path.extname(file.originalname)}`,
    );
  },
});

const pfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userInfo = req.user;

    const folderPath = pathFolderForProfilePic(userInfo._id);

    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    cb(null, `PF_${uniqueId}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'video/mp4',
    'video/quicktime',
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const postUploadMiddleWare = multer({
  storage: postStorage,
  fileFilter,
});
const pfUploadMiddleWare = multer({
  storage: pfStorage,
  fileFilter,
});

export { postUploadMiddleWare, pfUploadMiddleWare };
