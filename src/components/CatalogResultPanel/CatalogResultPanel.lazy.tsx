import React, { lazy, Suspense } from 'react';

const LazyCatalogResultPanel = lazy(() => import('./CatalogResultPanel'));

const CatalogResultPanel = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogResultPanel {...props} />
  </Suspense>
);

export default CatalogResultPanel;
