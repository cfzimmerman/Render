import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import {
  GetUsersQuery,
  UpdatePostsInput,
  UpdatePostsMutation,
  UpdateUsersInput,
} from "../../../API";
import { updatePosts, updateUsers } from "../../../graphql/mutations";
import { getUsers } from "../../../graphql/queries";
import { DispatchType } from "../../../redux/store";
import { LSLibraryItemType } from "../../../redux/system/localsync";
import {
  CurrentUserType,
  PostHeaderType,
  PostType,
} from "../../../resources/CommonTypes";
import LSRemoveItem from "../profile/LSRemoveItem";
import ModifyVaultData from "./ModifyVaultData";

interface SentencePostPropsType {
  postid: string;
  dispatch: DispatchType;
  vaultfeeddata: PostType[];
  vaultpostdata: PostHeaderType[];
  currentuser: CurrentUserType;
  vaultnexttoken: string | null;
  localLibrary: Record<string, LSLibraryItemType>;
}

async function SentencePost({
  postid,
  dispatch,
  vaultpostdata,
  vaultfeeddata,
  currentuser,
  vaultnexttoken,
  localLibrary,
}: SentencePostPropsType) {
  // Strip away all the data points that are needed for the post to be used in any future feed. With cognitosub gone, now the post must be queried via User parent or postsID
  try {
    const postUpdate: UpdatePostsInput = {
      id: postid,
      cognitosub: "deleted",
      deleteddate: new Date().toISOString(),
      publicpost: false,
      publicpostdate: null,
    };
    const updatePostResult = (await API.graphql(
      graphqlOperation(updatePosts, { input: postUpdate })
    )) as GraphQLResult<UpdatePostsMutation>;
    const deletedPost = updatePostResult.data.updatePosts;

    const currentUserResult = (await API.graphql(
      graphqlOperation(getUsers, { id: currentuser.id })
    )) as GraphQLResult<GetUsersQuery>;

    const newStorageUsage =
      currentUserResult.data.getUsers.storagesizeinbytes -
      updatePostResult.data.updatePosts.sizeinbytes;

    const userUpdate: UpdateUsersInput = {
      id: currentuser.id,
      storagesizeinbytes: newStorageUsage,
    };

    await API.graphql(graphqlOperation(updateUsers, { input: userUpdate }));

    ModifyVaultData({
      action: "remove",
      dispatch,
      vaultfeeddata,
      vaultpostdata,
      post: deletedPost,
      vaultnexttoken,
      newPostID: null,
    });

    // Also remove from local sync
    LSRemoveItem({
      dispatch,
      contentkey: deletedPost.contentkey,
      localLibrary,
    });
  } catch (error) {
    console.log(error);
  }
}

export default SentencePost;
