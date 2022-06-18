import React from 'react';
import RenderIconWithName from '../../../assets/render_icon_with_name.png';
import styles from './TopBar.module.css';

interface Props {
  signOut: () => void;
}

export const TopBar: React.FC<Props> = (props) => {
  const { signOut } = props;

  return (
    <div className={styles.topBarContainer}>
      <img src={RenderIconWithName} className={styles.renderIcon} alt="Render-Icon" />
      <button className={styles.logOut} onClick={signOut} type="submit">
        Log out
      </button>
    </div>
  );
};
