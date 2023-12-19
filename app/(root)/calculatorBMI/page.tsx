"use client"
import { useState, ChangeEvent } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');
  const [interpretation, setInterpretation] = useState('');

  const calculateBMI = () => {
    // Calculate BMI
    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);

    if (!isNaN(parsedHeight) && !isNaN(parsedWeight) && parsedHeight > 0 && parsedWeight > 0) {
      const heightInMeters = parsedHeight / 100;
      const bmi = parsedWeight / (heightInMeters * heightInMeters);
      setResult(bmi.toFixed(2));

      // Interpretation based on BMI categories
      if (bmi < 18.5) {
        setInterpretation('Underweight');
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setInterpretation('Normal Weight');
      } else if (bmi >= 25 && bmi < 29.9) {
        setInterpretation('Overweight');
      } else {
        setInterpretation('Obese');
      }
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  return (
    <div className="bg-black text-white p-8 rounded">
      <h1 className="head-text text-3xl mb-4">BMI Calculator</h1>
      <div className="mb-4">
        <label className="mr-2">Height (in cm):</label>
        <input type="number" value={height} onChange={handleHeightChange} className="bg-white text-black p-2 rounded border-none" />
      </div>
      <div className="mb-4">
        <label className="mr-2">Weight (in kg):</label>
        <input type="number" value={weight} onChange={handleWeightChange} className="bg-white text-black p-2 rounded border-none" />
      </div>
      <button className="bg-sky-500 text-white px-4 py-2 rounded" onClick={calculateBMI}>Calculate BMI</button>
      {result && (
        <div className="mt-4">
          <h2>Your BMI is: {result}</h2>
          <h3>Interpretation: {interpretation}</h3>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;

