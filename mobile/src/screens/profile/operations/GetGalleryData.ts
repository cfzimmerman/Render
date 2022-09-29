import * as FileSystem from "expo-file-system";
import { PostsByPostedDateQuery } from "../../../API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Storage, API, graphqlOperation } from "aws-amplify";
import {
  addToGalleryData,
  setFetchingGalleryData,
  setGalleryNextToken,
} from "../../../redux/profilemain";
import UpdateGalleryNextToken from "./UpdateGalleryNextToken";
import LSAddItem from "../../shared/local_sync/operations/LSAddItem";
import { CorrectNextToken } from "../../../resources/utilities";
import { PostType } from "../../../global/CommonTypes";
import LSGetImage from "../../shared/local_sync/operations/LSGetImage";
import { DispatchType } from "../../../redux";

interface InputTypes {
  dispatch: DispatchType;
  cognitosub: string;
  nextToken: string | null;
  userID: string;
}

async function GetGalleryData({
  dispatch,
  cognitosub,
  nextToken,
  userID,
}: InputTypes) {
  const fetchlimit = 10;

  const result = (await API.graphql(
    graphqlOperation(`
            query GetGalleryData {
                postsByPostedDate (
                    cognitosub: "${cognitosub}"
                    limit: ${fetchlimit},
                    sortDirection: DESC,
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
                        contentdate
                        contentkey
                        contenttype
                        cognitosub
                        posttext
                        publicpostdate
                        thumbnailkey
                        Games {
                          id
                          coverID
                          title
                        }
                    }
                    nextToken
                }
            }
        `)
  )) as GraphQLResult<PostsByPostedDateQuery>;

  const userPosts = result.data.postsByPostedDate.items;
  const nextNextToken = result.data.postsByPostedDate.nextToken;

  for await (const item of userPosts) {
    const contentInfo = await LSGetImage({
      contentKey: item.contentkey,
      thumbnailKey: item.thumbnailkey,
      // @ts-ignore
      contentType: item.contenttype,
    });
    const newGalleryPost: PostType = {
      id: item.id,
      aspectratio: item.aspectratio,
      contentdate: item.contentdate,
      contentkey: item.contentkey,
      contenttype: item.contenttype,
      cognitosub: item.cognitosub,
      header: false,
      posttext: item.posttext,
      publicpost: true,
      publicpostdate: item.publicpostdate,
      thumbnailkey: item.thumbnailkey,
      userid: userID,
      gamesID: item.Games === null ? null : item.Games.id,
      coverID: item.Games === null ? null : item.Games.coverID,
      title: item.Games === null ? null : item.Games.title,
      signedurl: contentInfo.imageURL,
      thumbnailurl: contentInfo.thumbnailURL,
    };
    dispatch(addToGalleryData(newGalleryPost));
  }
  dispatch(setGalleryNextToken(nextNextToken));
  dispatch(setFetchingGalleryData(false));
}

export default GetGalleryData;
