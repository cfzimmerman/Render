import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Navigate, useParams } from 'react-router-dom';
import { ContentWithType, getContentByPostId } from '../../../Utils/Content';
import styles from './View.module.css';

export const View: React.FC = () => {
  const { postId } = useParams();
  const [content, setContent] = useState<ContentWithType>({ contentUrl: '', type: '' });
  const { contentUrl, type } = content;

  useEffect(() => {
    const getContentUrl = async () => {
      const loadedContent = await getContentByPostId(postId ?? '');
      setContent(loadedContent);
    };
    getContentUrl();
  }, [postId, setContent]);

  if (!postId) {
    return <Navigate to="/not-found" />;
  }

  const getComponent = () => {
    switch (type) {
      case 'image':
        return <img alt="" className={styles.viewContent} src={contentUrl} />;
      case 'video':
        return (
          <ReactPlayer
            width="75%"
            height="75%"
            className={styles.viewContent}
            url={contentUrl}
            controls
          />
        );
      default:
        return <div />; // TODO: Add loading component here
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.contentContainer}
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) ), url(${contentUrl})`
        }}
      />
      {getComponent()}
    </div>
  );
};
