import React, { useEffect, useState } from 'react';
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
        return <img alt="" className={styles.image} src={contentUrl} />;
      case 'video':
        return (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video className={styles.video} controls>
            <source src={contentUrl} type="video/mp4" />
            <source src={contentUrl} type="video/ogg" />
          </video>
        );
      default:
        return <div />; // TODO: Add loading component here
    }
  };

  const backgroundStyles: React.CSSProperties = {
    backgroundImage:
      type === 'image'
        ? `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${contentUrl})`
        : `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) )`
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer} style={backgroundStyles} />
      {getComponent()}
    </div>
  );
};
