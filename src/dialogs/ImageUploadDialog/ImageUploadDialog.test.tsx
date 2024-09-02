import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ImageUploadDialog from './ImageUploadDialog';

describe('<ImageUploadDialog />', () => {
  test('it should mount', () => {
    render(<ImageUploadDialog />);
    
    const imageUploadDialog = screen.getByTestId('ImageUploadDialog');

    expect(imageUploadDialog).toBeInTheDocument();
  });
});