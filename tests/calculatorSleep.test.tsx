import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SleepCalculator from '../app/(root)/calculatorSleep/page';

test('displays recommended sleep duration after age input and button click', async () => {
  render(<SleepCalculator />);

  const ageInput = screen.getByLabelText('Enter Age:') as HTMLInputElement;
  const calculateButton = screen.getByText('Calculate Sleep');

  // Set age to 10
  fireEvent.change(ageInput, { target: { value: '10' } });

  // Click the Calculate Sleep button
  fireEvent.click(calculateButton);

  // Wait for the recommended sleep duration text to appear based on the input age
  const recommendedSleepText = await screen.findByText('Recommended sleep duration: 9 - 11 hours');
  
  expect(recommendedSleepText).toBeTruthy();
});
