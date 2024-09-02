import React, { lazy, Suspense } from 'react';

const LazyCatalogDetailsPage = lazy(() => import('./CatalogDetailsPage'));

const CatalogDetailsPage = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogDetailsPage {...props} />
  </Suspense>
);

export default CatalogDetailsPage;
