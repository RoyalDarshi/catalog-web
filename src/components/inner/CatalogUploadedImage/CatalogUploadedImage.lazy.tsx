import React, { lazy, Suspense } from 'react';

const LazyCatalogUploadedImage = lazy(() => import('./CatalogUploadedImage'));

const CatalogUploadedImage = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogUploadedImage {...props} />
  </Suspense>
);

export default CatalogUploadedImage;
