import { API, graphqlOperation } from "aws-amplify";
import { clearVaultPostData } from "../../../redux/vault/vaultpostdata";
import { createPosts, updateUsers } from "../../../graphql/mutations";
import CleanupFailedUpload from "./CleanupFailedUpload";

import ModifyVaultData from "../vault/ModifyVaultData";
import { deactivateMultiSelect } from "../../../redux/homevault/homevaultmain";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CreatePostsMutation, GetUserGamesQuery } from "../../../API";
import { PostType } from "../../../resources/CommonTypes";

const CorrectUserUpdate = ({ currentuser, newSize }) => {
  const updatedUser = {
    id: currentuser.id,
    storagesizeinbytes: newSize,
    firstvaultupload: true,
  };

  return updatedUser;
};

async function AddToDB({
  contenttype,
  aspectratio,
  contentkey,
  thumbnailkey,
  date,
  currentuser,
  dispatch,
  vaultpostdata,
  vaultfeeddata,
  vaultnexttoken,
  gotaddedusersfilter,
  filesize,
  multiSelectActive,
}) {
  const newpost = {
    usersID: currentuser.id,
    contenttype,
    aspectratio,
    contentkey,
    thumbnailkey,
    publicpost: false,
    cognitosub: currentuser.cognitosub,
    contentdate: date,
    gamesID: null,
    type: "post",
    sizeinbytes: filesize,
  };

  if (multiSelectActive === true) {
    dispatch(deactivateMultiSelect());
  }

  try {
    const {
      data: { createPosts: createdPost },
    } = (await API.graphql(
      graphqlOperation(createPosts, { input: newpost })
    )) as GraphQLResult<CreatePostsMutation>;

    const currentSize = createdPost.Users.storagesizeinbytes;

    const newSize = currentSize + filesize;

    const updatedUser = CorrectUserUpdate({ currentuser, newSize });

    await API.graphql(graphqlOperation(updateUsers, { input: updatedUser }));

    const newPostID = createdPost.id;

    const localPostCopy: PostType = {
      id: createdPost.id,
      aspectratio: createdPost.aspectratio,
      // hascomments: boolean;
      contentdate: createdPost.contentdate,
      contentkey: createdPost.contentkey,
      contenttype: createdPost.contenttype,
      cognitosub: createdPost.cognitosub,
      displayname: createdPost.Users.displayname,
      posttext: createdPost.posttext,
      publicpost: createdPost.publicpost,
      publicpostdate: createdPost.publicpostdate,
      thumbnailkey: createdPost.thumbnailkey,
      userid: createdPost.Users.id,
      gamesID: null,
      coverID: null,
      title: null,
    };

    ModifyVaultData({
      action: "add",
      vaultfeeddata,
      vaultpostdata,
      post: localPostCopy,
      dispatch,
      vaultnexttoken,
      newPostID,
    });
  } catch (error) {
    console.log("\nError uploading post: ");
    console.log(error);
    CleanupFailedUpload({
      origin: "AddToDB",
      contenttype,
      contentkey,
      thumbnailname: thumbnailkey,
      imagename: contentkey,
      videoname: contentkey,
    });
  }
  /*
  console.log(
    `Successfully uploaded post to ${currentuser.displayname}'s Vault`
  );
  */
}

export default AddToDB;
