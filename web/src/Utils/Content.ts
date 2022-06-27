import {
  generateVideoThumbnails,
  generateVideoThumbnailViaUrl
} from '@rajesh896/video-thumbnails-generator';
import { v4 } from 'uuid';

// const fs = require('browserify-fs');

// export const saveToBrowserFs = (file: string) => {
//   fs.mkdir('/files', () => {
//     fs.writeFile('/files/thumbnail.jpeg', 'Hello world!\n', () => {
//       fs.readFile('/home/hello-world.txt', 'utf-8', (err, data) => {
//         console.log(data);
//       });
//     });
//   });
// };

export const blobToImage = (blob: string): File =>
  // const byteCharacters = atob(blob);
  // const byteNumbers = new Array(byteCharacters.length);
  // // eslint-disable-next-line no-plusplus
  // for (let i = 0; i < byteCharacters.length; i++) {
  //   byteNumbers[i] = byteCharacters.charCodeAt(i);
  // }
  // const byteArray = new Uint8Array(byteNumbers);
  new File([blob], 'thumbnail1.png', { type: 'image/png' });
export const generateVideoThumbnail = async (file: File): Promise<string> => {
  const array = await generateVideoThumbnails(file, 0, '');
  const arr = await generateVideoThumbnailViaUrl(URL.createObjectURL(file), 0);
  return arr;
  // console.log(arr);
  // return blobToImage(arr);
};

export const dataURItoBlob = (data: string) => {
  const binary = atob(data.split(',')[1]);
  const array = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/png' });
};

export const getFileType = (type: string): string => type.replace(/(.*)\//g, '');
