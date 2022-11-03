import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GestureRecognizer from "react-native-swipe-gestures";
import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "../../../../redux";
import { BlurView } from "expo-blur";
import {
  CommentType,
  CurrentUserType,
  PostType,
} from "../../../../global/CommonTypes";
import { Environment, Colors, GlobalStyles } from "../../../../global";
import CommentBody from "../components/CommentBody";
import BackArrow from "../../general/components/BackArrow";
import {
  clearCommentsData,
  setAddCommentActive,
  setFetchingComments,
} from "../../../../redux/socialmain";
import GetComments from "../operations/GetComments";
import DeleteCommentModal from "../components/DeleteCommentModal";
import CommentsEmptyComponent from "../components/CommentsEmptyComponent";
import AddCommentModal from "../components/AddCommentModal";
import { VaultPostFullViewUsecaseTypes } from "../../../home_vault/pages/VaultPostFullView";

const GetPost = ({
  usecase,
  gallerydata,
  otherusergallerydata,
  storiesfullview,
  addedfeed,
  publicfeed,
  universalPostData,
  hvGameSearchResults,
  vaultfeeddata,
  pgFullGamePosts,
}) => {
  if (usecase === "gallery") {
    return gallerydata;
  }
  if (usecase === "otherusergallery") {
    return otherusergallerydata;
  }
  if (usecase === "stories") {
    return storiesfullview;
  }
  if (usecase === "addedfeed") {
    return addedfeed;
  }
  if (usecase === "publicfeed") {
    return publicfeed;
  }
  if (usecase === "universal") {
    return universalPostData;
  }
  if (usecase === "HVGameSearch") {
    return hvGameSearchResults;
  }
  if (usecase === "vault") {
    return vaultfeeddata;
  }
  if (usecase === "PGLanding") {
    return pgFullGamePosts;
  }
};

const BackgroundImage = ({ postItem }) => {
  if (postItem.contenttype === "video") {
    return (
      <Image
        source={{ uri: postItem.thumbnailurl }}
        style={[StyleSheet.absoluteFill, styles.backgroundimage]}
        blurRadius={Environment.BlurRadius}
      />
    );
  } else if (postItem.contenttype === "image") {
    return (
      <Image
        source={{ uri: postItem.signedurl }}
        style={[StyleSheet.absoluteFill, styles.backgroundimage]}
        blurRadius={Environment.BlurRadius}
      />
    );
  }
};

const CommentsMain = ({ navigation, route }) => {
  const [gotComments, setGotComments] = useState(false);

  const usecase: VaultPostFullViewUsecaseTypes = route.params.usecase;
  const index: number = route.params.index;

  const dispatch = useDispatch();

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const commentsdata = useSelector(
    (state: RootStateType) => state.socialmain.commentsdata
  );
  const commentsnexttoken = useSelector(
    (state: RootStateType) => state.socialmain.commentsnexttoken
  );
  const fetchingcomments = useSelector(
    (state: RootStateType) => state.socialmain.fetchingcomments
  );

  const gallerydata = useSelector(
    (state: RootStateType) => state.profilemain.gallerydata
  );
  const otherusergallerydata = useSelector(
    (state: RootStateType) => state.otheruserprofile.otherusergallerydata
  );
  const storiesfullview = useSelector(
    (state: RootStateType) => state.homemain.storiesfullview
  );
  const addedfeed = useSelector(
    (state: RootStateType) => state.homemain.addedfeed
  );
  const publicfeed = useSelector(
    (state: RootStateType) => state.homemain.publicfeed
  );
  const universalPostData = useSelector(
    (state: RootStateType) => state.universalpost.universalPostData
  );
  const hvGameSearchResults = useSelector(
    (state: RootStateType) => state.gametags.hvGameSearchResults
  );
  const vaultfeeddata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultfeeddata
  );
  const pgFullGamePosts = useSelector(
    (state: RootStateType) => state.exploremain.pgFullGamePosts
  );

  const currentFeed = GetPost({
    usecase,
    gallerydata,
    otherusergallerydata,
    storiesfullview,
    addedfeed,
    publicfeed,
    universalPostData,
    hvGameSearchResults,
    vaultfeeddata,
    pgFullGamePosts,
  });

  const postItem: PostType = currentFeed[index];

  if (
    gotComments === false &&
    commentsdata.length === 0 &&
    fetchingcomments === false
  ) {
    GetComments({ commentsnexttoken, postItem, dispatch });
    setGotComments(true);
    dispatch(setFetchingComments(true));
  }

  const renderItem = ({ item, index }) => {
    return (
      <CommentBody
        commentItem={item}
        currentuser={currentuser}
        dispatch={dispatch}
        postOwnerID={postItem.userid}
      />
    );
  };

  const ListEmptyComponent = () => {
    return (
      <CommentsEmptyComponent
        gotComments={gotComments}
        fetchingcomments={fetchingcomments}
      />
    );
  };

  const ExitComments = () => {
    navigation.goBack(), dispatch(clearCommentsData());
  };

  return (
    <GestureRecognizer
      style={styles.container}
      onSwipeDown={ExitComments}
      onSwipeRight={ExitComments}
    >
      <View style={styles.flexWrapper}>
        <BackgroundImage postItem={postItem} />
        <SafeAreaView style={styles.flexWrapper}>
          <View style={styles.flatListHolder}>
            <FlatList
              data={commentsdata}
              renderItem={renderItem}
              style={styles.flatListStyle}
              contentContainerStyle={styles.flatListContentontainer}
              ListEmptyComponent={ListEmptyComponent}
            />
            <TouchableOpacity
              style={GlobalStyles.irregularshadow}
              onPress={() => {
                dispatch(setAddCommentActive(true));
              }}
            >
              <BlurView tint="dark" intensity={60} style={styles.blurWrapper}>
                <Text
                  style={[
                    GlobalStyles.h3text,
                    GlobalStyles.irregularshadow,
                    styles.placeHolder,
                  ]}
                >
                  Comment
                </Text>
              </BlurView>
            </TouchableOpacity>
            <View style={styles.backArrow} pointerEvents={"box-none"}>
              <BackArrow CustomAction={ExitComments} />
            </View>
          </View>
        </SafeAreaView>
      </View>
      <AddCommentModal
        dispatch={dispatch}
        item={postItem}
        usecase={usecase}
        index={index}
        currentuser={currentuser}
      />
      <DeleteCommentModal dispatch={dispatch} commentsdata={commentsdata} />
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  backgroundimage: {
    resizeMode: "cover",
    height: Environment.ScreenHeight,
    width: Environment.ScreenWidth,
    opacity: Environment.BackgroundOpacity,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  flexWrapper: {
    flex: 1,
  },
  flatListHolder: {
    paddingVertical: Environment.StandardPadding,
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  flatListStyle: {
    width: Environment.FullBar,
  },
  flatListContentontainer: {
    paddingBottom: Environment.StandardPadding,
    alignItems: "flex-end",
  },
  blurWrapper: {
    width: Environment.FullBar,
    height: Environment.CubeSize,
    borderRadius: Environment.StandardRadius,
    overflow: "hidden",
    padding: Environment.StandardPadding,
    justifyContent: "center",
  },
  placeHolder: {
    color: Colors.AccentPartial,
  },
  backArrow: {
    flex: 1,
    width: Environment.FullBar,
    position: "absolute",
    justifyContent: "space-between",
  },
});

export default CommentsMain;
