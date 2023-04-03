import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import styles from "./RoundedImage.module.css";

interface Props {
  source: string;
  alt?: string;
  baseWidth?: number;
  setToUpload: boolean;
  toggleUpload: (val: boolean) => void;
  setImageDimensions?: (height: number, width: number) => void;
}

interface Dimensions {
  height: number;
  width: number;
}

export const RoundedImage: React.FC<Props> = (props) => {
  const {
    source,
    alt,
    baseWidth,
    setToUpload,
    toggleUpload,
    setImageDimensions,
  } = props;
  const firstRender = useRef(true); // Prevents baseWidth useEffect from overriding default values from img load

  const [dimensions, setDimensions] = useState<Dimensions>({
    height: 0,
    width: 0,
  });

  const handleResize = (height: number, width: number) => {
    const modifier = height / width;
    const base = baseWidth ?? 28;
    setDimensions({ height: base * modifier, width: base });

    if (setImageDimensions) {
      setImageDimensions(height, width);
    }
  };

  useEffect(() => {
    const { height, width } = dimensions;

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    handleResize(height, width);
  }, [baseWidth]);

  const onImgLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { height, width } = event.currentTarget;
    const modifier = height / width;
    const base = baseWidth ?? 28;
    setDimensions({ height: base * modifier, width: base });

    if (setImageDimensions) {
      setImageDimensions(height, width);
    }
  };

  return (
    <div
      className={clsx(styles.imageContainer, {
        // [styles.imageContainerDoUpload]: setToUpload, // Removing for now, have to fix sizing with image
      })}
    >
      <img
        src={source}
        alt={alt}
        style={
          !!dimensions.height && !!dimensions.width
            ? {
                height: `${dimensions.height}px`,
                width: `${dimensions.width}px`,
              }
            : {}
        }
        className={styles.roundedImage}
        onLoad={onImgLoad}
      />
      <button
        className={clsx(styles.uploadButton, {
          [styles.uploadButtonChecked]: setToUpload,
        })}
        onClick={() => {
          toggleUpload(!setToUpload);
        }}
      >
        <span>Upload</span>
      </button>
    </div>
  );
};
