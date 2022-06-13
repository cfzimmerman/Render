import { Storage, API, graphqlOperation } from "aws-amplify";
import AddToGallery from "./AddToGallery";
import { setFetchingGalleryData } from "../../../redux/profile/profilemain";
import UpdateGalleryNextToken from "./UpdateGalleryNextToken";

async function GetGalleryData({
  dispatch,
  gallerydata,
  cognitosub,
  nextToken,
  userID,
}) {
  if (gallerydata.length > 0 && nextToken === null) {
  } else {
    const fetchlimit = 10;

    const result = await API.graphql(
      graphqlOperation(`
            query GetGalleryData {
                postsByPostedDate (
                    cognitosub: "${cognitosub}"
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
                        contentdate
                        aspectratio
                        publicpostdate
                        thumbnailkey
                        posttext
                    }
                    nextToken
                }
            }
        `)
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
          AddToGallery({
            dispatch,
            item,
            signedurl,
            thumbnailurl,
            userID,
          });
        } else {
          const signedurl = await Storage.get(item.contentkey, {
            expires: 86400,
          });
          const thumbnailurl = null;
          AddToGallery({
            dispatch,
            item,
            signedurl,
            thumbnailurl,
            userID,
          });
        }
      }
      GetUrl({ item });

      if (
        typeof userposts[fetchlimit - 1] === "undefined" ||
        item.id === userposts[fetchlimit - 1].id
      ) {
        UpdateGalleryNextToken({ dispatch, nextToken: newnexttoken });
        dispatch(setFetchingGalleryData(false));
      }
    });
  }
}

export default GetGalleryData;
