
// use dotenv
require('dotenv').config();

// cloudinary
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


// config for cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


// upload image using buffer
const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            {folder: "discover716", public_id: req.file.originalname}, 
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
        let result = await streamUpload(req);
    
        console.log("Image Uploaded to Cloudinary: ", result);
        
    } catch (err) {
        console.log("upload() inside singleUpload() failed...: ", err);
    }
}

// get url from cloudinary using public id
const getUrl = async (publicId) => {

    try {
        let imageInfo = await cloudinary.api.resource(publicId);

        return imageInfo.secure_url;
    } catch (err) {
        console.log("getUrl() failed: ", err);
    }
}


module.exports = {
    singleUpload,
    getUrl
}