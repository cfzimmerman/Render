import { API, graphqlOperation } from "aws-amplify";
import { UserDialogue } from "../../../resources/project";

import { setSystemmessageActive } from "../../../redux/system/systemmessage";
import { clearGalleryData } from "../../../redux/profile/profilemain";

import ChangeGalleryPostPublic from "../profile/ChangeGalleryPostPublic";

import { updatePosts, updateUsers } from "../../../graphql/mutations";

async function PostPublic({
  item,
  dispatch,
  currentuser,
  isodate,
  gallerydata,
}) {
  // id is PostID

  const updatedpost = {
    id: item.id,
    publicpost: true,
    publicpostdate: isodate,
  };

  const updateuser = {
    id: currentuser.id,
    mostrecentpublicpost: isodate,
  };

  try {
    await Promise.all([
      API.graphql(graphqlOperation(updatePosts, { input: updatedpost })),
      API.graphql(graphqlOperation(updateUsers, { input: updateuser })),
    ]);
  } catch (error) {
    console.log("upload post error");
    return;
  }

  ChangeGalleryPostPublic({
    gallerydata,
    item,
    action: "add",
    dispatch,
    isodate,
  });
  dispatch(setSystemmessageActive(UserDialogue().systemmessage.postsuccess));

  // dispatch(clearGalleryData())
}

export default PostPublic;
