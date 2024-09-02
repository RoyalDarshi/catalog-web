import React, { FC } from 'react';
import styles from './CatalogDashbordPage.module.scss';

interface CatalogDashbordPageProps {}

const CatalogDashbordPage: FC<CatalogDashbordPageProps> = () => (
  <div className={styles.CatalogDashbordPage} data-testid="CatalogDashbordPage">
    CatalogDashbordPage Component
  </div>
);

export default CatalogDashbordPage;
