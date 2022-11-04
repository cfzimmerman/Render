import { filteredSearchPosts } from "../../../graphql/customqueries";
import { stackAddedFeedUpdate } from "../../../redux/shared/homemain";
import { PostType } from "../../../global/CommonTypes";
import { SearchPostsQuery } from "../../../API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";

async function AddUpdatedAddedPost({ item, dispatch }) {
  if (item.contenttype === "video") {
    const signedurl = null;
    const thumbnailurl = await Storage.get(item.thumbnailkey, {
      expires: 86400,
    });

    const post: PostType = {
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
      gamesID: item.Games === null ? null : item.Games.id,
      coverID: item.Games === null ? null : item.Games.coverID,
      title: item.Games === null ? null : item.Games.title,
    };

    dispatch(stackAddedFeedUpdate(post));
  } else if (item.contenttype === "image") {
    const signedurl = await Storage.get(item.contentkey, { expires: 86400 });
    const thumbnailurl = null;

    const post: PostType = {
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
      gamesID: item.Games === null ? null : item.Games.id,
      coverID: item.Games === null ? null : item.Games.coverID,
      title: item.Games === null ? null : item.Games.title,
    };
    dispatch(stackAddedFeedUpdate(post));
  }
}

async function RefreshAddedFeed({
  dispatch,
  addedusersfilter,
  addedRefreshDate,
  addedfeed,
}) {
  const searchFilter = {
    publicpost: { eq: true },
    publicpostdate: { gt: addedRefreshDate },
    or: addedusersfilter,
  };

  const searchSort = {
    direction: "asc",
    field: "publicpostdate",
  };

  const feedFetchLimit = 20;

  const postResult = (await API.graphql(
    graphqlOperation(filteredSearchPosts, {
      filter: searchFilter,
      sort: searchSort,
      limit: feedFetchLimit,
    })
  )) as GraphQLResult<SearchPostsQuery>;

  const postArray = postResult.data.searchPosts.items;

  if (postArray.length > 0) {
    // Want posts stacking so that the newest one is on top (the last unshifted into the array)
    postArray.forEach((item) => {
      const duplicateIndex = addedfeed.findIndex(
        (element: PostType) => element.id === item.id
      );
      // Not ideal, but ensures we don't trigger any duplicate key errors
      if (duplicateIndex === -1) {
        AddUpdatedAddedPost({ item, dispatch });
      }
    });
  }
}

export default RefreshAddedFeed;
