import React, { FC } from 'react';
import styles from './ImageUploadDialog.module.scss';

interface ImageUploadDialogProps {}

const ImageUploadDialog: FC<ImageUploadDialogProps> = () => (
  <div className={styles.ImageUploadDialog} data-testid="ImageUploadDialog">
    ImageUploadDialog Component
  </div>
);

export default ImageUploadDialog;
