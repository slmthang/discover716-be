
// import
const config = require('../utils/config');
const logger = require('../utils/logger')

// cloudinary
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


// config for cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET
})


// upload image using buffer
const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    
    let stream = cloudinary.uploader.upload_stream(
      { folder: config.CLOUDINARY_FOLDER, public_id: req.file.originalname },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  })
};

// upload a single image to cloudinary
const singleUpload = async (req) => {

  try {

    // return object from cloudinary submission
    return await streamUpload(req);

  } catch (err) {
    logger.error("singleUpload() failed : ", err);
  }
}

// get url from cloudinary using public id
const getUrl = async (publicId) => {

  try {

    let imageInfo = await cloudinary.api.resource(publicId);
    return imageInfo.secure_url;

  } catch (err) {

    logger.error("getUrl() failed: ", err);

  }
}

const deleteImage = async (public_id) => {

  try {

    // delete thumbnail first
    await cloudinary.api.delete_resources([public_id]);
  } catch (err) {

    logger.error("Thumbnail deletion attempt failed. :", err)
  }
}


module.exports = {
  singleUpload,
  getUrl,
  deleteImage
}