import React, { useEffect, useState } from 'react';
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

interface UploadState {
  uploadNext: boolean;
  fileUploadIndex: number;
  uploadComplete: boolean;
  aspectRatio: number;
}

const getAspectRatio = (height: number, width: number) => parseFloat((width / height).toFixed(3));

export const UploadHandler: React.FC<Props> = (props) => {
  const { signOut } = props;

  const [files, setFiles] = useState<File[]>();
  const [thumbnail, setThumbnail] = useState<string>('');
  const [filePreviewUrl, setFilePreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Upload state
  // Grouping these together as certain state updates need to be done atomically to prevent race conditions.
  const [uploadState, setUploadState] = useState<UploadState>({
    uploadNext: false,
    uploadComplete: false,
    fileUploadIndex: 0,
    aspectRatio: 0
  });

  const { uploadComplete, aspectRatio, fileUploadIndex, uploadNext } = uploadState;

  const handleFilePreview = async (file: File) => {
    if (file.type.includes('image')) {
      setFilePreviewUrl(URL.createObjectURL(file));
    } else if (file.type.includes('video')) {
      const newThumbnail = await generateVideoThumbnail(file);
      setFilePreviewUrl(newThumbnail);
      setThumbnail(newThumbnail);
    }
  };

  const handleUploadFiles = async (fileList: File[]) => {
    setFiles(fileList);
    setUploadState({ ...uploadState, uploadNext: true });
    await handleFilePreview(fileList[0]);
  };

  const resetUploadData = () => {
    setFiles(undefined);
    setFilePreviewUrl('');
    setUploadProgress(0);
    setThumbnail('');
    setUploadState({
      uploadNext: false,
      uploadComplete: false,
      fileUploadIndex: 0,
      aspectRatio: 0
    });
  };

  useEffect(() => {
    const doUpload = async (index: number) => {
      if (!files || index >= files.length) {
        return;
      }

      let contentType: 'video' | 'image' = 'video';
      if (files[index].type.includes('image')) {
        contentType = 'image';
      }

      const userSub = await getUserSub();
      upload(
        files[index],
        userSub,
        contentType,
        aspectRatio,
        (progress) => {
          setUploadProgress(Math.round((progress.loaded / progress.total) * 100));

          // Ideally would use completeCallback, but that is not firing as expected
          if (progress.loaded / progress.total === 1) {
            setUploadState({
              ...uploadState,
              fileUploadIndex: index + 1,
              aspectRatio: 0,
              uploadNext: index + 1 < files.length
            });
            setThumbnail('');
            setFilePreviewUrl('');
          }
        },
        () => {},
        thumbnail
      );
    };

    if (!!files && fileUploadIndex < files.length && !uploadComplete) {
      // Kick off upload when aspect ratio is set from loaded image
      // Ideally would be done using a setState callback like in class based React,
      // but useState does not natively provide callback functionality.
      if (!!aspectRatio && uploadNext) {
        setUploadState({ ...uploadState, uploadNext: false });
        doUpload(fileUploadIndex);
      } else if (!thumbnail && !filePreviewUrl) {
        handleFilePreview(files[fileUploadIndex]);
      }
    } else if (!!files && fileUploadIndex >= files.length && !uploadComplete) {
      setUploadState({ ...uploadState, uploadComplete: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, fileUploadIndex, uploadComplete, aspectRatio, uploadNext]);

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
            setImageDimensions={(height, width) =>
              setUploadState({ ...uploadState, aspectRatio: getAspectRatio(height, width) })
            }
          />
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
