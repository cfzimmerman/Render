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
import GetVaultData from "./GetVaultData";
import UpdatePostInteraction from "../../masterstack/contentdisplay/UpdatePostInteraction";
import UpdateStoriesViewed from "../home/UpdateStoriesViewed";

const VaultPostFullView = ({ navigation, route }) => {
  const currentuser = useSelector((state) => state.profilemain.currentuser);

  const vaultpostdata = useSelector(
    (state) => state.vaultpostdata.vaultpostdata
  );
  const vaultnexttoken = useSelector((state) => state.vaultpostdata.nextToken);
  const fetchingvaultdata = useSelector(
    (state) => state.vaultpostdata.fetchingdata
  );

  const storiesfullview = useSelector(
    (state) => state.homemain.storiesfullview
  );
  const feeddata = useSelector((state) => state.vaultpostdata.vaultfeeddata);
  const gallerydata = useSelector((state) => state.profilemain.gallerydata);
  const gallerynexttoken = useSelector(
    (state) => state.profilemain.gallerynexttoken
  );
  const fetchinggallerydata = useSelector(
    (state) => state.profilemain.fetchinggallerydata
  );

  const otheruser = useSelector((state) => state.otheruserprofile.otheruser);
  const otherusergallerydata = useSelector(
    (state) => state.otheruserprofile.otherusergallerydata
  );
  const otherusergallerynexttoken = useSelector(
    (state) => state.otheruserprofile.otherusergallerynexttoken
  );
  const fetchingotherusergallerydata = useSelector(
    (state) => state.otheruserprofile.fetchingotherusergallerydata
  );

  const addedfeed = useSelector((state) => state.homemain.addedfeed);
  const addedfeednexttoken = useSelector(
    (state) => state.homemain.addedfeednexttoken
  );
  const addedusersfilter = useSelector(
    (state) => state.homemain.addedusersfilter
  );
  const fetchingaddedfeeddata = useSelector(
    (state) => state.homemain.fetchingaddedfeeddata
  );

  const publicfeed = useSelector((state) => state.homemain.publicfeed);
  const publicfeednexttoken = useSelector(
    (state) => state.homemain.publicfeednexttoken
  );
  const fetchingpublicfeeddata = useSelector(
    (state) => state.homemain.fetchingpublicfeeddata
  );

  const commentsdata = useSelector((state) => state.socialmain.commentsdata);

  const { cognitosub } = currentuser;

  const { usecase } = route.params;

  const CorrectFeedData = () => {
    if (usecase === "vault") {
      return feeddata;
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
        cognitosub,
        nextToken: vaultnexttoken,
      });
    } else if (
      usecase === "gallery" &&
      gallerydata.length > 0 &&
      gallerynexttoken != null &&
      fetchinggallerydata === false
    ) {
      dispatch(setFetchingGalleryData(false));
      GetGalleryData({
        dispatch,
        gallerydata,
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
        currentuser,
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
        currentuser,
        publicfeed,
        publicfeednexttoken,
      });
    } else if (usecase === "stories") {
      console.log("EndReached");
    }
  };

  const dispatch = useDispatch();

  /*
    ScreenOrientation.unlockAsync()

    const listener = ScreenOrientation.addOrientationChangeListener(( change ) => {
        if ((change.orientationInfo.orientation === 3) || (change.orientationInfo.orientation === 4)) {
            ChangeLandscape({ dispatch: dispatch, set: true })
            ChangeFocusView({ dispatch: dispatch, set: true })
            navigation.navigate('VaultPostFocusView', { usecase: usecase })
        } else {
            ChangeLandscape({ dispatch: dispatch, set: false })
        }
    })
    */

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
