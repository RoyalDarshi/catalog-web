import React, { lazy, Suspense } from 'react';

const LazyInfoReqDialog = lazy(() => import('./InfoReqDialog'));

const InfoReqDialog = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInfoReqDialog {...props} />
  </Suspense>
);

export default InfoReqDialog;
