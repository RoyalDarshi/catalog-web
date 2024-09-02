import React, { lazy, Suspense } from 'react';

const LazyEditBuPriceDetails = lazy(() => import('./EditBuPriceDetails'));

const EditBuPriceDetails = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyEditBuPriceDetails {...props} />
  </Suspense>
);

export default EditBuPriceDetails;
