import { API, graphqlOperation } from "aws-amplify";
import ModifyVaultData from "./ModifyVaultData";
import { updatePosts } from "../../../graphql/mutations";

async function ChangeVaultPostDate({
  date,
  navigation,
  dispatch,
  item,
  vaultfeeddata,
  vaultpostdata,
  vaultnexttoken,
}) {
  const newContentDate = date.toISOString();

  try {
    const updatedpost = {
      id: item.id,
      contentdate: newContentDate,
    };

    await API.graphql(graphqlOperation(updatePosts, { input: updatedpost }));
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  try {
    ModifyVaultData({
      action: "remove",
      vaultfeeddata,
      vaultpostdata,
      post: item,
      dispatch,
      vaultnexttoken,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  const post = {
    id: item.id,
    contenttype: item.contenttype,
    contentkey: item.contentkey,
    publicpost: item.publicpost,
    posttext: item.posttext,
    contentdate: newContentDate,
    signedurl: item.signedurl,
    aspectratio: item.aspectratio,
    thumbnailurl: item.thumbnailurl,
  };

  try {
    ModifyVaultData({
      action: "add",
      vaultfeeddata,
      vaultpostdata,
      post,
      dispatch,
      vaultnexttoken,
      newPostID: item.id,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  navigation.navigate("TabNav", { screen: "HomeVaultLanding" });
}

export default ChangeVaultPostDate;
