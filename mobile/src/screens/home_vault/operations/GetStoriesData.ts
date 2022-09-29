import { Storage, API, graphqlOperation } from "aws-amplify";
import AddToStoriesData from "./AddToStoriesData";
import { filteredSearchPosts } from "../../../graphql/customqueries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { PostViewByPostIDQuery, SearchPostsQuery } from "../../../API";

async function CheckIfSeen({ dispatch, postItem, currentuser }) {
  const interactionArray = (await API.graphql(
    graphqlOperation(`
        query PostViewByPostID {
            postViewByPostID (
                postsID: "${postItem.id}",
                viewerID: {
                    eq: "${currentuser.id}"
                }
            ) {
                items {
                    id
                }
                nextToken
            }
        }
    `)
  )) as GraphQLResult<PostViewByPostIDQuery>;

  if (interactionArray.data.postViewByPostID.items.length === 0) {
    if (postItem.contenttype === "video") {
      const signedurl = null;
      const thumbnailurl = await Storage.get(postItem.thumbnailkey, {
        expires: 86400,
      });
      const previewurl = thumbnailurl;
      AddToStoriesData({
        postItem,
        dispatch,
        signedurl,
        thumbnailurl,
        previewurl,
        displayname: postItem.Users.displayname,
        userid: postItem.Users.id,
      });
    } else if (postItem.contenttype === "image") {
      const signedurl = await Storage.get(postItem.contentkey, {
        expires: 86400,
      });
      const thumbnailurl = null;
      const previewurl = signedurl;
      AddToStoriesData({
        postItem,
        dispatch,
        signedurl,
        thumbnailurl,
        previewurl,
        displayname: postItem.Users.displayname,
        userid: postItem.Users.id,
      });
    }
  }
}

async function GetStoriesData({
  dispatch,
  storiessectionlist,
  currentuser,
  addedusersfilter,
}) {
  const allowedageindays = 10;
  const dateNow = new Date();
  const intAge = dateNow.getTime() - allowedageindays * 86400000;
  const cutoffAge = new Date(intAge).toISOString();

  // Search posts
  // Where cognitosub is a follower -- users I'm friends with
  // Cognitosub has not yet seen the post -- posts I haven't seen
  // And postdate is less than X days old

  if (
    storiessectionlist.length > 0 ||
    typeof currentuser.cognitosub === "undefined"
  ) {
    return console.log("Already fetched or user unauthenticated");
  } else {
    const allowedageindays = 20;
    const dateNow = new Date();
    const intAge = dateNow.getTime() - allowedageindays * 86400000;
    const cutoffAge = new Date(intAge).toISOString();

    const searchFilter = {
      publicpost: { eq: true },
      publicpostdate: { gt: cutoffAge },
      or: addedusersfilter,
    };

    const searchSort = {
      direction: "desc",
      field: "publicpostdate",
    };

    const storiesFetchLimit = 100;

    const storiesNextToken = null;

    const postResult = (await API.graphql(
      graphqlOperation(filteredSearchPosts, {
        filter: searchFilter,
        sort: searchSort,
        limit: storiesFetchLimit,
        nextToken: storiesNextToken,
      })
    )) as GraphQLResult<SearchPostsQuery>;

    const postArray = postResult.data.searchPosts.items;

    postArray.forEach((postItem) => {
      CheckIfSeen({ postItem, dispatch, currentuser });
    });
  }
}

export default GetStoriesData;
