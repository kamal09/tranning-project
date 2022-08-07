const express = require("express");
const multer = require("multer");

// express config
const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log("App listening at port 3000");
});

// multer config
const UPLOADS_FOLDER = "./uploads";

var upload = multer({
    dest: UPLOADS_FOLDER
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


//single file upload in one field
app.post("/multi-file-upload", upload.array("avatar", 2), (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "Multiple uploaded successfully"
    });
});

