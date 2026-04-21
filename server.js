const express = require('express');
const cors = require('cors');
const { generatePlan } = require('./plan'); // Importing your logic

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyCi_Lh1nMxIIexnHx6tArPRkNrbmnkhIV0";

app.post('/api/generate-protocol', (req, res) => {
    const userData = req.body;

    console.log("Processing data for Bikness Lab...");

    // Call the logic from plan.js
    const personalizedPlan = generatePlan(userData);

    // Send the result back to the HTML
    res.status(200).json({
        success: true,
        data: personalizedPlan
    });
});

app.listen(3000, () => console.log('Bikness Backend Engine Running on Port 3000'));
