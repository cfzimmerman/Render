import clsx from 'clsx';
import React from 'react';
import styles from './Button.module.css';

interface Props {
  text: string;
  classNames?: string[];
  onClick: () => void;
}

export const Button: React.FC<Props> = (props) => {
  const { text, classNames, onClick } = props;

  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={clsx(styles.button, ...(classNames ?? []))}>
      {text}
    </button>
  );
};
