import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CatalogDashbordPage from './CatalogDashbordPage';

describe('<CatalogDashbordPage />', () => {
  test('it should mount', () => {
    render(<CatalogDashbordPage />);
    
    const catalogDashbordPage = screen.getByTestId('CatalogDashbordPage');

    expect(catalogDashbordPage).toBeInTheDocument();
  });
});