import React, { lazy, Suspense } from 'react';

const LazyCatalogSupplier = lazy(() => import('./CatalogSupplier'));

const CatalogSupplier = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogSupplier {...props} />
  </Suspense>
);

export default CatalogSupplier;
