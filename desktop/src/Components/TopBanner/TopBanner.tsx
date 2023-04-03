import React from "react";
import { Button } from "../Common/Button/Button";
import styles from "./TopBanner.module.css";

interface Props {
  readyToUpload: boolean;
  clearUpload: () => void;
}

export const TopBanner: React.FC<Props> = (props) => {
  const { readyToUpload, clearUpload } = props;

  return (
    <div className={styles.banner}>
      <Button
        onClick={clearUpload}
        text={"Clear files"}
        classNames={[styles.clearButton]}
      />
      <Button
        onClick={() => {}}
        text={"Upload"}
        classNames={[styles.clearButton, styles.uploadButton]}
      />
    </div>
  );
};
