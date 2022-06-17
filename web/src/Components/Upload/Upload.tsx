import React from 'react';
import { TopBar } from './TopBar/TopBar';
import styles from './Upload.module.css';

// eslint-disable-next-line arrow-body-style
export const Upload: React.FC<{}> = () => {
  return (
    <div className={styles.uploadContainer}>
      <div style={{ width: '100%', display: 'absolute', top: '5%', right: '50%' }}>
        <TopBar />
      </div>

      <div className={styles.content}>
        <button className={styles.uploadButton} type="button">
          <h3>Drag and drop or</h3>
          <h3>click here to upload</h3>
        </button>
      </div>
    </div>
  );
};
