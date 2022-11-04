import { batch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";

import ChangeGalleryPostPublic from "../../../profile/operations/ChangeGalleryPostPublic";

import { updatePosts, updateUsers } from "../../../../graphql/mutations";

async function UnpostPublic({
  item,
  dispatch,
  gallerydata,
  origin,
  publicfeeddata,
}) {
  const updatedpost = {
    id: item.id,
    publicpost: false,
    publicpostdate: null,
  };

  try {
    await API.graphql(graphqlOperation(updatePosts, { input: updatedpost }));
  } catch (error) {
    console.log("Unpost error");
    return;
  }

  // dispatch(clearGalleryData())
  ChangeGalleryPostPublic({
    gallerydata,
    item,
    action: "remove",
    dispatch,
    publicfeeddata,
    isodate: null,
  });
}

export default UnpostPublic;
