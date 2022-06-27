import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { Storage, API, graphqlOperation } from "aws-amplify";
import { clearVaultPostData } from "../../../redux/vault/vaultpostdata";
import { HalfbarButton } from "../../../resources/atoms";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";
import ModifyVaultData from "./ModifyVaultData";
import LSRemoveItem from "../profile/LSRemoveItem";
import {
  deletePosts,
  updateUsers,
  updatePosts,
} from "../../../graphql/mutations";
import { RootStateType } from "../../../redux/store";
import {
  GetUsersQuery,
  UpdatePostsInput,
  UpdatePostsMutation,
  UpdateUsersInput,
  UpdateUsersMutation,
} from "../../../API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { getUsers } from "../../../graphql/queries";
import { PostType } from "../../../resources/CommonTypes";

async function SentencePost({
  postid,
  navigation,
  dispatch,
  vaultpostdata,
  vaultfeeddata,
  currentuser,
  vaultnexttoken,
  localLibrary,
}) {
  // Strip away all the data points that are needed for the post to be used in any future feed. With cognitosub gone, now the post must be queried via User parent or postsID (preferred)
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
    console.log("Error: " + JSON.stringify(error));
  }

  navigation.navigate("HomeVault");
}

const DeletePost = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const vaultpostdata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultpostdata
  );
  const vaultfeeddata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultfeeddata
  );
  const vaultnexttoken = useSelector(
    (state: RootStateType) => state.vaultpostdata.nextToken
  );
  const localLibrary = useSelector(
    (state: RootStateType) => state.localsync.localLibrary
  );

  const { postid } = route.params;

  if (typeof postid === "undefined" || postid === null) {
    console.log("Error, could not read postid");
    return;
  }

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <SafeAreaView style={styles.container}>
        <View style={[GlobalStyles.shadow, styles.dialoguebox]}>
          <Text
            style={[
              GlobalStyles.h2text,
              GlobalStyles.irregularshadow,
              styles.header,
            ]}
          >
            Delete this post?
          </Text>
        </View>
        <View style={styles.buttonwrapper}>
          <HalfbarButton
            label="😅 Nah"
            Action={() => {
              navigation.goBack();
            }}
            active={false}
          />
          <HalfbarButton
            label="😵 Do it"
            Action={() => {
              SentencePost({
                dispatch,
                navigation,
                vaultfeeddata,
                vaultpostdata,
                postid,
                currentuser,
                vaultnexttoken,
                localLibrary,
              });
            }}
            active={false}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  dialoguebox: {
    backgroundColor: Colors.Primary,
    height: Environment.HalfBar,
    width: Environment.FullBar,
    alignItems: "center",
    justifyContent: "center",
    padding: Environment.StandardPadding,
    borderRadius: Environment.StandardRadius,
  },
  header: {
    color: Colors.AccentOn,
    textAlign: "center",
  },
  buttonwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: Environment.StandardPadding,
  },
});

export default DeletePost;
