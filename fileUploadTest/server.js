
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const multer  = require('multer')
const upload = multer()
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: 'dxjfmwr5n',
    api_key: '944373241182855',
    api_secret: 'dpE_1hDy1bhvcWvWn5XBc8NiXZU'
})

app.use(cors());
app.use(express.json());
// app.use(express.static("public"));
// app.use(fileUpload());

// default URL for website
app.get('/', function(req,res){
    // res.sendFile(path.join(__dirname+'/public/index.html'));
    //__dirname : It will resolve to your project folder.
    console.log("ljsldf");
    res.send("<h1>fljf</h1>");
});


app.post("/upload", (req , res) => {

    console.log(req.body);

    // let streamUpload = (req) => {
    //     return new Promise((resolve, reject) => {
    //         let stream = cloudinary.uploader.upload_stream(
    //             {folder: "test_folder", public_id: "this-is-test"}, 
    //             (error, result) => {
    //                 if (result) {
    //                     resolve(result);
    //                 } else {
    //                     reject(error);
    //                 }
    //             }
    //         )

    //         streamifier.createReadStream(req.file.buffer).pipe(stream);
    //     })
    // };

    // async function upload(req) {
    //     let result = await streamUpload(req);
    //     console.log(result);
    // }

    // upload(req);

    res.send("<h1>Uploaded</h1>");
})

// port
const PORT = 3001;

app.listen(PORT, () => {
    console.log("server running @3001");
})