import React, { lazy, Suspense } from 'react';

const LazyCatalogCardView = lazy(() => import('./CatalogCardView'));

const CatalogCardView = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogCardView {...props} />
  </Suspense>
);

export default CatalogCardView;
