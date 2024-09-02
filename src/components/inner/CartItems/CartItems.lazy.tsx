import React, { lazy, Suspense } from 'react';

const LazyCartItems = lazy(() => import('./CartItems'));

const CartItems = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCartItems {...props} />
  </Suspense>
);

export default CartItems;
