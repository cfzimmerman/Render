import {
  View, Text, TouchableWithoutFeedback, StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { Storage, API, graphqlOperation } from "aws-amplify";
import { clearVaultPostData } from "../../../redux/vault/vaultpostdata";
import { HalfbarButton } from "../../../resources/atoms";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";
import ModifyVaultData from "./ModifyVaultData";

import { deletePosts, updateUsers } from "../../../graphql/mutations";

async function RemoveFromBackend({
  postid,
  navigation,
  dispatch,
  vaultpostdata,
  vaultfeeddata,
  currentuser,
}) {
  const result = await API.graphql(
    graphqlOperation(`
        query GetPosts {
            getPosts (
                id: "${postid}"
            ) {
                id
                contenttype
                contentdate
                contentkey
                thumbnailkey
                sizeinbytes
            }
        }
        `),
  );

  const post = result.data.getPosts;

  if (post.contenttype === "video") {
    try {
      await Promise.all([
        API.graphql(graphqlOperation(deletePosts, { input: { id: postid } })),
        Storage.remove(post.contentkey),
        Storage.remove(post.thumbnailkey),
      ]);
    } catch (error) {
      console.log(`delete video error: ${error}`);
    }
  } else {
    try {
      await Promise.all([
        API.graphql(graphqlOperation(deletePosts, { input: { id: postid } })),
        Storage.remove(post.contentkey),
      ]);
    } catch (error) {
      console.log(`delete image error: ${error}`);
    }
  }

  try {
    const userResult = await API.graphql(
      graphqlOperation(`
            query GetUsers {
                getUsers (
                    id: "${currentuser.id}"
                ) {
                    storagesizeinbytes
                }
            }
        `),
    );

    const currentSize = userResult.data.getUsers.storagesizeinbytes;

    const newSize = currentSize - post.sizeinbytes;

    const updatedUser = {
      id: currentuser.id,
      storagesizeinbytes: newSize,
    };

    await API.graphql(graphqlOperation(updateUsers, { input: updatedUser }));
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  ModifyVaultData({
    action: "remove",
    vaultfeeddata,
    vaultpostdata,
    post,
    dispatch,
  });

  // dispatch(clearVaultPostData())
  navigation.navigate("HomeVault");
}

function DeletePost({ navigation, route }) {
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.profilemain.currentuser);
  const vaultpostdata = useSelector(
    (state) => state.vaultpostdata.vaultpostdata,
  );
  const vaultfeeddata = useSelector(
    (state) => state.vaultpostdata.vaultfeeddata,
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
          />
          <HalfbarButton
            label="😵 Do it"
            Action={() => {
              RemoveFromBackend({
                postid,
                navigation,
                dispatch,
                vaultpostdata,
                vaultfeeddata,
                currentuser,
              });
            }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

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
