import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RenewCatalogPage from './RenewCatalogPage';

describe('<RenewCatalogPage />', () => {
  test('it should mount', () => {
    render(<RenewCatalogPage />);
    
    const editCatalogPage = screen.getByTestId('RenewCatalogPage');

    expect(editCatalogPage).toBeInTheDocument();
  });
});