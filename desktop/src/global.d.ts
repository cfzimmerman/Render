declare global {
  interface Window {
    electron: {
      invokeFsOpen: () => void;
    };
  }
}
export {};
