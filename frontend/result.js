const assessmentData =
    JSON.parse(localStorage.getItem("assessmentData"));


// If no data found
if(!assessmentData){

    window.location.href = "index.html";
}


// =============================
// Basic Result Data
// =============================

document.getElementById("userName").textContent =
    assessmentData.name;

document.getElementById("overallScore").textContent =
    assessmentData.totalScore;

document.getElementById("overallBand").textContent =
    assessmentData.leadershipBand;

document.getElementById("overallFeedback").textContent =
    assessmentData.feedbackMessage;


// =============================
// Decision Making
// =============================

document.getElementById("decisionScore").textContent =
    assessmentData.decisionScore;

document.getElementById("decisionBand").textContent =
    assessmentData.decisionResult.band;

document.getElementById("decisionFeedback").textContent =
    assessmentData.decisionResult.feedback;


// =============================
// Communication
// =============================

document.getElementById("communicationScore").textContent =
    assessmentData.communicationScore;

document.getElementById("communicationBand").textContent =
    assessmentData.communicationResult.band;

document.getElementById("communicationFeedback").textContent =
    assessmentData.communicationResult.feedback;


// =============================
// Strategic Thinking
// =============================

document.getElementById("strategicScore").textContent =
    assessmentData.strategicScore;

document.getElementById("strategicBand").textContent =
    assessmentData.strategicResult.band;

document.getElementById("strategicFeedback").textContent =
    assessmentData.strategicResult.feedback;


// =============================
// Questions
// =============================

const questions = [

    {
        question:
        "How confidently do you make important decisions under pressure?",
        recommended:
        "Strong leaders usually score 4-5 in confident decision making."
    },

    {
        question:
        "How effectively do you analyze problems before taking action?",
        recommended:
        "Effective leaders carefully analyze situations before reacting."
    },

    {
        question:
        "How consistently do you stay calm while handling difficult situations?",
        recommended:
        "Leadership often requires emotional stability during pressure."
    },

    {
        question:
        "How clearly do you communicate expectations to team members?",
        recommended:
        "Clear communication is a critical leadership skill."
    },

    {
        question:
        "How well do you motivate others during challenging situations?",
        recommended:
        "Strong leaders positively influence and motivate others."
    },

    {
        question:
        "How open are you to receiving constructive feedback?",
        recommended:
        "Growth-oriented leaders actively accept feedback."
    },

    {
        question:
        "How effectively do you plan long-term goals and priorities?",
        recommended:
        "Strategic leaders focus on long-term planning and execution."
    },

    {
        question:
        "How adaptable are you when priorities or situations change suddenly?",
        recommended:
        "Adaptability is an essential leadership quality."
    },

    {
        question:
        "How well do you identify opportunities for improvement and growth?",
        recommended:
        "Leaders continuously look for opportunities to improve systems and teams."
    }
];


// =============================
// Render Review Section
// =============================

const container =
    document.getElementById("questionReviewContainer");


assessmentData.answers.forEach((answer, index) => {

    const card =
        document.createElement("div");

    card.classList.add("question-review");


    card.innerHTML = `

        <h3>
            Q${index + 1}.
            ${questions[index].question}
        </h3>

        <p>
            <strong>Your Response:</strong>
            ${answer}/5
        </p>

        <p>
            <strong>Leadership Insight:</strong>
            ${questions[index].recommended}
        </p>
    `;

    container.appendChild(card);

});