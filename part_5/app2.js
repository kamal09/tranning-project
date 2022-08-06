const express  = require("express");
const app = express();
app.listen(3000);
app.use(express.json());

const multer = require("multer");
const upload = multer({dest:"uploads/"});

app.get("/welcome",(req,res)=>{
    return res.status(200).json({
        status:"success",
        message:"Your backend server is working successfully!"
    });
})

app.post("/profile", upload.single("avater"), (req,res)=>{
    return res.status(200).json({
        status:"success",
        message:"File uploaded successfully!"
    });
});