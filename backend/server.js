const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");
const { Resend } = require("resend");


// Load environment variables
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
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

        await resend.emails.send({

    from: "onboarding@resend.dev",

    to: email,

    subject: "Leadership Assessment Report",

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

        <p>Hello <strong>${name}</strong>,</p>

        <p>
            Thank you for completing your leadership assessment.
        </p>

        <p>
            <strong>Total Score:</strong> ${totalScore}
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
