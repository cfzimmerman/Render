import React from "react";
import { FileDescriptor } from "../../../Application/types";
import { RoundedImage } from "../RoundedImage/RoundedImage";
import styles from "./ImageRow.module.css";

export type ImageData = FileDescriptor & { setToUpload: boolean };

interface Props {
  images: ImageData[];
  baseWidth?: number;
  toggleUpload: (path: string, val: boolean) => void;
}

export const ImageRow: React.FC<Props> = (props) => {
  const { images, baseWidth, toggleUpload } = props;

  return (
    <div className={styles.row}>
      {images.map((image) => (
        <RoundedImage
          source={image.image}
          baseWidth={baseWidth}
          setToUpload={image.setToUpload}
          toggleUpload={(val: boolean) => toggleUpload(image.path, val)}
        />
      ))}
    </div>
  );
};
