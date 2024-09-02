import React, { lazy, Suspense } from 'react';

const LazyCatalogDashbordPage = lazy(() => import('./CatalogDashbordPage'));

const CatalogDashbordPage = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogDashbordPage {...props} />
  </Suspense>
);

export default CatalogDashbordPage;
