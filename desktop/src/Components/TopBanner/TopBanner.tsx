import React from "react";
import { Button } from "../Common/Button/Button";
import styles from "./TopBanner.module.css";

interface Props {
  doUpload: () => void;
  clearUpload: () => void;
}

export const TopBanner: React.FC<Props> = (props) => {
  const { doUpload, clearUpload } = props;

  return (
    <div className={styles.banner}>
      <Button
        onClick={clearUpload}
        text={"Clear files"}
        classNames={[styles.clearButton]}
      />
      <Button
        onClick={doUpload}
        text={"Upload"}
        classNames={[styles.clearButton, styles.uploadButton]}
      />
    </div>
  );
};
