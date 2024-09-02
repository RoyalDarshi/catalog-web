import React, { lazy, Suspense } from 'react';

const LazyCatalogCompanyDetails = lazy(() => import('./CatalogCompanyDetails'));

const CatalogCompanyDetails = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCatalogCompanyDetails {...props} />
  </Suspense>
);

export default CatalogCompanyDetails;
