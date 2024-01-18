import Page from '../app/(root)/water/page';
import { act, render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { fetchUser } from "@/lib/actions/user.actions";
import React from 'react';


jest.mock('next/navigation', () => ({ redirect: jest.fn() }));
jest.mock('@clerk/nextjs', () => ({ currentUser: jest.fn() }));
jest.mock('@/lib/actions/user.actions.ts', () => ({ fetchUser: jest.fn() }));

describe('Water Page', () => {
  it('renders water intake form for onboarded user', async () => {
    // Mocking user data
    const mockUser = { id: 'mockUserId' };
    const mockUserInfo = { _id: 'mockUserId', onboarded: true };

    // Mocking functions
    (currentUser as jest.Mock).mockResolvedValue(mockUser);
    (fetchUser as jest.Mock).mockResolvedValue(mockUserInfo);

    // Render the page
    await act(async () => {
      render(<Page />);
    });

    // Assert that the water intake form is rendered
    expect(screen.getByText('Water')).toBeDefined();
    expect(screen.getByTestId('water-intake-form')).toBeDefined();
  });

  it('redirects to onboarding for non-onboarded user', async () => {
    // Mocking user data for a non-onboarded user
    const mockUser = { id: 'mockUserId' };
    const mockUserInfo = { _id: 'mockUserId', onboarded: false };

    // Mocking functions
    (currentUser as jest.Mock).mockResolvedValue(mockUser);
    (fetchUser as jest.Mock).mockResolvedValue(mockUserInfo);

    // Render the page
    await act(async () => {
      render(<Page />);
    });

    // Assert that redirect is called with the correct path
    expect(redirect).toHaveBeenCalledWith('/onboarding');
  });

  // Add more test cases as needed
});
