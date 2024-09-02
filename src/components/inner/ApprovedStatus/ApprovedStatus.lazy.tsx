import React, { lazy, Suspense } from 'react';

const LazyApprovedStatus = lazy(() => import('./ApprovedStatus'));

const ApprovedStatus = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyApprovedStatus {...props} />
  </Suspense>
);

export default ApprovedStatus;
