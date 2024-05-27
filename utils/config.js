
require('dotenv').config()

const PORT = process.env.PORT;
const DB_CONN = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_CONN : process.env.DB_CONN;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
const CLOUDINARY_FOLDER = process.env.NODE_ENV === 'test' ? process.env.TEST_CLOUDINARY_FOLDER : process.env.CLOUDINARY_FOLDER;

module.exports = {
  PORT,
  DB_CONN,
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
  CLOUDINARY_FOLDER
}