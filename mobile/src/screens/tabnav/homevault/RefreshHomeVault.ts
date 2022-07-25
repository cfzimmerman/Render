import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { PostsByCreatedDateQuery, PostsByDeletedDateQuery } from "../../../API";
import { DispatchType } from "../../../redux/store";
import { LSLibraryItemType } from "../../../redux/system/localsync";
import { PostHeaderType, PostType } from "../../../resources/CommonTypes";
import { GetDate } from "../../../resources/utilities";
import ModifyVaultData from "../vault/ModifyVaultData";
import HomeVaultFullRefresh from "./HomeVaultFullRefresh";

interface RefreshProps {
  cognitosub: string;
  refreshDateString: string;
  dispatch: DispatchType;
  vaultpostdata: PostHeaderType[];
  vaultfeeddata: PostType[];
  syncPreference: "All" | "Partial" | "None";
  localLibrary: Record<string, LSLibraryItemType>;
  vaultNextToken: string | null;
  userID: string;
}

async function RefreshHomeVault({
  cognitosub,
  refreshDateString,
  dispatch,
  vaultpostdata,
  vaultfeeddata,
  vaultNextToken,
  userID,
  syncPreference,
  localLibrary,
}: RefreshProps) {
  const postResult = (await API.graphql(
    graphqlOperation(`
    query PostsByCreatedDate {
        postsByCreatedDate (
            cognitosub: "${cognitosub}",
            createdAt: {
                gt: "${refreshDateString}"
            },
            sortDirection: DESC,
        ) {
            items {
                id
                contenttype
                aspectratio
                contentkey
                publicpost
                cognitosub
                contentdate
                thumbnailkey
                posttext
                publicpostdate
                createdAt
                usersID
                updatedAt
            }
        }
    }
  `)
  )) as GraphQLResult<PostsByCreatedDateQuery>;

  const postArray = postResult.data.postsByCreatedDate.items;

  if (postArray.length === 1) {
    const item = postArray[0];
    ModifyVaultData({
      action: "add",
      dispatch,
      vaultpostdata,
      vaultfeeddata,
      post: item,
      vaultnexttoken: vaultNextToken,
      newPostID: item.id,
    });
  } else if (postArray.length > 1) {
    HomeVaultFullRefresh({
      dispatch,
      cognitosub,
      syncPreference,
      localLibrary,
    });
  }

  const deletedPostResult = (await API.graphql(
    graphqlOperation(`
    query PostsByDeletedDate {
        postsByDeletedDate (
            usersID: "${userID}",
            deleteddate: {
                gt: "${refreshDateString}"
            },
            sortDirection: DESC
        ) {
            items {
                id
                contenttype
                aspectratio
                contentkey
                publicpost
                cognitosub
                contentdate
                thumbnailkey
                posttext
                publicpostdate
                createdAt
                usersID
                updatedAt
            }
        }
    }
  `)
  )) as GraphQLResult<PostsByDeletedDateQuery>;

  const deletedPostsArray = deletedPostResult.data.postsByDeletedDate.items;

  if (deletedPostsArray.length === 1) {
    const item = deletedPostsArray[0];
    ModifyVaultData({
      action: "remove",
      dispatch,
      vaultpostdata,
      vaultfeeddata,
      post: item,
      vaultnexttoken: vaultNextToken,
      newPostID: item.id,
    });
  } else {
    console.log("Bust a HomeVaultFullRefresh");
  }
}

export default RefreshHomeVault;
