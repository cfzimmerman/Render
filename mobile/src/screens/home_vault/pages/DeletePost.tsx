import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { HalfbarButton } from "../../../resources/atoms";
import { Environment, Colors, GlobalStyles } from "../../../global";
import SentencePost from "../operations/SentencePost";
import { RootStateType } from "../../../redux";

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
                vaultfeeddata,
                vaultpostdata,
                postid,
                currentuser,
                vaultnexttoken,
                localLibrary,
              });
              navigation.navigate("HomeVault");
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
