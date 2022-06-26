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
  contentType: 'image' | 'video'
): DbPostData => ({
  contenttype: contentType,
  contentkey: contentKey,
  thumbnailkey: null,
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
  completeCallback: (event: any) => void
) => {
  const contentKey = v4();
  await Storage.put(contentKey, file, {
    progressCallback,
    completeCallback
  });

  try {
    const postData = generatePostData(file, sub, contentKey, aspectRatio, contentType);
    await addPostToDb(postData, sub);
  } catch (err) {
    // DB data add failed, remove S3 upload
    await Storage.remove(contentKey);
  }
};
