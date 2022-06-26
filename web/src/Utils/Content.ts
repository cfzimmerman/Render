import { generateVideoThumbnails } from '@rajesh896/video-thumbnails-generator';
import { v4 } from 'uuid';

const blobToImage = (blob: string): File => {
  const byteCharacters = atob(blob);
  const byteNumbers = new Array(byteCharacters.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], v4(), { type: 'image/jpeg' });
};

export const generateVideoThumbnail = async (file: File) => {
  const array = await generateVideoThumbnails(file, 1, 'image/png');
  console.log(array);
  return blobToImage(array[0]);
};
