import fs from 'fs';
import path from 'path';
import formatDate from './formatDate.js';

const pathFolderForPost = (userId) => {
  const folderPath = path.join(
    `./frontend/src/assets/uploads/${userId}/post/${formatDate(new Date())}/`,
  );

  // Check if the folder exists
  if (!fs.existsSync(folderPath)) {
    // If not, create the folder
    fs.mkdirSync(folderPath, { recursive: true }); // Use recursive option to create parent directories if they don't exist
  }

  return folderPath;
};

const pathFolderForProfilePic = (userId) => {
  const folderPath = path.join(
    `./frontend/src/assets/uploads/${userId}/profilePictures/`,
  );

  // Check if the folder exists
  if (!fs.existsSync(folderPath)) {
    // If not, create the folder
    fs.mkdirSync(folderPath, { recursive: true }); // Use recursive option to create parent directories if they don't exist
  }

  return folderPath;
};

export { pathFolderForPost, pathFolderForProfilePic };
