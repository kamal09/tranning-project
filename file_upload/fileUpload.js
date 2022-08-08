const express = require("express");
const multer = require("multer");
const path = require("path");

// express config
const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log("App listening at port 3000");
});

// multer config
const UPLOADS_FOLDER = "./uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("_") + "_" + Date.now();
        cb(null, fileName + fileExt)
    }
});

//prepare the final multer upload object
var upload = multer({
    // dest: UPLOADS_FOLDER,   // for more control on destination, use it in diskStorage
    storage: storage,
    limits: {
        fileSize: 1000000    // 1MB, bytes
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'avatar') {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
                cb(null, true);
            } else {
                cb(new Error("Only .jpg, .png or .jpeg format allowed"));
            }
        } else if (file.fieldname === 'gallery') {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error("Only Pdf allowed in " + file.fieldname));
            }
        }

    }
})


app.get("/welcome", (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "Server is Running!"
    });
});


//single file upload
app.post("/single-file-upload", upload.single("avatar"), (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "Single file uploaded successfully"
    });
});


//multi file upload in one field
app.post("/multi-file-upload", upload.array("avatar", 2), (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "Multiple uploaded successfully"
    });
});


// multi file upload in multi field
app.post("/multi-file-upload-by-multi-field", upload.fields([{name: "avatar", maxCount: 1},
    {name: "gallery", maxCount: 2}]), (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "multiple file upload by multi field",
        fileInfo: req.files
    });
});

