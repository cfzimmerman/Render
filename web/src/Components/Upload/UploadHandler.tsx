import React, { useState } from 'react';
import { upload } from '../../Utils/Storage';
import { RoundedImage } from '../Common/RoundedImage/RoundedImage';
import { TopBar } from './TopBar/TopBar';
import { Upload } from './Upload/Upload';
import styles from './UploadHandler.module.css';

interface Props {
  signOut: () => void;
}

export const UploadHandler: React.FC<Props> = (props) => {
  const { signOut } = props;

  const [files, setFiles] = useState<FileList>();
  const [filePreviewUrl, setFilePreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadFiles = (fileList: FileList) => {
    setFiles(fileList);
    if (fileList[0].type.includes('image')) {
      setFilePreviewUrl(URL.createObjectURL(fileList[0]));
    }
    upload(fileList[0].name, fileList[0], (progress) => {
      setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
    });
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.topBarContainer}>
        <TopBar signOut={signOut} />
      </div>
      <div className={styles.fileContainer}>
        {!files && <Upload setFiles={handleUploadFiles} />}
        {filePreviewUrl ? (
          <RoundedImage source={filePreviewUrl} alt="uploaded-file-preview" />
        ) : (
          <h3>Uploading video...</h3>
        )}
        {!!files && <h3>{`${uploadProgress}% uploaded`}</h3>}
      </div>
    </div>
  );
};
