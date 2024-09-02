import React, { lazy, Suspense } from 'react';

const LazyIconPopup = lazy(() => import('./IconPopup'));

const IconPopup = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyIconPopup {...props} />
  </Suspense>
);

export default IconPopup;
