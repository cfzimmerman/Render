import path from "path";
import fs from "fs-extra";
import os from "os";
import open from "open";
import chokidar from "chokidar";
import { notifyFilesAdded } from "./notification";
import { BrowserWindow } from "electron";

export interface FileObj {
  name: string;
  path: string;
}

const appDir = path.resolve(os.homedir(), "electron-app-files");

export const getFiles = () => {
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
    open(filePath);
  }
};

// watch files from the application's storage directory
export const watchFiles = (win: BrowserWindow) => {
  chokidar.watch(appDir).on("unlink", (filepath) => {
    win.webContents.send("app:delete-file", path.parse(filepath).base);
  });
};
