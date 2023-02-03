import { FileDescriptor } from "./Application/types";

declare global {
  interface Window {
    electron: {
      invokeFsOpen: () => void;
      getFiles: () => Promise<FileDescriptor>;
      addWatchPath: (filepath: string) => void;
      onUpdateFiles: (callback: (files: FileDescriptor[]) => void) => void;
      loadFile: (filepath: string) => Promise<File>;
    };
  }
}
export {};
