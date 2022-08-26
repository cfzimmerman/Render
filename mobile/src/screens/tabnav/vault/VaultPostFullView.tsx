import react, { useRef } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useSelector, useDispatch } from "react-redux";

import { Environment, Colors } from "../../../resources/project";

import { clearCommentsData } from "../../../redux/social/socialmain";
import { setFetchingData } from "../../../redux/vault/vaultpostdata";
import { setFetchingGalleryData } from "../../../redux/profile/profilemain";
import { setFetchingOtherUserGalleryData } from "../../../redux/explore/otheruserprofile";
import {
  setFetchingAddedFeedData,
  setFetchingPublicFeedData,
} from "../../../redux/home/homemain";
import ChangeActivePost from "./ChangeActivePost";
import ChangeFocusView from "./ChangeFocusView";
import ChangeLandscape from "./ChangeLandscape";
import FullViewContent from "./FullViewContent";
import GetAddedFeedData from "../home/GetAddedFeedData";
import GetOtherUserGalleryData from "../explore/GetOtherUserGalleryData";
import GetPublicFeedData from "../home/GetPublicFeedData";
import GetGalleryData from "../profile/GetGalleryData";
import GetVaultData from "./GetVaultData";
import UpdatePostInteraction from "../../masterstack/contentdisplay/UpdatePostInteraction";
import UpdateStoriesViewed from "../home/UpdateStoriesViewed";
import { RootStateType } from "../../../redux/store";
import { SystemmessageModal } from "../../../resources/molecules";
import GameInfoModal from "../homevault/GameTags/GameInfoModal";
import { setHVGameSearchActive } from "../../../redux/homevault/gametags";
import HVGetGamePosts from "../homevault/GameTags/HVGetGamePosts";

export type VaultPostFullViewUsecaseTypes =
  | "vault"
  | "gallery"
  | "otherusergallery"
  | "addedfeed"
  | "publicfeed"
  | "stories"
  | "universal"
  | "HVGameSearch";

interface UsecaseObject {
  usecase: VaultPostFullViewUsecaseTypes;
}

const VaultPostFullView = ({ navigation, route }) => {
  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );

  const vaultpostdata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultpostdata
  );
  const vaultnexttoken = useSelector(
    (state: RootStateType) => state.vaultpostdata.nextToken
  );
  const fetchingvaultdata = useSelector(
    (state: RootStateType) => state.vaultpostdata.fetchingdata
  );
  const storiesfullview = useSelector(
    (state: RootStateType) => state.homemain.storiesfullview
  );
  const vaultfeeddata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultfeeddata
  );
  const gallerydata = useSelector(
    (state: RootStateType) => state.profilemain.gallerydata
  );
  const gallerynexttoken = useSelector(
    (state: RootStateType) => state.profilemain.gallerynexttoken
  );
  const fetchingGalleryData = useSelector(
    (state: RootStateType) => state.profilemain.fetchingGalleryData
  );

  const otheruser = useSelector(
    (state: RootStateType) => state.otheruserprofile.otheruser
  );
  const otherusergallerydata = useSelector(
    (state: RootStateType) => state.otheruserprofile.otherusergallerydata
  );
  const otherusergallerynexttoken = useSelector(
    (state: RootStateType) => state.otheruserprofile.otherusergallerynexttoken
  );
  const fetchingotherusergallerydata = useSelector(
    (state: RootStateType) =>
      state.otheruserprofile.fetchingotherusergallerydata
  );

  const addedfeed = useSelector(
    (state: RootStateType) => state.homemain.addedfeed
  );
  const addedfeednexttoken = useSelector(
    (state: RootStateType) => state.homemain.addedfeednexttoken
  );
  const addedusersfilter = useSelector(
    (state: RootStateType) => state.homemain.addedusersfilter
  );
  const fetchingaddedfeeddata = useSelector(
    (state: RootStateType) => state.homemain.fetchingaddedfeeddata
  );

  const publicfeed = useSelector(
    (state: RootStateType) => state.homemain.publicfeed
  );
  const publicfeednexttoken = useSelector(
    (state: RootStateType) => state.homemain.publicfeednexttoken
  );
  const fetchingpublicfeeddata = useSelector(
    (state: RootStateType) => state.homemain.fetchingpublicfeeddata
  );

  const universalPostData = useSelector(
    (state: RootStateType) => state.universalpost.universalPostData
  );

  const hvGameSearchResults = useSelector(
    (state: RootStateType) => state.gametags.hvGameSearchResults
  );
  const hvGameSearchNextToken = useSelector(
    (state: RootStateType) => state.gametags.hvGameSearchNextToken
  );
  const hvGameSearchActive = useSelector(
    (state: RootStateType) => state.gametags.hvGameSearchActive
  );

  const commentsdata = useSelector(
    (state: RootStateType) => state.socialmain.commentsdata
  );

  const localConfig = useSelector(
    (state: RootStateType) => state.localsync.localConfig
  );
  const localLibrary = useSelector(
    (state: RootStateType) => state.localsync.localLibrary
  );

  const { cognitosub } = currentuser;

  const { usecase }: UsecaseObject = route.params;

  const CorrectFeedData = () => {
    if (usecase === "vault") {
      return vaultfeeddata;
    }
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
  };

  const EndReached = () => {
    if (
      usecase === "vault" &&
      vaultpostdata.length > 0 &&
      vaultnexttoken != null &&
      fetchingvaultdata === false
    ) {
      dispatch(setFetchingData(true));
      GetVaultData({
        dispatch,
        vaultpostdata,
        cognitosub,
        nextToken: vaultnexttoken,
        localLibrary,
        syncPreference: localConfig.syncPreference,
        limit: undefined,
      });
    } else if (
      usecase === "gallery" &&
      gallerydata.length > 0 &&
      gallerynexttoken != null &&
      fetchingGalleryData === false
    ) {
      dispatch(setFetchingGalleryData(false));
      GetGalleryData({
        dispatch,
        cognitosub,
        nextToken: gallerynexttoken,
        userID: currentuser.id,
      });
    } else if (
      usecase === "otherusergallery" &&
      otherusergallerydata.length > 0 &&
      otherusergallerynexttoken != null &&
      fetchingotherusergallerydata === false
    ) {
      dispatch(setFetchingOtherUserGalleryData(true));
      GetOtherUserGalleryData({
        dispatch,
        otherusergallerydata,
        otheruser,
        nextToken: otherusergallerynexttoken,
      });
    } else if (
      usecase === "addedfeed" &&
      addedfeed.length > 0 &&
      addedfeednexttoken != null &&
      fetchingaddedfeeddata === false
    ) {
      dispatch(setFetchingAddedFeedData(true));
      GetAddedFeedData({
        dispatch,
        addedusersfilter,
        addedfeed,
        addedfeednexttoken,
      });
    } else if (
      usecase === "publicfeed" &&
      publicfeed.length > 0 &&
      publicfeednexttoken != null &&
      fetchingpublicfeeddata === false
    ) {
      dispatch(setFetchingPublicFeedData(true));
      GetPublicFeedData({
        dispatch,
        publicfeednexttoken,
      });
    } else if (
      usecase === "HVGameSearch" &&
      hvGameSearchResults.length > 0 &&
      hvGameSearchNextToken != null &&
      hvGameSearchActive === false
    ) {
      dispatch(setHVGameSearchActive(true));
      HVGetGamePosts({
        gameID: hvGameSearchResults[0].gamesID,
        currentUserID: currentuser.id,
        dispatch,
        coverID: hvGameSearchResults[0].coverID,
        title: hvGameSearchResults[0].title,
        vaultfeeddata,
        hvGameSearchNextToken,
      });
    }
    /*
     else if (usecase === "stories" || usecase === "universal") {
      console.log("EndReached");
    }
    */
  };

  const dispatch = useDispatch();

  ScreenOrientation.unlockAsync();

  const listener = ScreenOrientation.addOrientationChangeListener((change) => {
    if (
      change.orientationInfo.orientation === 3 ||
      change.orientationInfo.orientation === 4
    ) {
      ChangeLandscape({ dispatch: dispatch, set: true });
      ChangeFocusView({ dispatch: dispatch, set: true });
      navigation.navigate("VaultPostFocusView", { usecase: usecase });
    } else {
      ChangeLandscape({ dispatch: dispatch, set: false });
    }
  });

  const onviewref = useRef((viewableItems) => {
    ChangeActivePost({
      dispatch,
      index: viewableItems.viewableItems[0].index,
    });

    if (usecase === "otherusergallery" || usecase === "stories") {
      UpdatePostInteraction({
        postid: viewableItems.viewableItems[0].item.id,
        currentuserid: currentuser.id,
      });
    }

    if (commentsdata.length != 0) {
      dispatch(clearCommentsData());
      console.log("ClearComments");
    }

    if (usecase === "stories") {
      UpdateStoriesViewed({
        dispatch,
        targetcognitosub: viewableItems.viewableItems[0].item.cognitosub,
      });
    }
  });

  const viewconfigref = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const renderItem = ({ item, index }) => (
    <FullViewContent
      item={item}
      index={index}
      dispatch={dispatch}
      navigation={navigation}
      usecase={usecase}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={CorrectFeedData()}
        initialScrollIndex={route.params.startindex}
        renderItem={renderItem}
        initialNumToRender={2}
        removeClippedSubviews
        maxToRenderPerBatch={5}
        windowSize={5}
        showsHorizontalScrollIndicator={false}
        horizontal
        decelerationRate="fast"
        snapToInterval={Environment.ScreenWidth}
        getItemLayout={(data, index) => ({
          length: Environment.ScreenWidth,
          index,
          offset: Environment.ScreenWidth * index,
        })}
        onViewableItemsChanged={onviewref.current}
        viewabilityConfig={viewconfigref.current}
        onEndReachedThreshold={1.5}
        onEndReached={EndReached}
      />
      <SystemmessageModal />
      <GameInfoModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
});

export default VaultPostFullView;
