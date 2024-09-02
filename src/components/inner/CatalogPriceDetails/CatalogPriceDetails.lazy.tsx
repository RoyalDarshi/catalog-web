import React, { lazy, Suspense } from 'react';

const LazyCatalogPriceDetails = lazy(() => import('./CatalogPriceDetails'));

const CatalogPriceDetails = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogPriceDetails {...props} />
  </Suspense>
);

export default CatalogPriceDetails;
