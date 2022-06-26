import API, { graphqlOperation } from '@aws-amplify/api';
import { Storage } from '@aws-amplify/storage';
import { v4 } from 'uuid';
import { createPosts, updateUsers } from '../graphql/mutations';
import { getUserByCognitoSub } from './Users';

export interface DbPostData {
  contenttype: 'image' | 'video';
  aspectratio: number;
  contentkey: string;
  thumbnailkey: string | null;
  publicpost: false;
  cognitosub: string;
  contentdate: string;
  type: 'post';
  sizeinbytes: number;
}

export const addPostToDb = async (postData: DbPostData, sub: string) => {
  const { sizeinbytes } = postData;

  // Update storage size
  const userData = await getUserByCognitoSub(sub, 'id\nemail\nstoragesizeinbytes');

  // TODO: Make more descriptive error type
  if (!userData) {
    throw new Error('Error retrieving user data');
  }

  const { storagesizeinbytes: currentSize, id: userId } = userData;

  await API.graphql(graphqlOperation(createPosts, { input: { ...postData, usersID: userId } }));

  const newSize = (currentSize || 0) + sizeinbytes;

  const updatedUser = {
    id: userId,
    storagesizeinbytes: newSize,
    firstvaultupload: true
  };

  await API.graphql(graphqlOperation(updateUsers, { input: updatedUser }));
};

export const generatePostData = (
  file: File,
  sub: string,
  contentKey: string,
  aspectRatio: number,
  contentType: 'image' | 'video',
  thumbnailKey?: string
): DbPostData => ({
  contenttype: contentType,
  contentkey: contentKey,
  thumbnailkey: thumbnailKey ?? null,
  publicpost: false,
  cognitosub: sub,
  contentdate: new Date().toISOString(),
  type: 'post',
  sizeinbytes: file.size,
  aspectratio: aspectRatio
});

export const upload = async (
  file: File,
  sub: string,
  contentType: 'image' | 'video',
  aspectRatio: number,
  progressCallback: (progress: any) => void,
  completeCallback: (event: any) => void,
  thumbnail?: File
) => {
  const contentKey = v4();
  await Storage.put(contentKey, file, {
    progressCallback,
    completeCallback
  });

  let thumbnailKey = '';
  if (thumbnail) {
    thumbnailKey = v4();
    await Storage.put(thumbnailKey, thumbnail, { progressCallback, completeCallback });
  }

  try {
    const postData = generatePostData(
      file,
      sub,
      contentKey,
      aspectRatio,
      contentType,
      thumbnailKey
    );
    await addPostToDb(postData, sub);
  } catch (err) {
    // DB data add failed, remove S3 upload
    await Storage.remove(contentKey);

    // Remove video thumbnail if exist
    if (thumbnail) {
      await Storage.remove(thumbnailKey);
    }
  }
};
