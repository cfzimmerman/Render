import { API, graphqlOperation, Auth, Storage } from "aws-amplify";

import { filteredSearchPosts } from "../../../graphql/customqueries";
import {
  addToAddedFeed,
  setAddedFeedNextToken,
  setFetchingAddedFeedData,
} from "../../../redux/shared/homemain";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { SearchPostsQuery } from "../../../API";
import { PostType } from "../../../global/CommonTypes";

async function GetAddedFeedData({
  dispatch,
  addedusersfilter,
  addedfeed,
  addedfeednexttoken,
}) {
  if (addedfeednexttoken === null && addedfeed.length > 0) {
    return console.log("End of feed");
  }
  const searchFilter = {
    publicpost: { eq: true },
    or: addedusersfilter,
  };

  const searchSort = {
    direction: "desc",
    field: "publicpostdate",
  };

  const feedFetchLimit = 5;

  const postResult = (await API.graphql(
    graphqlOperation(filteredSearchPosts, {
      filter: searchFilter,
      sort: searchSort,
      limit: feedFetchLimit,
      nextToken: addedfeednexttoken,
    })
  )) as GraphQLResult<SearchPostsQuery>;

  const postArray = postResult.data.searchPosts.items;
  const newNextToken = postResult.data.searchPosts.nextToken;

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
    dispatch(addToAddedFeed(newPost));
  }
  dispatch(setAddedFeedNextToken(newNextToken));
  dispatch(setFetchingAddedFeedData(false));
}

export default GetAddedFeedData;
