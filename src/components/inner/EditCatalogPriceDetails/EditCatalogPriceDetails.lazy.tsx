import React, { lazy, Suspense } from 'react';

const LazyCatalogPriceDetails = lazy(() => import('./EditCatalogPriceDetails'));

const EditCatalogPriceDetails = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogPriceDetails {...props} />
  </Suspense>
);

export default EditCatalogPriceDetails;
