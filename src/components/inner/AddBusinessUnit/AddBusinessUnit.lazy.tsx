import React, { lazy, Suspense } from 'react';

const LazyAddBusinessUnit = lazy(() => import('./AddBusinessUnit'));

const AddBusinessUnit = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddBusinessUnit {...props} />
  </Suspense>
);

export default AddBusinessUnit;
