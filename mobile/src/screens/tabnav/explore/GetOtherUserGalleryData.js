import { API, Storage, graphqlOperation } from "aws-amplify";
import AddToOtherUserGallery from "./AddToOtherUserGallery";
import UpdateOtherUserGalleryNextToken from "./UpdateOtherUserGalleryNextToken";

async function GetOtherUserGalleryData({
  dispatch,
  otherusergallerydata,
  otheruser,
  nextToken,
}) {
  if (otherusergallerydata.length > 0 && nextToken === null) {

  } else {
    const fetchlimit = 10;

    const result = await API.graphql(
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
                        thumbnailkey
                        posttext
                    }
                    nextToken
                }
            }
        `),
    );

    const userposts = result.data.postsByPostedDate.items;
    const newnexttoken = result.data.postsByPostedDate.nextToken;

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

      if (
        typeof userposts[fetchlimit - 1] === "undefined"
        || item.id === userposts[fetchlimit - 1].id
      ) {
        UpdateOtherUserGalleryNextToken({ dispatch, token: newnexttoken });
      }
    });
  }
}

export default GetOtherUserGalleryData;
