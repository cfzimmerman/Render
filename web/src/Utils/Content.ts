import { generateVideoThumbnailViaUrl } from '@rajesh896/video-thumbnails-generator';

export const generateVideoThumbnail = async (file: File): Promise<string> => {
  const arr = await generateVideoThumbnailViaUrl(URL.createObjectURL(file), 0);
  return arr;
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
