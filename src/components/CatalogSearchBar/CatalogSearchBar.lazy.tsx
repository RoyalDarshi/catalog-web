import React, { lazy, Suspense } from 'react';

const LazyCatalogSearchBar = lazy(() => import('./CatalogSearchBar'));

const CatalogSearchBar = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogSearchBar {...props} />
  </Suspense>
);

export default CatalogSearchBar;
