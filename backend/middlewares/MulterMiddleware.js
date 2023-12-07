import multer from 'multer';
import path from 'path';
import createFolder from '../utils/createFolder.js';
import formatDate from '../utils/formatDate.js';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userInfo = req.user;

    const folderPath = createFolder(
      userInfo._id,
      userInfo.fname + ' ' + userInfo.lname,
    );

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.originalname}_${formatDate(new Date())}${path.extname(
        file.originalname,
      )}`,
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadMiddleWare = multer({ storage, fileFilter });

export default uploadMiddleWare;
