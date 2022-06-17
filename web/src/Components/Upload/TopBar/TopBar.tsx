import React from 'react';
import RenderIconWithName from '../../../assets/render_icon_with_name.png';
import styles from './TopBar.module.css';

// eslint-disable-next-line arrow-body-style
export const TopBar: React.FC<{}> = () => {
  return (
    <div className={styles.topBarContainer}>
      <img src={RenderIconWithName} className={styles.renderIcon} alt="Render-Icon" />
      <h3 className={styles.logOut}>Log out</h3>
    </div>
  );
};
