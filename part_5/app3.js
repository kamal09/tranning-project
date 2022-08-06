const express = require("express");
const app = express();
app.listen(3000);
app.use(express.json());

const multer = require("multer");

// const upload = multer({dest:"uploads/"});

function getSystemTime() {
    return Date.now();
}

//-- Get 10 digit random number
function getRandomNumber() {
    return Math.floor(1000000000 + Math.random() * 900000000);
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads");
    },
    async filename(req, file, cb) {
        const newFilePath =
            getRandomNumber() +
            "_" +
            getRandomNumber() +
            "_" +
            getSystemTime() +
            "_" +
            file.originalname;

        console.log("New Image Path : " + newFilePath);
        cb(null, newFilePath);
    },
});


const uploadWithCustomSettings = multer({storage});

app.get("/welcome", (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "Your backend server is working successfully!"
    });
})

app.post("/profile", uploadWithCustomSettings.single("avater"), (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "File uploaded successfully!"
    });
});

app.post(
    "/get-file-name",
    uploadWithCustomSettings.single("avater"),
    (req, res) => {
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any

        return res.status(200).json({
            status: "success",
            message: "File uploaded successfully!",
            fileName: req.file.filename,
        });
    }
);
