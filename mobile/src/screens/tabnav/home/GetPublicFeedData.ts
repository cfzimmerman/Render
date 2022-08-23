import { API, graphqlOperation, Storage } from "aws-amplify";
import {
  setPublicFeedNextToken,
  setFetchingPublicFeedData,
  addToPublicFeed,
} from "../../../redux/home/homemain";
import { filteredPostsByPublicDate } from "../../../graphql/customqueries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { PostsByPublicDateQuery } from "../../../API";
import { PostType } from "../../../resources/CommonTypes";

async function GetPublicFeedData({ dispatch, publicfeednexttoken }) {
  const fetchLimit = 5;

  const type = "post";
  const sortDirection = "DESC";
  const publicpostdate = {
    gt: "1984-01-24T14:23:00.000Z",
  };
  const filter = {
    publicpost: {
      eq: true,
    },
  };
  const nextToken = publicfeednexttoken;
  const limit = fetchLimit;

  const postResult = (await API.graphql(
    graphqlOperation(filteredPostsByPublicDate, {
      type,
      sortDirection,
      publicpostdate,
      filter,
      nextToken,
      limit,
    })
  )) as GraphQLResult<PostsByPublicDateQuery>;

  const postArray = postResult.data.postsByPublicDate.items;
  const newNextToken = postResult.data.postsByPublicDate.nextToken;

  for await (const item of postArray) {
    const newPost: PostType = {
      id: item.id,
      aspectratio: item.aspectratio,
      cognitosub: item.cognitosub,
      contentkey: item.contentkey,
      contentdate: item.contentdate,
      contenttype: item.contenttype,
      displayname: item.Users === null ? null : item.Users.displayname,
      posttext: item.posttext,
      publicpost: item.publicpost,
      publicpostdate: item.publicpostdate,
      thumbnailkey: item.thumbnailkey,
      header: false,
      userid: item.Users.id,
      gamesID: item.Games === null ? null : item.Games.id,
      coverID: item.Games === null ? null : item.Games.coverID,
      title: item.Games === null ? null : item.Games.title,
      signedurl:
        item.contenttype === "image"
          ? await Storage.get(item.contentkey, { expires: 86400 })
          : null,
      thumbnailurl:
        item.contenttype === "video"
          ? await Storage.get(item.thumbnailkey, { expires: 86400 })
          : null,
    };
    dispatch(addToPublicFeed(newPost));
  }

  dispatch(setPublicFeedNextToken(newNextToken));
  dispatch(setFetchingPublicFeedData(false));
}

export default GetPublicFeedData;
