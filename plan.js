// plan.js - The Logic Engine for Bikness

const generatePlan = (data) => {
    const { weight, height, age, gender, bmi } = data;
    
    let calories, protein, status;

    // 1. Determine Status based on BMI
    if (bmi < 18.5) {
        status = "Underweight - Bulking Protocol Required";
        calories = (weight * 35) + 500; // Caloric surplus
    } else if (bmi <= 25) {
        status = "Optimal - Maintenance & Toning Protocol";
        calories = (weight * 32); 
    } else {
        status = "Overweight - Shredding Protocol Required";
        calories = (weight * 28) - 300; // Caloric deficit
    }

    // 2. Protein Calculation (Professional Athlete Standard)
    protein = weight * 2.2; 

    // 3. Return the Custom Plan
    return {
        protocolName: `Bikness_${gender.toUpperCase()}_${status.split(' ')[0]}`,
        status: status,
        dailyTarget: {
            calories: Math.round(calories),
            protein: Math.round(protein) + "g",
            water: (weight * 0.04).toFixed(1) + "L"
        },
        recommendation: bmi > 25 ? "Focus on HIIT and Strength" : "Focus on Heavy Lifting"
    };
};

module.exports = { generatePlan };
