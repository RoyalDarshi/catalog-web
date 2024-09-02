import React, { lazy, Suspense } from 'react';

const LazyCatalogUploadedItem = lazy(() => import('./CatalogUploadedItem'));

const CatalogUploadedItem = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogUploadedItem {...props} />
  </Suspense>
);

export default CatalogUploadedItem;
