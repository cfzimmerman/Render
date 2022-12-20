import React from 'react';
import { Button } from '../../Common/Button/Button';
import styles from './AbsoluteButton.module.css';

interface Props {
  text: string;
  onClick: () => void;
}

export const AbsoluteButton: React.FC<Props> = (props) => {
  const { text, onClick } = props;

  return (
    <div className={styles.absoluteButtonContainer}>
      <Button text={text} onClick={onClick} classNames={[styles.absoluteButton]} />
    </div>
  );
};
