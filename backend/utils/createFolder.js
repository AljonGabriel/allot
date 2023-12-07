import fs from 'fs';
import path from 'path';
import formatDate from './formatDate.js';

const createFolder = (userId, username) => {
  const folderPath = path.join(
    `./frontend/src/assets/uploads/${userId}/${formatDate(new Date())}/`,
  );

  // Check if the folder exists
  if (!fs.existsSync(folderPath)) {
    // If not, create the folder
    fs.mkdirSync(folderPath, { recursive: true }); // Use recursive option to create parent directories if they don't exist
  }

  return folderPath;
};

export default createFolder;
