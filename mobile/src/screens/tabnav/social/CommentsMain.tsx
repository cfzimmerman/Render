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
import { RootStateType } from "../../../redux/store";
import { BlurView } from "expo-blur";
import {
  CommentType,
  CurrentUserType,
  PostType,
} from "../../../resources/CommonTypes";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";
import CommentBody from "./CommentBody";
import { BackArrow } from "../../../resources/atoms";
import {
  clearCommentsData,
  setAddCommentActive,
  setFetchingComments,
} from "../../../redux/social/socialmain";
import GetComments from "./GetComments";
import DeleteCommentModal from "./DeleteCommentModal";
import CommentsEmptyComponent from "./CommentsEmptyComponent";
import AddCommentModal from "./AddCommentModal";

const GetPost = ({
  usecase,
  gallerydata,
  otherusergallerydata,
  storiesfullview,
  addedfeed,
  publicfeed,
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

  const usecase:
    | "gallery"
    | "otherusergallery"
    | "stories"
    | "addedfeed"
    | "publicfeed" = route.params.usecase;
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

  const currentFeed = GetPost({
    usecase,
    gallerydata,
    otherusergallerydata,
    storiesfullview,
    addedfeed,
    publicfeed,
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

  return (
    <GestureRecognizer
      style={{ flex: 1, backgroundColor: Colors.Background }}
      onSwipeDown={() => {
        navigation.goBack(), dispatch(clearCommentsData());
      }}
      onSwipeRight={() => {
        navigation.goBack(), dispatch(clearCommentsData());
      }}
    >
      <View style={{ flex: 1 }}>
        <BackgroundImage postItem={postItem} />
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              paddingVertical: Environment.StandardPadding,
              alignItems: "center",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <FlatList
              data={commentsdata}
              renderItem={renderItem}
              style={{ width: Environment.FullBar }}
              contentContainerStyle={{
                paddingBottom: Environment.StandardPadding,
                alignItems: "flex-end",
              }}
              ListEmptyComponent={ListEmptyComponent}
            />
            <TouchableOpacity
              style={GlobalStyles.irregularshadow}
              onPress={() => {
                dispatch(setAddCommentActive(true));
              }}
            >
              <BlurView
                tint="dark"
                intensity={60}
                style={{
                  width: Environment.FullBar,
                  height: Environment.CubeSize,
                  borderRadius: Environment.StandardRadius,
                  overflow: "hidden",
                  padding: Environment.StandardPadding,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[
                    GlobalStyles.h3text,
                    GlobalStyles.irregularshadow,
                    { color: Colors.AccentPartial },
                  ]}
                >
                  Comment
                </Text>
              </BlurView>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                width: Environment.FullBar,
                position: "absolute",
                justifyContent: "space-between",
              }}
              pointerEvents={"box-none"}
            >
              <BackArrow />
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
});

export default CommentsMain;
