import React, { lazy, Suspense } from 'react';

const LazyMediaUpload = lazy(() => import('./MediaUpload'));

const MediaUpload = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMediaUpload {...props} />
  </Suspense>
);

export default MediaUpload;
