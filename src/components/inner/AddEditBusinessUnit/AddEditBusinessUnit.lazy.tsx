import React, { lazy, Suspense } from 'react';

const LazyAddEditBusinessUnit = lazy(() => import('./AddEditBusinessUnit'));

const AddEditBusinessUnit = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddEditBusinessUnit {...props} />
  </Suspense>
);

export default AddEditBusinessUnit;
