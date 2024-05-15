
// cloudinary
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


// config for cloudinary
cloudinary.config({
    cloud_name: 'dxjfmwr5n',
    api_key: '944373241182855',
    api_secret: 'dpE_1hDy1bhvcWvWn5XBc8NiXZU'
})

// upload a single image to cloudinary
const singleUpload = (req) => {

    const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
                {folder: "test_folder", public_id: "this-is-test"}, 
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

    async function upload(req) {
        let result = await streamUpload(req);
        console.log("Image Uploaded to Cloudinary: ", result);
    }

    upload(req);
}


module.exports = {
    singleUpload
}