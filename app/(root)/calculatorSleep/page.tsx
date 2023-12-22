"use client"
import { useState, ChangeEvent } from 'react';

const SleepCalculator = () => {
  const [age, setAge] = useState('');
  const [recommendedSleep, setRecommendedSleep] = useState('');

  const calculateSleep = () => {
    const parsedAge = parseInt(age);

    if (!isNaN(parsedAge) && parsedAge >= 0) {
      let recommendedHours = '';

      // Calculate recommended sleep based on age range
      if (parsedAge >= 0 && parsedAge <= 3) {
        recommendedHours = '12 - 15 hours';
      } else if (parsedAge >= 4 && parsedAge <= 11) {
        recommendedHours = '9 - 11 hours';
      } else if (parsedAge >= 12 && parsedAge <= 17) {
        recommendedHours = '8 - 10 hours';
      } else if (parsedAge >= 18 && parsedAge <= 64) {
        recommendedHours = '7 - 9 hours';
      } else {
        recommendedHours = '7 - 8 hours';
      }

      setRecommendedSleep(recommendedHours);
    }
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  return (
    <div className="bg-black text-white p-8 rounded">
      <h1 className="head-text text-3xl mb-4">Sleep Calculator</h1>
      <div className="mb-4">
        <label className="mr-2">Enter Age:</label>
        <input type="number" value={age} onChange={handleAgeChange} className="bg-white text-black p-2 rounded border-none" />
      </div>
      <button className="bg-sky-500 text-white px-4 py-2 rounded" onClick={calculateSleep}>Calculate Sleep</button>
      {recommendedSleep && (
        <div className="mt-4">
          <h2>Recommended sleep duration: {recommendedSleep}</h2>
        </div>
      )}
    </div>
  );
};

export default SleepCalculator;
