import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DailyCalorieCalculator from '../app/(root)/calculatorCalories/page'; // Update the path to your DailyCalorieCalculator component

test('calculates daily calorie needs correctly', () => {
  const { getByLabelText, getByText } = render(<DailyCalorieCalculator />);

  const ageInput = getByLabelText('Age:');
  const genderSelect = getByLabelText('Gender:');
  const weightInput = getByLabelText('Weight (in kg):');
  const heightInput = getByLabelText('Height (in cm):');
  const activityLevelSelect = getByLabelText('Activity Level:');
  const goalSelect = getByLabelText('Goal:');
  const calculateButton = getByText('Calculate Calories');

  fireEvent.change(ageInput, { target: { value: '30' } });
  fireEvent.change(genderSelect, { target: { value: 'female' } });
  fireEvent.change(weightInput, { target: { value: '60' } });
  fireEvent.change(heightInput, { target: { value: '165' } });
  fireEvent.change(activityLevelSelect, { target: { value: 'moderatelyActive' } });
  fireEvent.change(goalSelect, { target: { value: 'lose' } });

  fireEvent.click(calculateButton);

  const expectedCalories = /Your estimated daily calorie needs: [\d.]+ calories/; // Regular expression matcher

  expect(getByText(expectedCalories)).toBeTruthy();
});
