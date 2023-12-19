"use client"
import { useState, ChangeEvent } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');

  const calculateBMI = () => {
    // Calculate BMI
    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);

    if (!isNaN(parsedHeight) && !isNaN(parsedWeight) && parsedHeight > 0 && parsedWeight > 0) {
      const heightInMeters = parsedHeight / 100;
      const bmi = (parsedWeight / (heightInMeters * heightInMeters)).toFixed(2);
      setResult(bmi.toString());
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', padding: '40px', borderRadius: '8px' }}>
      <h1 style={{ marginBottom: '20px' }}>BMI Calculator</h1>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Height (in cm):</label>
        <input type="number" value={height} onChange={handleHeightChange} style={{ color: '#000', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', border: 'none' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Weight (in kg):</label>
        <input type="number" value={weight} onChange={handleWeightChange} style={{ color: '#000', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', border: 'none' }} />
      </div>
      <button className="bg-sky-500 text-white px-4 py-2 rounded" onClick={calculateBMI}>Calculate BMI</button>
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Your BMI is: {result}</h2>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;

