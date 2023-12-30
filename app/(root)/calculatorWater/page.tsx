"use client"
import React, { useState, ChangeEvent } from 'react';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [waterIntake, setWaterIntake] = useState('');

  const calculateWaterIntake = () => {
    const parsedWeight = parseFloat(weight);

    if (!isNaN(parsedWeight) && parsedWeight > 0) {
      let intakeMultiplier = 0;

      switch (activityLevel) {
        case 'sedentary':
          intakeMultiplier = 30;
          break;
        case 'moderate':
          intakeMultiplier = 35;
          break;
        case 'active':
          intakeMultiplier = 40;
          break;
        default:
          intakeMultiplier = 30;
          break;
      }

      const calculatedIntake = (parsedWeight * intakeMultiplier) / 1000;
      setWaterIntake(calculatedIntake.toFixed(2));
    }
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleActivityLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setActivityLevel(e.target.value);
  };

  return (
    <div className="bg-black text-white p-8 rounded">
      <h1 className="head-text text-3xl mb-4">Daily water requirements calculator</h1>
      <div className="mb-4">
        <label htmlFor="weightInput" className="mr-2">
          Weight (in kg):
        </label>
        <input
          id="weightInput"
          type="number"
          value={weight}
          onChange={handleWeightChange}
          className="bg-white text-black p-2 rounded border-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="activityLevelSelect" className="mr-2">
          Activity Level:
        </label>
        <select
          id="activityLevelSelect"
          value={activityLevel}
          onChange={handleActivityLevelChange}
          className="bg-white text-black p-2 rounded border-none"
        >
          <option value="sedentary">Sedentary</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
        </select>
      </div>
      <button className="bg-sky-500 text-white px-4 py-2 rounded" onClick={calculateWaterIntake}>
        Calculate water requirements
      </button>
      {waterIntake && (
        <div className="mt-4">
          <h2>Your Recommended Daily Water Intake is: {waterIntake} liters</h2>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeCalculator;
