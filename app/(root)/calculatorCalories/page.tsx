"use client"
import React, { useState, ChangeEvent } from 'react';

interface DailyCalorieCalculatorProps {}

const getActivityMultiplier = (activityLevel: string): number => {
  switch (activityLevel) {
    case 'sedentary':
      return 1.2;
    case 'lightlyActive':
      return 1.375;
    case 'moderatelyActive':
      return 1.55;
    case 'veryActive':
      return 1.725;
    case 'extraActive':
      return 1.9;
    default:
      return 1.2; // Default set to sedentary
  }
};

const DailyCalorieCalculator: React.FC<DailyCalorieCalculatorProps> = () => {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('sedentary');
  const [goal, setGoal] = useState<string>('maintain');
  const [result, setResult] = useState<string>('');

  const calculateCalories = () => {
    const parsedAge = parseInt(age);
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);

    if (
      !isNaN(parsedAge) &&
      !isNaN(parsedWeight) &&
      !isNaN(parsedHeight) &&
      parsedAge > 0 &&
      parsedWeight > 0 &&
      parsedHeight > 0
    ) {
      let bmr = 0;

      if (gender === 'male') {
        bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge + 5;
      } else {
        bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge - 161;
      }

      let dailyCalories = 0;

      switch (goal) {
        case 'maintain':
          dailyCalories = bmr * getActivityMultiplier(activityLevel);
          break;
        case 'lose':
          const calorieDeficit = 500; // Daily calorie deficit
          dailyCalories = bmr * getActivityMultiplier(activityLevel) - calorieDeficit;
          break;
        case 'gain':
          const calorieSurplus = 500; // Daily calorie surplus
          dailyCalories = bmr * getActivityMultiplier(activityLevel) + calorieSurplus;
          break;
        default:
          break;
      }

      setResult(dailyCalories.toFixed(2));
    }
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleActivityLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setActivityLevel(e.target.value);
  };

  const handleGoalChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGoal(e.target.value);
  };

  return (
    <div className="bg-black text-white p-8 rounded">
      <h1 className="head-text text-3xl mb-4">Daily Calorie Needs Calculator</h1>
      <div className="mb-4">
        <label htmlFor="age" className="mr-2">Age:</label>
        <input id="age" type="number" value={age} onChange={handleAgeChange} className="bg-white text-black p-2 rounded border-none" />
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="mr-2">Gender:</label>
        <select id="gender" value={gender} onChange={handleGenderChange} className="bg-white text-black p-2 rounded border-none">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="weight" className="mr-2">Weight (in kg):</label>
        <input id="weight" type="number" value={weight} onChange={handleWeightChange} className="bg-white text-black p-2 rounded border-none" />
      </div>
      <div className="mb-4">
        <label htmlFor="height" className="mr-2">Height (in cm):</label>
        <input id="height" type="number" value={height} onChange={handleHeightChange} className="bg-white text-black p-2 rounded border-none" />
      </div>
      <div className="mb-4">
        <label htmlFor="activityLevel" className="mr-2">Activity Level:</label>
        <select id="activityLevel" value={activityLevel} onChange={handleActivityLevelChange} className="bg-white text-black p-2 rounded border-none">
          <option value="sedentary">Sedentary</option>
          <option value="lightlyActive">Lightly Active</option>
          <option value="moderatelyActive">Moderately Active</option>
          <option value="veryActive">Very Active</option>
          <option value="extraActive">Extra Active</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="goal" className="mr-2">Goal:</label>
        <select id="goal" value={goal} onChange={handleGoalChange} className="bg-white text-black p-2 rounded border-none">
          <option value="maintain">Maintain Weight</option>
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </div>
      <button className="bg-sky-500 text-white px-4 py-2 rounded" onClick={calculateCalories}>Calculate Calories</button>
      {result && (
        <div className="mt-4">
          <h2>Your estimated daily calorie needs: {result} calories</h2>
        </div>
      )}
    </div>
  );
};

export default DailyCalorieCalculator;
