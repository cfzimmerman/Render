import { batch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { UserDialogue } from "../../../resources/project";

import { setSystemmessageActive } from "../../../redux/system/systemmessage";
import { clearGalleryData } from "../../../redux/profile/profilemain";

import ChangeGalleryPostPublic from "../profile/ChangeGalleryPostPublic";

import { updatePosts, updateUsers } from "../../../graphql/mutations";

async function UnpostPublic({
  item, dispatch, gallerydata, origin,
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
    isodate: null,
  });
}

export default UnpostPublic;
