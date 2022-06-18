import React from 'react';
import { TopBar } from './TopBar/TopBar';
import styles from './Upload.module.css';

interface Props {
  signOut: () => void;
}

export const Upload: React.FC<Props> = (props) => {
  const { signOut } = props;

  return (
    <div className={styles.uploadContainer}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', top: '5%' }}>
        <TopBar signOut={signOut} />
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
