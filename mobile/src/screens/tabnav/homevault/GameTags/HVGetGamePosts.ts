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
import LSGetImage from "../LSGetImage";
import FindIsHeader from "./FindIsHeader";

interface InputTypes {
  gameID: string;
  currentUserID: string;
  dispatch: DispatchType;
  coverID: string;
  title: string;
  vaultfeeddata: PostType[];
  hvGameSearchNextToken: string | null;
}

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

      if (item.contenttype === "image") {
        newPost.signedurl = await LSGetImage({ key: item.contentkey });
      } else if (item.contenttype === "video") {
        newPost.thumbnailurl = await LSGetImage({ key: item.thumbnailkey });
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
