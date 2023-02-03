import React, { useContext, useEffect, useState } from "react";
import { FileDescriptor } from "../Application/types";
import { UserContext } from "../Context/UserContext";

export const Main: React.FC<{}> = () => {
  const { user, setUser } = useContext(UserContext);
  const [files, setFiles] = useState<FileDescriptor[]>([]);
  const [file, setFile] = useState<string>("");

  window.electron.onUpdateFiles((value) => {
    setFiles(value);
  });

  useEffect(() => {
    const filesystemOps = async () => {
      window.electron.invokeFsOpen();
      console.log("files: ", await window.electron.getFiles());
    };
    filesystemOps();
    console.log("main: ", user, setUser);
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
    <div>
      <h1>Logged in!</h1>
      {file && <img src={file} />}
    </div>
  );
};
