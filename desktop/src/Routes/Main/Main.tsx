import React, { useContext, useEffect, useState } from "react";
import { FileDescriptor } from "../../Application/types";
import { ImageRow } from "../../Components/Common/ImageRow/ImageRow";
import { TopBanner } from "../../Components/TopBanner/TopBanner";
import { UserContext } from "../../Context/UserContext";
import { splitArrayIntoChunks } from "../../Utils/array";
import styles from "./Main.module.css";

export const Main: React.FC<{}> = () => {
  const { user, setUser } = useContext(UserContext);
  const [files, setFiles] = useState<FileDescriptor[]>([]);
  const [file, setFile] = useState<string>("");
  const [imageBaseWidth, setImageBaseWidth] = useState<number>(
    window.innerWidth / 7
  );
  const [uploadFileMap, setUploadFileMap] = useState(
    Object.fromEntries(files.map((f) => [f.path, false]))
  );

  console.log(uploadFileMap);
  const chunkedFiles = splitArrayIntoChunks(
    files.map((file) => ({ ...file, setToUpload: uploadFileMap[file.path] })),
    4
  );

  window.electron.onUpdateFiles((value) => {
    setFiles(value);
  });

  const handleResize = () => {
    setImageBaseWidth(window.innerWidth / 7);
  };

  const setUploadFiles = (path: string, val: boolean) => {
    if (!(path in uploadFileMap)) {
      return;
    }
    setUploadFileMap({ ...uploadFileMap, [path]: val });
    console.log(uploadFileMap);
  };

  useEffect(() => {
    setUploadFileMap(
      Object.fromEntries(
        files.map((f) => {
          if (f.path in uploadFileMap) {
            return [f.path, uploadFileMap[f.path]];
          }
          return [f.path, false];
        })
      )
    );
  }, [files]);

  useEffect(() => {
    const filesystemOps = async () => {
      // window.electron.invokeFsOpen();
      const initialFiles = await window.electron.getFiles();
      console.log("files: ", initialFiles);
      setFiles(initialFiles);
    };
    filesystemOps();

    // Add resize event listener for images
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("updated files: ", files);
    const t = async () => {
      if (files && files.length) {
        const img = await window.electron.loadFile(files[0].path);
        console.log("img: ", img);
        setFile(img);
        // setFile(URL.createObjectURL(img));
      }
    };
    t();
  }, [files]);

  return (
    <>
      {/* <h1>Logged in!</h1> */}
      <TopBanner
        readyToUpload={false}
        clearUpload={() =>
          setUploadFileMap(
            Object.fromEntries(files.map((file) => [file.path, false]))
          )
        }
      />
      <div className={styles.body}>
        {chunkedFiles.map((row) => (
          <ImageRow
            images={row}
            baseWidth={imageBaseWidth}
            toggleUpload={setUploadFiles}
          />
        ))}
      </div>
    </>
  );
};
