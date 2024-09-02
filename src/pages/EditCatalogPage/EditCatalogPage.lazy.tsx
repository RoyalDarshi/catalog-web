import React, { lazy, Suspense } from 'react';

const LazyEditCatalogPage = lazy(() => import('./EditCatalogPage'));

const EditCatalogPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyEditCatalogPage getCatlogId={function (catlogid: string): void {
        throw new Error('Function not implemented.');
    }} {...props} />
  </Suspense>
);

export default EditCatalogPage;
