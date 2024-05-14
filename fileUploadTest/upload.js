
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dxjfmwr5n',
    api_key: '944373241182855',
    api_secret: 'dpE_1hDy1bhvcWvWn5XBc8NiXZU'
})


const image = "./public/fds.png";


cloudinary.uploader.upload(image, {folder: "test_folder", public_id: "react-jsons-34543543-jljdf"}).then(() => {
    console.log("image uploaded....");
});