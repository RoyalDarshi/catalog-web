import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContainerLayout from './ContainerLayout';

describe('<ContainerLayout />', () => {
  test('it should mount', () => {
    render(<ContainerLayout />);
    
    const containerLayout = screen.getByTestId('ContainerLayout');

    expect(containerLayout).toBeInTheDocument();
  });
});