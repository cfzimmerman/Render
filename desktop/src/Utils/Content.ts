import { API, graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { Storage } from "@aws-amplify/storage";
import { GetPostsQuery, GetPostsQueryVariables } from "../API";
import { getPosts } from "../graphql/queries";

// export const generateVideoThumbnail = async (file: File): Promise<string> => {
//   const arr = await generateVideoThumbnailViaUrl(URL.createObjectURL(file), 0);
//   return arr;
// };

export const dataURItoBlob = (data: string) => {
  const binary = atob(data.split(",")[1]);
  const array = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/png" });
};

export const getFileType = (type: string): string =>
  type.replace(/(.*)\//g, "");

export const getPostByPostId = async (postId: string) => {
  const postResult: GraphQLResult<GetPostsQuery> = (await API.graphql(
    graphqlOperation(getPosts, { id: postId } as GetPostsQueryVariables)
  )) as GraphQLResult<GetPostsQuery>;
  return postResult;
};

export interface ContentWithType {
  contentUrl: string;
  type: string;
}

export const getContentByPostId = async (
  postId: string
): Promise<ContentWithType> => {
  const post = await getPostByPostId(postId);
  const contentUrl = await Storage.get(post.data?.getPosts?.contentkey ?? "");
  return { contentUrl, type: post.data?.getPosts?.contenttype ?? "" };
};
