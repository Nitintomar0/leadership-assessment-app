const form = document.getElementById("assessmentForm");

const errorMessage = document.getElementById("errorMessage");

const resultBox = document.getElementById("resultBox");

const submitBtn = document.getElementById("submitBtn");
emailjs.init("mOLZOAaHX1r41nMe0");

// Form Submit Event
form.addEventListener("submit", async function(event){

    // Prevent page reload
    event.preventDefault();

    // Clear old error
    errorMessage.textContent = "";

    // Get user inputs
    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name
    if(name === ""){
        errorMessage.textContent = "Please enter your name.";
        return;
    }

    // Validate email
    if(!emailPattern.test(email)){
        errorMessage.textContent = "Please enter a valid email address.";
        return;
    }

    // Store answers
    let answers = [];

    // Total score
    

    // Loop through 9 questions
    for(let i = 1; i <= 9; i++){

        const selectedOption = document.querySelector(
            `input[name="q${i}"]:checked`
        );

        // Check if question answered
        if(!selectedOption){
            errorMessage.textContent =
                "Please answer all questions.";
            return;
        }

        // Convert value to number
        const score = Number(selectedOption.value);

        // Add to answers array
        answers.push(score);

        
    }

    // =============================
// Dimension Scores
// =============================

const decisionScore =
    answers[0] +
    answers[1] +
    answers[2];

const communicationScore =
    answers[3] +
    answers[4] +
    answers[5];

const strategicScore =
    answers[6] +
    answers[7] +
    answers[8];


// Overall Score
const totalScore =
    decisionScore +
    communicationScore +
    strategicScore;


// =============================
// Helper Function
// =============================

function getBand(score){

    if(score <= 7){

        return {
            band: "Low",
            feedback:
            "This area needs significant improvement and more leadership development."
        };

    }else if(score <= 11){

        return {
            band: "Moderate",
            feedback:
            "You demonstrate decent capability in this area with room for growth."
        };

    }else{

        return {
            band: "High",
            feedback:
            "You show strong leadership qualities and confidence in this area."
        };
    }
}


// =============================
// Individual Dimension Results
// =============================

const decisionResult =
    getBand(decisionScore);

const communicationResult =
    getBand(communicationScore);

const strategicResult =
    getBand(strategicScore);


// =============================
// Overall Leadership Band
// =============================

let leadershipBand = "";

let feedbackMessage = "";

if(totalScore <= 20){

    leadershipBand =
        "Developing Leader";

    feedbackMessage =
        "You are at the early stage of leadership development. Focus on communication, confidence, and strategic growth.";

}else if(totalScore <= 35){

    leadershipBand =
        "Emerging Leader";

    feedbackMessage =
        "You show promising leadership qualities with opportunities to strengthen consistency and strategic thinking.";

}else{

    leadershipBand =
        "Strong Leader";

    feedbackMessage =
        "Excellent leadership capability across multiple dimensions with strong decision-making and communication skills.";
}

    if(totalScore <= 20){

        leadershipBand = "Low Leadership Potential";

        feedbackMessage =
            "You have the potential to grow by improving communication, confidence, and leadership habits.";

    }else if(totalScore <= 35){

        leadershipBand = "Moderate Leadership Potential";

        feedbackMessage =
            "You demonstrate good leadership qualities with room for further improvement.";

    }else{

        leadershipBand = "High Leadership Potential";

        feedbackMessage =
            "Excellent leadership abilities. You inspire confidence, adaptability, and strong decision-making.";

    }

    // Disable button while sending
    submitBtn.disabled = true;

    submitBtn.textContent = "Submitting...";
    errorMessage.textContent =
    "Please wait while we submit your assessment...";

    try{

        
        await emailjs.send(
    "service_wmt7rln",
    "template_eqdz8pp",
    {
        user_name: name,
        total_score: totalScore,
        leadership_band: leadershipBand,
        feedback: feedbackMessage,
        email: email
    }
);
localStorage.setItem(
    "assessmentData",
    JSON.stringify({
        name,
        email,
        answers,
        totalScore,
        leadershipBand,
        feedbackMessage,
        decisionScore,
        communicationScore,
        strategicScore,
        decisionResult,
        communicationResult,
        strategicResult
    })
);

window.location.href = "result.html";

}catch(error){

    console.log(error);

    errorMessage.textContent =
        "Backend server is not responding.";

    submitBtn.disabled = false;

    submitBtn.textContent = "Submit Assessment";
}
    
});
