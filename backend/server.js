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

        // Get frontend data
        const {
            name,
            email,
            answers,
            totalScore,
            leadershipBand,
            feedbackMessage
        } = req.body;


        // Basic validation
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


        await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: email,

    subject: "Your Leadership Assessment Report",

    html: `

<div style="
    font-family: Arial, Helvetica, sans-serif;
    max-width: 700px;
    margin: auto;
    padding: 30px;
    background: #f4f7fb;
">

    <div style="
        background: white;
        padding: 40px;
        border-radius: 14px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
    ">

        <h1 style="
            color:#1f3c88;
            margin-bottom:20px;
        ">
            Leadership Assessment Report
        </h1>

        <p style="
            font-size:16px;
            line-height:1.8;
        ">
            Hello <strong>${name}</strong>,
        </p>

        <p style="
            font-size:16px;
            line-height:1.8;
        ">
            Thank you for completing your leadership assessment.
            Your personalized report has been generated successfully.
        </p>

        <div style="
            background:#eef4ff;
            padding:25px;
            border-radius:12px;
            margin-top:25px;
            margin-bottom:25px;
        ">

            <h2 style="
                color:#1f3c88;
                margin-bottom:20px;
            ">
                Assessment Summary
            </h2>

            <p>
                <strong>Total Score:</strong>
                ${totalScore}
            </p>

            <p>
                <strong>Leadership Level:</strong>
                ${leadershipBand}
            </p>

            <p>
                <strong>Feedback:</strong>
                ${feedbackMessage}
            </p>

        </div>

        <a
            href="http://127.0.0.1:3000/frontend/result.html"
            style="
                display:inline-block;
                background:#1f3c88;
                color:white;
                padding:14px 24px;
                border-radius:10px;
                text-decoration:none;
                font-weight:bold;
                margin-top:10px;
            "
        >
            View Leadership Dashboard
        </a>

        <p style="
            margin-top:40px;
            color:#666;
            line-height:1.7;
            font-size:14px;
        ">
            This assessment was generated automatically based on your submitted responses.
            Continue developing your leadership skills through consistent learning,
            communication, and strategic thinking.
        </p>

    </div>

</div>

`
});


        // Success response
        res.status(200).json({
    message: "Assessment submitted successfully."
});

    }catch(error){

        console.error("EMAIL ERROR:", error);

        res.status(500).json({
            message: "Server error while sending email."
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
