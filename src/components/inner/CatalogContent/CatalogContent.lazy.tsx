import React, { lazy, Suspense } from 'react';

const LazyCatalogContent = lazy(() => import('./CatalogContent'));

const CatalogContent = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogContent {...props} />
  </Suspense>
);

export default CatalogContent;
