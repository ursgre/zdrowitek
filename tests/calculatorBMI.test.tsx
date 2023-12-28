import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BMICalculator from '../app/(root)/calculatorBMI/page';

test('calculates BMI correctly and shows interpretation', () => {
  const { getByLabelText, getByText } = render(<BMICalculator />);

  const heightInput = getByLabelText('Height (in cm):');
  const weightInput = getByLabelText('Weight (in kg):');
  const calculateButton = getByText('Calculate BMI');

  // Simulate user input
  fireEvent.change(heightInput, { target: { value: '175' } });
  fireEvent.change(weightInput, { target: { value: '70' } });

  fireEvent.click(calculateButton);

  // Check if BMI result and interpretation are displayed correctly
  expect(getByText('Your BMI is: 22.86')).toBeTruthy();
  expect(getByText('Interpretation: Normal Weight')).toBeTruthy();
});
