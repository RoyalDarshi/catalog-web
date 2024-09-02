import React, { lazy, Suspense } from 'react';

const LazyCatalogTableView = lazy(() => import('./CatalogTableView'));

const CatalogTableView = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogTableView {...props} />
  </Suspense>
);

export default CatalogTableView;
