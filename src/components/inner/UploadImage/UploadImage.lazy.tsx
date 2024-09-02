import { AnyARecord } from 'dns';
import React, { lazy, Suspense } from 'react';

const LazyUploadImage = lazy(() => import('./UploadImage'));

const UploadImage = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyUploadImage {...props} />
  </Suspense>
);

export default UploadImage;
