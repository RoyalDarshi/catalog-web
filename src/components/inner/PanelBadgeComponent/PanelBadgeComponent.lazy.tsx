import React, { lazy, Suspense } from 'react';

const LazyPanelBadgeComponent = lazy(() => import('./PanelBadgeComponent'));

const PanelBadgeComponent = (props: any & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPanelBadgeComponent {...props} />
  </Suspense>
);

export default PanelBadgeComponent;
