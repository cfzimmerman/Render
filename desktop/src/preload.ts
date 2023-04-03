// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { FileDescriptor } from "./Application/types";

contextBridge.exposeInMainWorld("electron", {
  invokeFsOpen: () => ipcRenderer.invoke("app:on-fs-dialog-open"),
  getFiles: () => ipcRenderer.invoke("app:get-files"),
  addWatchPath: (filepath: string) =>
    ipcRenderer.invoke("app:watch-filepath", filepath),
  onUpdateFiles: (callback: (files: FileDescriptor[]) => void) => {
    ipcRenderer.on("app:update-files", (_, files: FileDescriptor[]) => {
      callback(files);
    });
  },
  loadFile: (filepath: string) => ipcRenderer.invoke("app:load-file", filepath),
});
