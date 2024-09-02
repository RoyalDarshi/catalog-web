import React, { lazy, Suspense } from 'react';

const LazyImageUploadDialog = lazy(() => import('./ImageUploadDialog'));

const ImageUploadDialog = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyImageUploadDialog {...props} />
  </Suspense>
);

export default ImageUploadDialog;
