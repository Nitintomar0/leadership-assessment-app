# Leadership Assessment App

## Overview

This project is a full-stack leadership self-assessment web application built as part of the Planet Ganges technical assessment.

The application allows users to:

* Complete a 9-question leadership assessment
* Receive scored feedback across multiple leadership dimensions
* View their results instantly
* Receive a personalized assessment report via email

---

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Deployment

* Frontend: Vercel
* Backend: Render

### Email Service

* EmailJS

---

## Leadership Dimensions

The assessment evaluates users across:

1. Decision Making
2. Communication
3. Strategic Thinking

Each dimension contains 3 questions rated on a 1–5 scale.

---

## Scoring Logic

* Each dimension score is calculated by summing 3 related question responses.
* Overall score is calculated from all 9 answers.
* Leadership bands are categorized into:

  * Low Leadership Potential
  * Moderate Leadership Potential
  * High Leadership Potential

Feedback messages are generated based on score thresholds.

---

## Features Implemented

* Form validation
* Mobile responsive design
* Dynamic scoring system
* Personalized result screen
* Email report delivery
* Error handling for failed email submissions
* Prevention of incomplete submissions

---

## Improvements With More Time

* Add PDF report generation
* Add database storage
* Improve UI animations and accessibility
* Add analytics dashboard

---

## AI Assistance

AI tools were used for:

* Debugging
* Email integration troubleshooting
* Improving frontend validation
* Backend deployment assistance

All final code was reviewed, understood, and modified manually.
