import React, { lazy, Suspense } from 'react';

const LazyCatalogTopbar = lazy(() => import('./CatalogTopbar'));

const CatalogTopbar = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogTopbar {...props} />
  </Suspense>
);

export default CatalogTopbar;
