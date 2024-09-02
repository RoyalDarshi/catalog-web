import React, { lazy, Suspense } from 'react';

const LazyRenewCatalogPage = lazy(() => import('./RenewCatalogPage'));

const RenewCatalogPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRenewCatalogPage openModal={function (): void {
        throw new Error('Function not implemented.');
    }} getCatlogId={function (catlogid: string): void {
        throw new Error('Function not implemented.');
    }} onItemDataChange={function (itemData: object): void {
        throw new Error('Function not implemented.');
    }} buPriceTemplates={function (priceTemplates: any): void {
        throw new Error('Function not implemented.');
    }} {...props} />
  </Suspense>
);

export default RenewCatalogPage;
