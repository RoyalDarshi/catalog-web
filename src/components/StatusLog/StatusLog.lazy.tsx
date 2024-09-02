import React, { lazy, Suspense } from 'react';

const LazyStatusLog = lazy(() => import('./StatusLog'));

const StatusLog = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyStatusLog {...props} />
  </Suspense>
);

export default StatusLog;
