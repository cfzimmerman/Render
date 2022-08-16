import { API, Storage, graphqlOperation } from "aws-amplify";
import AddToOtherUserGallery from "./AddToOtherUserGallery";
import { setFetchingOtherUserGalleryData } from "../../../redux/explore/otheruserprofile";
import UpdateOtherUserGalleryNextToken from "./UpdateOtherUserGalleryNextToken";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { PostsByPostedDateQuery } from "../../../API";

async function GetOtherUserGalleryData({
  dispatch,
  otherusergallerydata,
  otheruser,
  nextToken,
}) {
  if (otherusergallerydata.length > 0 && nextToken === null) {
  } else {
    const fetchlimit = 10;

    const result = (await API.graphql(
      graphqlOperation(`
            query GetGalleryData {
                postsByPostedDate (
                    cognitosub: "${otheruser.cognitosub}"
                    limit: ${fetchlimit},
                    sortDirection: DESC,
                    nextToken: ${nextToken}
                    filter: {
                        publicpost: {
                            eq: true
                        }
                    }
                ) {
                    items {
                        id
                        publicpostdate
                        contentkey
                        contenttype
                        aspectratio
                        publicpostdate
                        posttext
                        thumbnailkey
                        posttext
                        Users {
                          id
                          displayname
                        }
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

    const userposts = result.data.postsByPostedDate.items;
    const newnexttoken = result.data.postsByPostedDate.nextToken;

    if (userposts.length > 0) {
      const lastPostID = userposts[userposts.length - 1].id;
      userposts.forEach((item) => {
        async function GetUrl({ item }) {
          if (item.contenttype === "video") {
            const signedurl = null;
            const thumbnailurl = await Storage.get(item.thumbnailkey, {
              expires: 86400,
            });
            AddToOtherUserGallery({
              dispatch,
              item,
              signedurl,
              thumbnailurl,
            });
          } else {
            const signedurl = await Storage.get(item.contentkey, {
              expires: 86400,
            });
            const thumbnailurl = null;
            AddToOtherUserGallery({
              dispatch,
              item,
              signedurl,
              thumbnailurl,
            });
          }
        }
        GetUrl({ item });
        if (item.id === lastPostID) {
          UpdateOtherUserGalleryNextToken({ dispatch, token: newnexttoken });
          dispatch(setFetchingOtherUserGalleryData(false));
        }
      });
    } else {
      dispatch(setFetchingOtherUserGalleryData(false));
    }
  }
}

export default GetOtherUserGalleryData;
