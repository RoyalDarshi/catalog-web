import React, { lazy, Suspense } from 'react';

const LazyCatalogGridView = lazy(() => import('./CatalogGridView'));

const CatalogGridView = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogGridView {...props} />
  </Suspense>
);

export default CatalogGridView;
