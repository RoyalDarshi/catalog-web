import React, { lazy, Suspense } from 'react';

const LazyCreateCatalogPage = lazy(() => import('./CreateCatalogPage'));

const CreateCatalogPage = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCreateCatalogPage {...props} />
  </Suspense>
);

export default CreateCatalogPage;
