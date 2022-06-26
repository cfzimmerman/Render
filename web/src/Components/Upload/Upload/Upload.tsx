import React, { ChangeEvent, useRef } from 'react';
import styles from './Upload.module.css';

interface Props {
  setFiles: (files: FileList) => void;
}

export const Upload: React.FC<Props> = (props) => {
  const { setFiles } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleClickUpload = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <div className={styles.content}>
      <input type="file" ref={fileInput} onChange={handleUpload} accept="image/*,video/*" />
      <button className={styles.uploadButton} type="button" onClick={handleClickUpload}>
        <h3>Drag and drop or</h3>
        <h3>click here to upload</h3>
      </button>
    </div>
  );
};
