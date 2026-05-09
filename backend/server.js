const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const nodemailer = require("nodemailer");


// Load environment variables
dotenv.config();

// Initialize express app
const app = express();


// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());


// Port
const PORT = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});



// Test Route
app.get("/", (req, res) => {

    res.send("Leadership Assessment Backend Running");

});


// Main Route
app.post("/submit-assessment", async (req, res) => {

    try{

        const {
            name,
            email,
            answers,
            totalScore,
            leadershipBand,
            feedbackMessage
        } = req.body;

        if(
            !name ||
            !email ||
            !answers ||
            !totalScore ||
            !leadershipBand
        ){
            return res.status(400).json({
                message: "Missing required fields."
            });
        }

        console.log("Assessment Submitted");

        console.log(name);
        console.log(email);
        console.log(totalScore);

        res.status(200).json({
            message: "Assessment submitted successfully."
        });

    }catch(error){

        console.error(error);

        res.status(500).json({
            message: "Server error."
        });
    }
});
app.get("/submit-assessment", (req, res) => {
    res.send("Assessment API Working");
});

// Start Server
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
