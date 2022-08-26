import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { PostsByUsersQuery } from "../../../../API";
import {
  addNextHVGameSearchResultsArray,
  addToHVGameSearchResults,
  setHVGameSearchActive,
  setHVGameSearchNextToken,
} from "../../../../redux/homevault/gametags";
import { DispatchType } from "../../../../redux/store";
import { PostType } from "../../../../resources/CommonTypes";
import LSGetImage from "../LSGetImage";
import FindIsHeader from "./FindIsHeader";

interface InputTypes {
  currentUserID: string;
  dispatch: DispatchType;
  vaultfeeddata: PostType[];
  hvGameSearchNextToken: string | null;
  initialQuery: boolean;
}

const resultsSize = 50;
const newPosts: PostType[] = [];
var activeNextToken: string | null;

const UsableNextToken = (nextToken: string | null) => {
  if (nextToken === null) {
    return `nextToken: null,`;
  } else if (typeof nextToken === "string") {
    return `nextToken: "${nextToken}",`;
  }
};

async function FetchPosts({
  queryLimit,
  usersID,
  nextToken,
  vaultfeeddata,
  dispatch,
}: {
  queryLimit: number;
  usersID: string;
  nextToken: string | null;
  vaultfeeddata: PostType[];
  dispatch: DispatchType;
}) {
  try {
    // We're doing this structure because Amplify "filter" applies to results after fetched. If it fetches 10 posts and all 10 posts heve either been deleted or already tagged to a game, we have 0 actual results to add. This structure keeps querying until we have enough to fill the screen or until we've reached the end.
    const results = (await API.graphql(
      graphqlOperation(`
          query PostsByUsers {
            postsByUsers (
              limit: ${queryLimit},
              usersID: "${usersID}",
              sortDirection: DESC,
              ${UsableNextToken(nextToken)}
              filter: {
                cognitosub: {
                    ne: "deleted"
                },
                gamesID: {
                  attributeExists: false
                }
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
    )) as GraphQLResult<PostsByUsersQuery>;

    const postsArray = results.data.postsByUsers.items;
    const nextNextToken = results.data.postsByUsers.nextToken;

    activeNextToken = nextNextToken;

    if (postsArray.length === 0 && nextNextToken != null) {
      FetchPosts({
        queryLimit,
        usersID,
        nextToken: nextNextToken,
        vaultfeeddata,
        dispatch,
      });
    } else if (postsArray.length > 0) {
      for await (const item of postsArray) {
        const contentInfo = await LSGetImage({
          contentKey: item.contentkey,
          thumbnailKey: item.thumbnailkey,
          // @ts-ignore
          contentType: item.contenttype,
        });
        const newPost: PostType = {
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
          userid: usersID,
          gamesID: item.gamesID,
          coverID: null,
          title: null,
          signedurl: contentInfo.imageURL,
          thumbnailurl: contentInfo.thumbnailURL,
        };
        newPosts.push(newPost);
        dispatch(addToHVGameSearchResults(newPost));
      }

      if (nextNextToken != null && newPosts.length < resultsSize) {
        FetchPosts({
          queryLimit,
          usersID,
          nextToken: nextNextToken,
          vaultfeeddata,
          dispatch,
        });
      }
    }
    if (nextNextToken === null || newPosts.length > resultsSize) {
      dispatch(setHVGameSearchNextToken(nextNextToken));
      dispatch(setHVGameSearchActive(false));
    }
  } catch (error) {
    console.log(error);
  }
}

async function HVGetNoGamePosts({
  currentUserID,
  dispatch,
  vaultfeeddata,
  hvGameSearchNextToken,
  initialQuery,
}: InputTypes) {
  try {
    newPosts.length = 0;
    const queryLimit = resultsSize + 5;
    activeNextToken = hvGameSearchNextToken;

    // FetchPosts runs until the newPosts array is full (or until the user's posts have been entirely pulled.)
    await FetchPosts({
      usersID: currentUserID,
      nextToken: hvGameSearchNextToken,
      queryLimit,
      vaultfeeddata,
      dispatch,
    });
  } catch (error) {
    console.log(error);
  }
}

export default HVGetNoGamePosts;
