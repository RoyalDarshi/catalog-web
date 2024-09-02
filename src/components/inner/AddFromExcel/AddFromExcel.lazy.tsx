import React, { lazy, Suspense } from 'react';

const LazyAddFromExcel = lazy(() => import('./AddFromExcel'));

const AddFromExcel = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddFromExcel {...props} />
  </Suspense>
);

export default AddFromExcel;
