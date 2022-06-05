import { Storage, API, graphqlOperation } from "aws-amplify";
import AddVaultPreviewData from "./AddVaultPreviewData";
import { setVaultHeader } from "../../../redux/home/homemain";

import {
  filteredPostsByCreatedDate,
  filteredPostsByContentDate,
} from "../../../graphql/customqueries";

async function GetVaultPreviewData({ dispatch, currentuser }) {
  if (typeof currentuser.cognitosub === "undefined") {
    dispatch(setVaultHeader("unauthenticated"));
  } else {
    const result = await API.graphql(
      graphqlOperation(filteredPostsByCreatedDate, {
        cognitosub: currentuser.cognitosub,
        limit: 1,
        sortDirection: "DESC",
        nextToken: null,
      }),
    );
    const userposts = result.data.postsByCreatedDate.items;

    if (userposts.length === 0) {
      console.log("No posts yet");
      dispatch(setVaultHeader("nocontent"));
    } else if (userposts[0].contenttype === "video") {
      const signedurl = await Storage.get(userposts[0].thumbnailkey, {
        expires: 86400,
      });
      AddVaultPreviewData({
        post: userposts[0],
        signedurl,
        dispatch,
      });
    } else {
      const signedurl = await Storage.get(userposts[0].contentkey, {
        expires: 86400,
      });
      AddVaultPreviewData({
        post: userposts[0],
        signedurl,
        dispatch,
      });
    }
  }
}

export default GetVaultPreviewData;
