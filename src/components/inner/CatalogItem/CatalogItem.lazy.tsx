import React, { lazy, Suspense } from 'react';

const LazyCatalogItem = lazy(() => import('./CatalogItem'));

const CatalogItem = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogItem {...props} />
  </Suspense>
);

export default CatalogItem;
