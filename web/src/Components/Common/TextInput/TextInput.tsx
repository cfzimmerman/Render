import React from 'react';
import clsx from 'clsx';
import styles from './TextInput.module.css';

interface Props {
  placeholder: string;
  value: string;
  disabled?: boolean;
  error?: boolean;
  onChange: (val: string) => void;
  onSubmit?: () => void;
}

export const TextInput: React.FC<Props> = (props) => {
  const { value, placeholder, disabled, error, onChange, onSubmit } = props;

  return (
    <input
      disabled={disabled}
      value={value}
      className={clsx(styles.textInput, error && styles.textInputError)}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && !!onSubmit) onSubmit();
      }}
    />
  );
};
