import { API, graphqlOperation } from "aws-amplify";
import AddPost from "./AddPost";
import { setPublicFeedNextToken } from "../../../redux/home/homemain";
import { filteredPostsByPublicDate } from "../../../graphql/customqueries";

async function GetPublicFeedData({
  dispatch,
  currentuser,
  publicfeed,
  publicfeednexttoken,
}) {
  if (publicfeed.length > 0 && publicfeednexttoken === null) {

  } else {
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
      }),
    );

    const postArray = postResult.data.postsByPublicDate.items;
    const newNextToken = postResult.data.postsByPublicDate.nextToken;

    postArray.forEach((item) => {
      AddPost({ item, dispatch, usecase: "publicfeed" });
    });

    dispatch(setPublicFeedNextToken(newNextToken));
  }
}

export default GetPublicFeedData;
