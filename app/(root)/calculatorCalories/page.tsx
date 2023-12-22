"use client"
import { useState, ChangeEvent } from 'react';

const DailyCalorieCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [result, setResult] = useState('');

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

      // Calculate BMR based on gender
      if (gender === 'male') {
        bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge + 5;
      } else {
        bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge - 161;
      }

      // Adjust BMR based on activity level
      switch (activityLevel) {
        case 'sedentary':
          bmr *= 1.2;
          break;
        case 'lightlyActive':
          bmr *= 1.375;
          break;
        case 'moderatelyActive':
          bmr *= 1.55;
          break;
        case 'veryActive':
          bmr *= 1.725;
          break;
        case 'extraActive':
          bmr *= 1.9;
          break;
        default:
          break;
      }

      setResult(bmr.toFixed(2));
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

  return (
    <div className="bg-black text-white p-8 rounded">
      <h1 className="head-text text-3xl mb-4">Daily Calorie Needs Calculator</h1>
      <div className="mb-4">
        <label className="mr-2">Age:</label>
        <input type="number" value={age} onChange={handleAgeChange} className="bg-white text-black p-2 rounded border-none" />
      </div>
      <div className="mb-4">
        <label className="mr-2">Gender:</label>
        <select value={gender} onChange={handleGenderChange} className="bg-white text-black p-2 rounded border-none">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="mr-2">Weight (in kg):</label>
        <input type="number" value={weight} onChange={handleWeightChange} className="bg-white text-black p-2 rounded border-none" />
      </div>
      <div className="mb-4">
        <label className="mr-2">Height (in cm):</label>
        <input type="number" value={height} onChange={handleHeightChange} className="bg-white text-black p-2 rounded border-none" />
      </div>
      <div className="mb-4">
        <label className="mr-2">Activity Level:</label>
        <select value={activityLevel} onChange={handleActivityLevelChange} className="bg-white text-black p-2 rounded border-none">
          <option value="sedentary">Sedentary</option>
          <option value="lightlyActive">Lightly Active</option>
          <option value="moderatelyActive">Moderately Active</option>
          <option value="veryActive">Very Active</option>
          <option value="extraActive">Extra Active</option>
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
