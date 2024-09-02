import React, { lazy, Suspense } from 'react';

const LazyCatalogHomePage = lazy(() => import('./CatalogHomePage'));

const CatalogHomePage = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogHomePage {...props} />
  </Suspense>
);

export default CatalogHomePage;
