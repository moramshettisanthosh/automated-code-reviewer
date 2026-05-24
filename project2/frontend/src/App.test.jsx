import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders landing page content', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/NovaReviewAI makes every code review faster/i)).toBeTruthy();
});
