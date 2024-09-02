import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CatalogHomePage from './CatalogHomePage';

describe('<CatalogHomePage />', () => {
  test('it should mount', () => {
    render(<CatalogHomePage />);
    
    const catalogHomePage = screen.getByTestId('CatalogHomePage');

    expect(catalogHomePage).toBeInTheDocument();
  });
});