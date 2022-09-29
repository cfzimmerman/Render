import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../redux";
import { HalfbarButton, HalfByFullDisplayBox } from "../../../resources/atoms";
import GestureRecognizer from "react-native-swipe-gestures";
import { Environment } from "../../../global";
import {
  removeSelectedPost,
  setMultiSelectActive,
} from "../../../redux/homevaultmain";
import SentencePost from "../operations/SentencePost";

const GetInitialDescription = ({ selectedPosts }) => {
  if (selectedPosts.length === 1) {
    return "Delete 1 item?";
  } else {
    return "Delete " + selectedPosts.length + " items?";
  }
};

const PostMultiDelete = ({ navigation }) => {
  const [deletePosts, setDeletePosts] = useState(false);
  const [initialLength, setInitialLength] = useState(null);
  const [deletionCursor, setDeletionCursor] = useState(null);
  // Deletion cursor is a local datapoint used as a reference against the vaultfeeddata array
  // After we initiate post deletion, there's a brief pause before vaultfeeddata is updated (which must be accurate for local store modifications to complete successfully)
  // When the length of vaultfeeddata is equal to deletionCursor (which measures the length vaultfeeddata will be at after a successful deletion), we're able to safely begin the next deletion

  // Lol coming back to this after a few weeks. This could be radically simplified with a (for await (const item in array) {}) loop.

  const selectedPosts = useSelector(
    (state: RootStateType) => state.homevaultmain.selectedPosts
  );
  const vaultfeeddata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultfeeddata
  );
  const vaultpostdata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultpostdata
  );
  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const localLibrary = useSelector(
    (state: RootStateType) => state.localsync.localLibrary
  );
  const vaultnexttoken = useSelector(
    (state: RootStateType) => state.vaultpostdata.nextToken
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (deletionCursor === null) {
      // Triggered on initial load
      setDeletionCursor(vaultfeeddata.length);
      setInitialLength(selectedPosts.length);
    }

    if (selectedPosts.length === 0) {
      navigation.navigate("HomeVault");
    }

    if (
      deletePosts === true &&
      selectedPosts.length > 0 &&
      deletionCursor === vaultfeeddata.length
    ) {
      SentencePost({
        postid: selectedPosts[0],
        dispatch,
        vaultpostdata,
        vaultfeeddata,
        vaultnexttoken,
        currentuser,
        localLibrary,
      });
      dispatch(removeSelectedPost(selectedPosts[0]));
      setDeletionCursor(deletionCursor - 1);
    }
  });

  const initialDescription = GetInitialDescription({ selectedPosts });

  const InitiateDeletion = () => {
    if (deletePosts === false) {
      dispatch(setMultiSelectActive(false));
      setDeletePosts(true);
    }
  };

  return (
    <GestureRecognizer
      onSwipeDown={() => navigation.goBack()}
      style={styles.gestureWrapper}
    >
      <SafeAreaView style={styles.safeAreaWrapper}>
        <HalfByFullDisplayBox
          header={
            deletePosts === true
              ? `${initialLength - selectedPosts.length} / ${initialLength}`
              : "🪓"
          }
          title={deletePosts === true ? "Deleting" : initialDescription}
          description={deletePosts === true ? "" : "We'll make it painless."}
          Action={() => null}
          disabled={true}
        />
        <View style={styles.buttonHolder}>
          <HalfbarButton
            label={"Go back"}
            Action={() => {
              dispatch(setMultiSelectActive(true));
              navigation.goBack();
            }}
            active={false}
          />
          <HalfbarButton
            label={"Delete"}
            Action={InitiateDeletion}
            active={false}
          />
        </View>
      </SafeAreaView>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  gestureWrapper: {
    flex: 1,
  },
  safeAreaWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Environment.StandardPadding,
  },
  buttonHolder: {
    flexDirection: "row",
    width: Environment.FullBar,
    marginTop: Environment.StandardPadding,
    justifyContent: "space-between",
  },
});

export default PostMultiDelete;
