import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { PublicPostsByGamesQuery } from "../../../API";
import {
  addToPGFullGamePosts,
  setPGFullGamePostSearchActive,
  setPGFullGamePostsNextToken,
} from "../../../redux/explore/exploremain";
import { DispatchType } from "../../../redux/store";
import { PostType } from "../../../resources/CommonTypes";
import { CorrectNextToken } from "../../../resources/utilities";

interface InputTypes {
  gameID: string;
  nextToken: string | null;
  coverID: string;
  title: string;
  dispatch: DispatchType;
  resultsLimit: number;
}

async function PGGetGamePosts({
  gameID,
  nextToken,
  dispatch,
  coverID,
  title,
  resultsLimit,
}: InputTypes) {
  try {
    const {
      data: { publicPostsByGames },
    } = (await API.graphql(
      graphqlOperation(`
        query PublicPostsByGames {
            publicPostsByGames (
                gamesID: "${gameID}",
                sortDirection: DESC,
                limit: ${resultsLimit},
                ${CorrectNextToken({ nextToken })}
                filter: {
                    publicpost: {
                        eq: true
                    }
                }
            ) {
                items {
                    id
                    aspectratio
                    cognitosub
                    contentkey
                    contentdate
                    contenttype
                    posttext
                    publicpostdate
                    thumbnailkey
                    usersID
                    Users {
                        displayname
                    }
                }
                nextToken
            }
        }
    `)
    )) as GraphQLResult<PublicPostsByGamesQuery>;

    const postResults = publicPostsByGames.items;
    const nextNextToken = publicPostsByGames.nextToken;

    for await (const item of postResults) {
      const newPost: PostType = {
        id: item.id,
        aspectratio: item.aspectratio,
        cognitosub: item.cognitosub,
        contentkey: item.contentkey,
        contentdate: item.contentdate,
        contenttype: item.contenttype,
        displayname: item.Users === null ? null : item.Users.displayname,
        posttext: item.posttext,
        publicpost: true,
        publicpostdate: item.publicpostdate,
        thumbnailkey: item.thumbnailkey,
        header: false,
        userid: item.usersID,
        gamesID: gameID,
        coverID,
        title,
        signedurl:
          item.contenttype === "image"
            ? await Storage.get(item.contentkey, { expires: 86400 })
            : null,
        thumbnailurl:
          item.contenttype === "video"
            ? await Storage.get(item.thumbnailkey, { expires: 86400 })
            : null,
      };
      dispatch(addToPGFullGamePosts(newPost));
    }

    dispatch(setPGFullGamePostsNextToken(nextNextToken));
    dispatch(setPGFullGamePostSearchActive(false));
  } catch (error) {
    console.log(error);
  }
}

export default PGGetGamePosts;
