import React, { lazy, Suspense } from 'react';

const LazyBuPriceDetails = lazy(() => import('./BuPriceDetails'));

const BuPriceDetails = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBuPriceDetails {...props} />
  </Suspense>
);

export default BuPriceDetails;
