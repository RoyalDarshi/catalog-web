import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CatalogDetailsPage from './CatalogDetailsPage';

describe('<CatalogDetailsPage />', () => {
  test('it should mount', () => {
    render(<CatalogDetailsPage />);
    
    const catalogDetailsPage = screen.getByTestId('CatalogDetailsPage');

    expect(catalogDetailsPage).toBeInTheDocument();
  });
});