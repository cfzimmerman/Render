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
import RemovePostGameRelationship from "../homevault/GameTags/RemovePostGameRelationship";
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
    await RemovePostGameRelationship({
      postID: postid,
      currentUserID: currentuser.id,
      dispatch,
    });
    const updatePostResult = (await API.graphql(
      graphqlOperation(updatePosts, { input: postUpdate })
    )) as GraphQLResult<UpdatePostsMutation>;
    const deletedPost = updatePostResult.data.updatePosts;

    const deletedPostItem: PostType = {
      id: deletedPost.id,
      aspectratio: deletedPost.aspectratio,
      contentdate: deletedPost.contentdate,
      contentkey: deletedPost.contentkey,
      contenttype: deletedPost.contenttype,
      cognitosub: deletedPost.cognitosub,
      displayname: deletedPost.Users.displayname,
      header: false,
      posttext: deletedPost.posttext,
      publicpost: deletedPost.publicpost,
      publicpostdate: deletedPost.publicpostdate,
      signedurl: null,
      thumbnailkey: deletedPost.thumbnailkey,
      thumbnailurl: null,
      userid: deletedPost.usersID,
      userpfp: deletedPost.Users.pfp,
      userpfpurl: null,
      gamesID: deletedPost.Games === null ? null : deletedPost.Games.id,
      coverID: deletedPost.Games === null ? null : deletedPost.Games.coverID,
      title: deletedPost.Games === null ? null : deletedPost.Games.title,
    };

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
      post: deletedPostItem,
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
