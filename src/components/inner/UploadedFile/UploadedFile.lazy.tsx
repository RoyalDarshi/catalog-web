import React, { lazy, Suspense } from 'react';

const LazyUploadedFile = lazy(() => import('./UploadedFile'));

const UploadedFile = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyUploadedFile isEyeVisible={false} popupFileData={''} {...props} />
  </Suspense>
);

export default UploadedFile;
