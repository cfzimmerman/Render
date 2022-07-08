import React, { ChangeEvent, useRef } from 'react';
import styles from './Upload.module.css';

interface Props {
  setFiles: (files: File[]) => void;
}

export const Upload: React.FC<Props> = (props) => {
  const { setFiles } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const sorted = Array.from(event.target.files).sort((a, b) => {
        if (a.type.includes('image') && b.type.includes('video')) {
          return -1;
        }
        if (a.type.includes('video') && b.type.includes('image')) {
          return 1;
        }
        return 0;
      });
      setFiles(sorted);
    }
  };

  const handleClickUpload = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <div className={styles.content}>
      <input
        type="file"
        ref={fileInput}
        onChange={handleUpload}
        accept="image/*,video/*"
        multiple
      />
      <button className={styles.uploadButton} type="button" onClick={handleClickUpload}>
        {/* <h3>Drag and drop or</h3> */}
        <h3>Click here to upload</h3>
      </button>
    </div>
  );
};
