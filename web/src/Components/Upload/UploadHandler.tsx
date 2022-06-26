import React, { useState } from 'react';
import { generateVideoThumbnail } from '../../Utils/Content';
import { upload } from '../../Utils/Storage';
import { getUserSub } from '../../Utils/Users';
import { Button } from '../Common/Button/Button';
import { RoundedImage } from '../Common/RoundedImage/RoundedImage';
import { TopBar } from './TopBar/TopBar';
import { Upload } from './Upload/Upload';
import styles from './UploadHandler.module.css';

interface Props {
  signOut: () => void;
}

const getAspectRatio = (height: number, width: number) => parseFloat((height / width).toFixed(3));

export const UploadHandler: React.FC<Props> = (props) => {
  const { signOut } = props;

  const [files, setFiles] = useState<FileList>();
  const [thumbnail, setThumbnail] = useState<File>();
  const [filePreviewUrl, setFilePreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(0);

  const handleUploadFiles = async (fileList: FileList) => {
    setFiles(fileList);
    let contentType: 'video' | 'image' = 'video';
    if (fileList[0].type.includes('image')) {
      setFilePreviewUrl(URL.createObjectURL(fileList[0]));
      contentType = 'image';
    } else if (fileList[0].type.includes('video')) {
      const newThumbnail = await generateVideoThumbnail(fileList[0]);
      setFilePreviewUrl(URL.createObjectURL(newThumbnail));
      setThumbnail(newThumbnail);
    }
    const userSub = await getUserSub();
    upload(
      fileList[0],
      userSub,
      contentType,
      aspectRatio,
      (progress) => {
        setUploadProgress(Math.round((progress.loaded / progress.total) * 100));

        // Ideally would use completeCallback, but that is not firing as expected
        if (progress.loaded / progress.total === 1) {
          setUploadComplete(true);
        }
      },
      () => {
        setUploadComplete(true);
      },
      thumbnail
    );
  };

  const resetUploadData = () => {
    setFiles(undefined);
    setFilePreviewUrl('');
    setUploadProgress(0);
    setUploadComplete(false);
    setAspectRatio(0);
    setThumbnail(undefined);
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.topBarContainer}>
        <TopBar signOut={signOut} />
      </div>
      <div className={styles.fileContainer}>
        {!files && <Upload setFiles={handleUploadFiles} />}
        {filePreviewUrl && (
          <RoundedImage
            source={filePreviewUrl}
            alt="uploaded-file-preview"
            setImageDimensions={(height, width) => setAspectRatio(getAspectRatio(height, width))}
          />
          //  ) : (
          //    <h3>Uploading video...</h3>
        )}
        {!!files && <h3>{`${uploadProgress}% uploaded`}</h3>}
        {uploadComplete && (
          <div className={styles.finishedContainer}>
            <h3>Upload finished!</h3>
            <Button
              text="Upload another file"
              onClick={resetUploadData}
              classNames={[styles.uploadAgainButton]}
            />
          </div>
        )}
      </div>
    </div>
  );
};
