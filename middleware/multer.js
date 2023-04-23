// multer.js

const multer = require("multer");
const path = require("path");

const storage = (destination) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = (destination, fileKey, fileType) => {
  const storageConfig = storage(destination);
  return multer({
    storage: storageConfig,
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== fileType) {
        return cb(new Error(`Only ${fileType} files are allowed`));
      }
      cb(null, true);
    },
    limits: {
      fileSize: 1024 * 1024 * 10, // Max file size: 10MB
    },
  }).single(fileKey);
};

module.exports = upload;
