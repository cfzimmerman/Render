import path from "path";
import fs from "fs-extra";
import os from "os";
import open from "open";
import chokidar from "chokidar";
import { notifyFilesAdded } from "./notification";
import { BrowserWindow } from "electron";
import { FileDescriptor } from "./types";

export interface FileObj {
  name: string;
  path: string;
}

// default storage directory
export const appDir = path.resolve(os.homedir(), "electron-app-files");

export const getFiles = (): FileDescriptor[] => {
  console.log("getting files");
  const files = fs.readdirSync(appDir);

  return files.map((filename) => {
    const filePath = path.resolve(appDir, filename);
    const fileStats = fs.statSync(filePath);

    return {
      name: filename,
      path: filePath,
      size: Number(fileStats.size / 1000).toFixed(1), // kb
    };
  });
};

export const addFiles = (files: FileObj[]) => {
  fs.ensureDirSync(appDir);

  // copy `files` recursively (ignore duplicate file names)
  files.forEach((file) => {
    const filePath = path.resolve(appDir, file.name);

    if (!fs.existsSync(filePath)) {
      fs.copyFileSync(file.path, filePath);
    }
  });

  // display notification
  notifyFilesAdded(files.length);
};

export const deleteFile = (filename: string) => {
  const filePath = path.resolve(appDir, filename);

  // remove file from the file system
  if (fs.existsSync(filePath)) {
    fs.removeSync(filePath);
  }
};

export const openFile = (filename: string) => {
  const filePath = path.resolve(appDir, filename);

  // open a file using default application
  if (fs.existsSync(filePath)) {
    // open(filePath);
    const imgString = fs.readFileSync(filePath).toString("base64");
    return `data:image/jpg;base64,${imgString}`;
  }
};

// watch files from the application's storage directory
export const watchFiles = (filepath: string, win: BrowserWindow) => {
  const sendUpdate = () => {
    const files = getFiles();
    win.webContents.send("app:update-files", files);
  };

  const watcher = chokidar.watch(filepath);
  watcher.on("unlink", (unlinkPath) => {
    win.webContents.send("app:delete-file", path.parse(unlinkPath).base);
    sendUpdate();
  });
  watcher.on("add", sendUpdate);
};
