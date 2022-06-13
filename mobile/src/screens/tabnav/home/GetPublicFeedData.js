import { API, graphqlOperation } from "aws-amplify";
import AddPost from "./AddPost";
import {
  setPublicFeedNextToken,
  setFetchingPublicFeedData,
} from "../../../redux/home/homemain";
import { filteredPostsByPublicDate } from "../../../graphql/customqueries";

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

  const postResult = await API.graphql(
    graphqlOperation(filteredPostsByPublicDate, {
      type,
      sortDirection,
      publicpostdate,
      filter,
      nextToken,
      limit,
    })
  );

  const postArray = postResult.data.postsByPublicDate.items;
  const newNextToken = postResult.data.postsByPublicDate.nextToken;

  if (postArray.length > 0) {
    const lastPostID = postArray[postArray.length - 1].id;

    postArray.forEach((item) => {
      AddPost({ item, dispatch, usecase: "publicfeed" });
      if (item.id === lastPostID) {
        dispatch(setPublicFeedNextToken(newNextToken));
        dispatch(setFetchingPublicFeedData(false));
      }
    });
  } else {
    dispatch(setFetchingPublicFeedData(false));
  }
}

export default GetPublicFeedData;
