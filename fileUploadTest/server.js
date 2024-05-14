
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dxjfmwr5n',
    api_key: '944373241182855',
    api_secret: 'dpE_1hDy1bhvcWvWn5XBc8NiXZU'
})

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// app.use(fileUpload());

// default URL for website
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
    //__dirname : It will resolve to your project folder.
});


app.post("/upload",upload.single('fileX'), (req , res) => {
    
    
    cloudinary.uploader.upload(req.file.buffer, {folder: "test_folder", public_id: "fileX"}).then(() => {
        console.log("image uploaded to ordinary....");
    });
    res.send("<h2>jlsdjf</h2>")
})

// port
const PORT = 3001;

app.listen(PORT, () => {
    console.log("server running @3001");
})