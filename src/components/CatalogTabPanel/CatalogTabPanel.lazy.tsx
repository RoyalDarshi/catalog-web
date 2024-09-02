import React, { lazy, Suspense } from 'react';

const LazyCatalogTabPanel = lazy(() => import('./CatalogTabPanel'));

const CatalogTabPanel = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogTabPanel {...props} />
  </Suspense>
);

export default CatalogTabPanel;
