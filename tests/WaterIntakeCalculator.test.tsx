import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WaterIntakeCalculator from '../app/(root)/calculatorWater/page'; // Update the path to your WaterIntakeCalculator component

test('calculates water intake correctly', () => {
  const { getByLabelText, getByText } = render(<WaterIntakeCalculator />);

  const weightInput = getByLabelText('Weight (in kg):');
  const activityLevelSelect = getByLabelText('Activity Level:');
  const calculateButton = getByText('Calculate Water Intake');

  fireEvent.change(weightInput, { target: { value: '70' } });
  fireEvent.change(activityLevelSelect, { target: { value: 'active' } });

  fireEvent.click(calculateButton);

  const parsedWeight = parseFloat('70');
  let intakeMultiplier = 40; // Active level

  const expectedIntake = ((parsedWeight * intakeMultiplier) / 1000).toFixed(2) + ' liters';

  expect(getByText(`Your Recommended Daily Water Intake is: ${expectedIntake}`)).toBeTruthy();
});
