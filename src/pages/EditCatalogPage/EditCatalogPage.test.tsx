import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditCatalogPage from './EditCatalogPage';

describe('<EditCatalogPage />', () => {
  test('it should mount', () => {
    render(<EditCatalogPage />);
    
    const editCatalogPage = screen.getByTestId('EditCatalogPage');

    expect(editCatalogPage).toBeInTheDocument();
  });
});