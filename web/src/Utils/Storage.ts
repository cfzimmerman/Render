import { Storage } from '@aws-amplify/storage';

export const upload = async (
  fileName: string,
  file: File,
  progressCallback: (progress: number) => void
) => {
  await Storage.put(fileName, file, {
    progressCallback
  });
};
