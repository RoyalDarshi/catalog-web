import React, { lazy, Suspense } from 'react';

const LazyCatalogFilterPanel = lazy(() => import('./SearchFilterPanel'));

const CatalogFilterPanel = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogFilterPanel {...props} />
  </Suspense>
);

export default CatalogFilterPanel;
