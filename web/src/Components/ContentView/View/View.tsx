import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Navigate, useParams } from 'react-router-dom';
import { ContentWithType, getContentByPostId } from '../../../Utils/Content';
import styles from './View.module.css';

export const View: React.FC = () => {
  const { postId } = useParams();
  const [content, setContent] = useState<ContentWithType>({ contentUrl: '', type: '' });

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
    const { contentUrl, type } = content;
    switch (type) {
      case 'image':
        return <img alt="" src={contentUrl} />;
      case 'video':
        return <ReactPlayer url={contentUrl} controls />;
      default:
        return <div />; // TODO: Add loading component here
    }
  };

  return <div className={styles.contentContainer}>{getComponent()}</div>;
};
