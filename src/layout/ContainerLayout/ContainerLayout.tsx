import React, { FC } from 'react';
import styles from './ContainerLayout.module.scss';

interface ContainerLayoutProps {}

const ContainerLayout: FC<ContainerLayoutProps> = () => (
  <div className={styles.ContainerLayout} data-testid="ContainerLayout">

  </div>
);

export default ContainerLayout;
