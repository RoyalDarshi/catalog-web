import React, { lazy, Suspense } from 'react';

const LazyRejectDialog = lazy(() => import('./RejectDialog'));

const RejectDialog = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRejectDialog {...props} />
  </Suspense>
);

export default RejectDialog;
