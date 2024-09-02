import React, { lazy, Suspense } from 'react';

const LazyCatalogProductDetails = lazy(() => import('./CatalogProductDetails'));

const CatalogProductDetails = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogProductDetails {...props} />
  </Suspense>
);

export default CatalogProductDetails;
