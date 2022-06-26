import React, { useState } from 'react';
import styles from './RoundedImage.module.css';

interface Props {
  source: string;
  alt: string;
  baseWidth?: number;
  setImageDimensions: (height: number, width: number) => void;
}

interface Dimensions {
  height: string;
  width: string;
}

const toRem = (num: number): string => `${num}rem`;

export const RoundedImage: React.FC<Props> = (props) => {
  const { source, alt, baseWidth, setImageDimensions } = props;

  const [dimensions, setDimensions] = useState<Dimensions>({ height: '', width: '' });

  const onImgLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { height, width } = event.currentTarget;
    const modifier = height / width;
    const base = baseWidth ?? 28;
    setDimensions({ height: toRem(base * modifier), width: toRem(base) });
    setImageDimensions(height, width);
  };

  return (
    <img
      src={source}
      alt={alt}
      style={
        !!dimensions.height && !!dimensions.width
          ? { height: dimensions.height, width: dimensions.width }
          : {}
      }
      className={styles.roundedImage}
      onLoad={onImgLoad}
    />
  );
};
