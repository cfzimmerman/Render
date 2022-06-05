import { API, graphqlOperation, Auth } from "aws-amplify";
import AddPost from "./AddPost";

import { filteredSearchPosts } from "../../../graphql/customqueries";
import { setAddedFeedNextToken } from "../../../redux/home/homemain";

async function GetAddedFeedData({
  dispatch,
  currentuser,
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

  const postResult = await API.graphql(
    graphqlOperation(filteredSearchPosts, {
      filter: searchFilter,
      sort: searchSort,
      limit: feedFetchLimit,
      nextToken: addedfeednexttoken,
    }),
  );

  const postArray = postResult.data.searchPosts.items;
  const newNextToken = postResult.data.searchPosts.nextToken;

  postArray.forEach((item) => {
    AddPost({ item, dispatch, usecase: "addedfeed" });
  });

  dispatch(setAddedFeedNextToken(newNextToken));
}

export default GetAddedFeedData;
