const express = require("express");
const app = express();
app.listen(3000);
app.use(express.json());

//simple welcome api
app.get("/welcome", (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "Your backend server is working successfully!"
    });
});

//Dummy Get API
app.get("/get-value-pi", (req, res) => {
    return res.status(200).json({
        status: "success",
        value: 3.1416,
        message: "The Get API will return the value of PI"
    });
});

//Dummy Post API- from URL Query parameter
app.post("/square-query-param", (req, res) => {
    const value = req.query.value;
    console.log(value)
    const square = value * value;
    return res.status(200).json({
        status: "success",
        square: square,
        message: "This POST api will return the square of a value - URL Query Parameter"
    });
});


// Dummy POST API - from RAW URL Parameter
app.post("/square-raw-url/:value", (req, res) => {
    const value = req.params.value;
    const square = value * value;
    return res.status(200).json({
        status: "success",
        square: square,
        message: "This POST api will return the square of a value - RAW URL Parameter"
    });
});


// Dummy POST API - from JSON body
app.post("/square-json", (req, res) => {
    const value = req.body.value;
    const square = value * value;

    return res.status(200).json({
        status: "success",
        square: square,
        message: "This POST api will return the square of a value - JSON body"
    });
});