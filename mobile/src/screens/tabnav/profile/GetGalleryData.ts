import * as FileSystem from "expo-file-system";
import { PostsByPostedDateQuery } from "../../../API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Storage, API, graphqlOperation } from "aws-amplify";
import AddToGallery from "./AddToGallery";
import { setFetchingGalleryData } from "../../../redux/profile/profilemain";
import UpdateGalleryNextToken from "./UpdateGalleryNextToken";
import LSAddItem from "./LSAddItem";

async function GetGalleryData({
  dispatch,
  gallerydata,
  cognitosub,
  nextToken,
  userID,
  localLibrary,
  syncPreference,
}) {
  if (gallerydata.length > 0 && nextToken === null) {
  } else {
    const fetchlimit = 10;

    const result = (await API.graphql(
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
                        Games {
                          id
                          coverID
                        }
                    }
                    nextToken
                }
            }
        `)
    )) as GraphQLResult<PostsByPostedDateQuery>;

    const userposts = result.data.postsByPostedDate.items;
    const newnexttoken = result.data.postsByPostedDate.nextToken;

    userposts.forEach((item) => {
      async function GetUrl({ item }) {
        if (item.contenttype === "video") {
          const thumbnailAddress =
            FileSystem.documentDirectory + "LocalSync/" + item.thumbnailkey;
          const contentExists = await FileSystem.getInfoAsync(thumbnailAddress);

          if (contentExists.exists === true) {
            const signedurl = null;
            const thumbnailurl = thumbnailAddress;

            AddToGallery({
              dispatch,
              item,
              signedurl,
              thumbnailurl,
              userID,
            });
          } else {
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

            if (syncPreference === "All" || syncPreference === "Partial") {
              LSAddItem({
                contentkey: item.thumbnailkey,
                signedurl: thumbnailurl,
                localLibrary,
                dispatch,
              });
            }
          }
        } else {
          const contentAddress =
            FileSystem.documentDirectory + "LocalSync/" + item.contentkey;
          const contentExists = await FileSystem.getInfoAsync(contentAddress);

          if (contentExists.exists === true) {
            const signedurl = contentAddress;
            const thumbnailurl = null;

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

            if (syncPreference === "All" || syncPreference === "Partial") {
              LSAddItem({
                contentkey: item.contentkey,
                signedurl,
                localLibrary,
                dispatch,
              });
            }
          }
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
