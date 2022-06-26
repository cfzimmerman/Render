import { API, graphqlOperation } from "aws-amplify";
import { clearVaultPostData } from "../../../redux/vault/vaultpostdata";
import { createPosts, updateUsers } from "../../../graphql/mutations";
import CleanupFailedUpload from "./CleanupFailedUpload";

import ModifyVaultData from "../vault/ModifyVaultData";

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
    type: "post",
    sizeinbytes: filesize,
  };

  try {
    const createPostResult = await API.graphql(
      graphqlOperation(createPosts, { input: newpost })
    );

    // Update storage size
    const userResult = await API.graphql(
      graphqlOperation(`
            query GetUsers {
                getUsers (
                    id: "${currentuser.id}"
                ) {
                    storagesizeinbytes
                }
            }
        `)
    );

    const currentSize = userResult.data.getUsers.storagesizeinbytes;

    const newSize = currentSize + filesize;

    const updatedUser = CorrectUserUpdate({ currentuser, newSize });

    await API.graphql(graphqlOperation(updateUsers, { input: updatedUser }));

    const newPostID = createPostResult.data.createPosts.id;

    ModifyVaultData({
      action: "add",
      vaultfeeddata,
      vaultpostdata,
      post: newpost,
      dispatch,
      vaultnexttoken,
      newPostID,
      gotaddedusersfilter,
    });
  } catch (error) {
    console.log(`Error uploading post: ${error}`);
    CleanupFailedUpload({
      origin: "AddToDB",
      contenttype,
      contentkey,
      thumbnailname: thumbnailkey,
    });
  }
  console.log(
    `Successfully uploaded post to ${currentuser.displayname}'s Vault`
  );
}

export default AddToDB;
