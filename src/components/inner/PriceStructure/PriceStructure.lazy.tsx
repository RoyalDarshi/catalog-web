import React, { lazy, Suspense } from 'react';

const LazyPriceStructure = lazy(() => import('./PriceStructure'));

const PriceStructure = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPriceStructure {...props} />
  </Suspense>
);

export default PriceStructure;
