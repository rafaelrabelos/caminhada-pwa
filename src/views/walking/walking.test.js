import React from 'react';
import { render, screen } from '@testing-library/react';
import Walking from './walking';

test('renders learn react link', () => {
  render(<Walking />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
