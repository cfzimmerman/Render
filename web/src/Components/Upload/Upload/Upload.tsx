/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Upload.module.css';

interface Props {
  setFiles: (files: File[]) => void;
}

const uploadAcceptStyle = {
  borderColor: 'var(--success-green)'
};

const uploadRejectStyle = {
  borderColor: 'var(--reject-red)'
};

export const Upload: React.FC<Props> = (props) => {
  const { setFiles } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    (files: File[]) => {
      const sorted = files.sort((a, b) => {
        if (a.type.includes('image') && b.type.includes('video')) {
          return -1;
        }
        if (a.type.includes('video') && b.type.includes('image')) {
          return 1;
        }
        return 0;
      });
      setFiles(sorted);
    },
    [setFiles]
  );

  const onDrop = useCallback(
    (files: File[]) => {
      if (!!files && !!files.length) handleUpload(files);
    },
    [handleUpload]
  );

  const { isDragAccept, isDragReject, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/*': [] }
  });

  const handleClickUpload = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const uploadStyle = useMemo(
    () => ({
      ...(isDragAccept ? uploadAcceptStyle : {}),
      ...(isDragReject ? uploadRejectStyle : {})
    }),
    [isDragAccept, isDragReject]
  );

  return (
    <div className={styles.content}>
      <div {...getRootProps({ className: styles.contentBox, style: uploadStyle })}>
        <input
          ref={fileInput}
          {...getInputProps({
            type: 'file',
            onChange: (event) => {
              if (event.target.files) handleUpload(Array.from(event.target.files));
            },
            accept: 'image/*,video/*',
            multiple: true
          })}
        />
        <button className={styles.uploadButton} type="button" onClick={handleClickUpload}>
          <h3>Drag and drop or</h3>
          <h3>Click here to upload</h3>
        </button>
      </div>
    </div>
  );
};
