import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";
import * as FileSystem from "expo-file-system";
import { PostsByUserGamesQuery } from "../../../../API";
import {
  addToHVGameSearchResults,
  setHVGameSearchActive,
  setHVGameSearchNextToken,
} from "../../../../redux/homevault/gametags";
import { DispatchType } from "../../../../redux/store";
import { PostType } from "../../../../resources/CommonTypes";

interface InputTypes {
  gameID: string;
  currentUserID: string;
  dispatch: DispatchType;
  coverID: string;
  title: string;
  vaultfeeddata: PostType[];
  hvGameSearchNextToken: string | null;
}

const FindIsHeader = ({
  vaultfeeddata,
  postID,
}: {
  vaultfeeddata: PostType[];
  postID: string;
}): boolean => {
  const postIndex = vaultfeeddata.findIndex(
    (item: PostType) => item.id === postID
  );
  if (postIndex === -1 || typeof vaultfeeddata[postIndex].header != "boolean") {
    return false;
  }
  return vaultfeeddata[postIndex].header;
};

async function HVGetGamePosts({
  gameID,
  currentUserID,
  dispatch,
  coverID,
  title,
  vaultfeeddata,
  hvGameSearchNextToken,
}: InputTypes) {
  try {
    const postLimit = 100;

    const results = (await API.graphql(
      graphqlOperation(`
          query PostsByUserGames {
            postsByUserGames (
              limit: ${postLimit},
              usersID: "${currentUserID}",
              gamesID: {
                eq: "${gameID}"
              },
              nextToken: ${hvGameSearchNextToken},
              filter: {
                cognitosub: {
                    ne: "deleted"
                },
              }
            ) {
              items {
                id
                aspectratio
                cognitosub
                contentdate
                contentkey
                contenttype
                posttext
                publicpost
                publicpostdate
                thumbnailkey
                gamesID
              }
              nextToken
            }
          }
      `)
    )) as GraphQLResult<PostsByUserGamesQuery>;

    const postResults = results.data.postsByUserGames.items;
    const nextToken = results.data.postsByUserGames.nextToken;

    for await (const item of postResults) {
      var newPost: PostType = {
        id: item.id,
        aspectratio: item.aspectratio,
        cognitosub: item.cognitosub,
        contentkey: item.contentkey,
        contentdate: item.contentdate,
        contenttype: item.contenttype,
        posttext: item.posttext,
        publicpost: item.publicpost,
        publicpostdate: item.publicpostdate,
        thumbnailkey: item.thumbnailkey,
        header: FindIsHeader({ vaultfeeddata, postID: item.id }),
        userid: currentUserID,
        gamesID: gameID,
        coverID: coverID,
        title: title,
        signedurl: null,
        thumbnailurl: null,
      };
      /*

                if (item.contenttype === "video") {
            const thumbnailAddress =
              FileSystem.documentDirectory + "LocalSync/" + item.thumbnailkey;
            const contentExists = await FileSystem.getInfoAsync(
              thumbnailAddress
            );
            if (contentExists.exists === true) {
              const signedurl = null;
              const thumbnailurl = thumbnailAddress;

      */

      if (item.contenttype === "image") {
        const imageAddress =
          FileSystem.documentDirectory + "LocalSync/" + item.contentkey;
        const { exists } = await FileSystem.getInfoAsync(imageAddress);
        if (exists === true) {
          newPost.signedurl = imageAddress;
        } else {
          newPost.signedurl = await Storage.get(item.contentkey, {
            expires: 86400,
          });
        }
      } else if (item.contenttype === "video") {
        const thumbnailAddress =
          FileSystem.documentDirectory + "LocalSync/" + item.thumbnailkey;
        const { exists } = await FileSystem.getInfoAsync(thumbnailAddress);
        if (exists === true) {
          newPost.thumbnailurl = thumbnailAddress;
        } else {
          newPost.thumbnailurl = await Storage.get(item.thumbnailkey, {
            expires: 86400,
          });
        }
      }

      dispatch(addToHVGameSearchResults(newPost));
    }
    dispatch(setHVGameSearchNextToken(nextToken));
    dispatch(setHVGameSearchActive(false));
  } catch (error) {
    console.log(error);
  }
}

export default HVGetGamePosts;
