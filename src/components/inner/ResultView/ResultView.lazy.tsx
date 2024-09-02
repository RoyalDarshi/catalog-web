import React, { lazy, Suspense } from 'react';

const LazyResultView = lazy(() => import('./ResultView'));

const ResultView = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyResultView {...props} />
  </Suspense>
);

export default ResultView;
