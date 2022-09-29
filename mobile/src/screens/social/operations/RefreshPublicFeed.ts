import { stackPublicFeedUpdate } from "../../../redux/shared/homemain";
import { PostType } from "../../../global/CommonTypes";

import { API, graphqlOperation, Storage } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { PostsByPublicDateQuery } from "../../../API";
import { filteredPostsByPublicDate } from "../../../graphql/customqueries";

async function AddUpdatedPublicPost({ item, dispatch }) {
  if (item.contenttype === "video") {
    const signedurl = null;
    const thumbnailurl = await Storage.get(item.thumbnailkey, {
      expires: 86400,
    });

    const post = {
      id: item.id,
      contenttype: item.contenttype,
      aspectratio: item.aspectratio,
      contentkey: item.contentkey,
      cognitosub: item.cognitosub,
      thumbnailkey: item.thumbnailkey,
      publicpostdate: item.publicpostdate,
      posttext: item.posttext,
      signedurl,
      thumbnailurl,
      userid: item.Users.id,
      displayname: item.Users.displayname,
      userpfp: item.Users.pfp,
      userpfpurl: null,
    };

    dispatch(stackPublicFeedUpdate(post));
  } else if (item.contenttype === "image") {
    const signedurl = await Storage.get(item.contentkey, { expires: 86400 });
    const thumbnailurl = null;

    const post = {
      id: item.id,
      contenttype: item.contenttype,
      aspectratio: item.aspectratio,
      contentkey: item.contentkey,
      cognitosub: item.cognitosub,
      thumbnailkey: item.thumbnailkey,
      publicpostdate: item.publicpostdate,
      posttext: item.posttext,
      signedurl,
      thumbnailurl,
      userid: item.Users.id,
      displayname: item.Users.displayname,
      userpfp: item.Users.pfp,
      userpfpurl: null,
    };
    dispatch(stackPublicFeedUpdate(post));
  }
}

async function RefreshPublicFeed({ dispatch, publicfeed, publicRefreshDate }) {
  const fetchLimit = 20;

  const type = "post";
  const sortDirection = "ASC";
  const publicpostdate = {
    gt: publicRefreshDate,
  };
  const filter = {
    publicpost: {
      eq: true,
    },
  };
  const limit = fetchLimit;

  const postResult = (await API.graphql(
    graphqlOperation(filteredPostsByPublicDate, {
      type,
      sortDirection,
      publicpostdate,
      filter,
      limit,
    })
  )) as GraphQLResult<PostsByPublicDateQuery>;

  const postArray = postResult.data.postsByPublicDate.items;
  if (postArray.length > 0) {
    // Want posts stacking so that the newest one is on top (the last unshifted into the array)
    postArray.forEach((item) => {
      const duplicateIndex = publicfeed.findIndex(
        (element: PostType) => element.id === item.id
      );
      // Not ideal, but ensures we don't trigger any duplicate key errors
      if (duplicateIndex === -1) {
        AddUpdatedPublicPost({ item, dispatch });
      }
    });
  }
}

export default RefreshPublicFeed;
