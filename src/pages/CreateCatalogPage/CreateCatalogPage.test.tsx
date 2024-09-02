import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateCatalogPage from './CreateCatalogPage';

describe('<CreateCatalogPage />', () => {
  test('it should mount', () => {
    render(<CreateCatalogPage popOpenModal={function(): void {
        throw new Error('Function not implemented.');
    } } />);
    
    const createCatalogPage = screen.getByTestId('CreateCatalogPage');

    expect(createCatalogPage).toBeInTheDocument();
  });
});