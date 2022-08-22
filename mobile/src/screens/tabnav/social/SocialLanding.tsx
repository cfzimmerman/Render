import React, { useState, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useScrollToTop } from "@react-navigation/native";
import { Colors, Environment } from "../../../resources/project";
import GetAddedFeedData from "../home/GetAddedFeedData";
import GetAddedUsersFilter from "../home/GetAddedUsersFilter";
import GetPublicFeedData from "../home/GetPublicFeedData";
import NoFriendsTab from "./NoFriendsTab";
import PostTile from "../home/PostTile";
import RefreshPublicFeed from "./RefreshPublicFeed";
import SocialHeader from "./SocialHeader";
import RefreshAddedFeed from "./RefreshAddedFeed";
import { RootStateType } from "../../../redux/store";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SocialLanding = ({ navigation }) => {
  const [gotAddedUsersFilter, setGotAddedUsersFilter] = useState(false);

  const [gotAddedFeed, setGotAddedFeed] = useState(false);

  const [gotPublicFeed, setGotPublicFeed] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [publicRefreshDate, setPublicRefreshDate] = useState(
    "1984-01-24T14:23:00.000Z"
  );

  const [addedRefreshDate, setAddedRefreshDate] = useState(
    "1984-01-24T14:23:00.000Z"
  );

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );

  const selectedfeed = useSelector(
    (state: RootStateType) => state.homemain.selectedfeed
  );

  const addedusersfilter = useSelector(
    (state: RootStateType) => state.homemain.addedusersfilter
  );

  const addedfeed = useSelector(
    (state: RootStateType) => state.homemain.addedfeed
  );
  const addedfeednexttoken = useSelector(
    (state: RootStateType) => state.homemain.addedfeednexttoken
  );

  const publicfeed = useSelector(
    (state: RootStateType) => state.homemain.publicfeed
  );
  const publicfeednexttoken = useSelector(
    (state: RootStateType) => state.homemain.publicfeednexttoken
  );

  const dispatch = useDispatch();

  if (gotAddedUsersFilter === false && addedusersfilter.length === 0) {
    GetAddedUsersFilter({ dispatch, currentuser });
    setGotAddedUsersFilter(true);
  } else if (
    (gotAddedUsersFilter === true || addedusersfilter.length > 0) &&
    gotAddedFeed === false
  ) {
    GetAddedFeedData({
      dispatch,
      addedusersfilter,
      addedfeed,
      addedfeednexttoken,
    });
    setAddedRefreshDate(new Date().toISOString());
    setGotAddedFeed(true);
  } else if (
    selectedfeed === "publicfeed" &&
    publicfeed.length === 0 &&
    gotPublicFeed === false
  ) {
    GetPublicFeedData({
      dispatch,
      publicfeednexttoken,
    });
    setPublicRefreshDate(new Date().toISOString());
    setGotPublicFeed(true);
  }

  const FeedData = () => {
    if (selectedfeed === "addedfeed") {
      return addedfeed;
    }
    if (selectedfeed === "publicfeed") {
      return publicfeed;
    }
  };

  const EndReached = () => {
    console.log("End Reached");
    if (
      selectedfeed === "addedfeed" &&
      addedfeed.length > 0 &&
      addedfeednexttoken != null &&
      gotAddedFeed === true
    ) {
      GetAddedFeedData({
        dispatch,
        addedusersfilter,
        addedfeed,
        addedfeednexttoken,
      });
    } else if (
      selectedfeed === "publicfeed" &&
      publicfeed.length > 0 &&
      publicfeednexttoken != null &&
      gotPublicFeed === true
    ) {
      GetPublicFeedData({
        dispatch,
        publicfeednexttoken,
      });
    }
  };

  const ref = useRef(null);

  useScrollToTop(ref);

  // No friends -> add some friends

  const renderItem = ({ item, index }) => (
    <PostTile
      item={item}
      index={index}
      dispatch={dispatch}
      navigation={navigation}
      addedfeed={addedfeed}
      selectedfeed={selectedfeed}
    />
  );

  const FooterComponent = () => {
    return <View style={styles.footerstyle} />;
  };

  async function OnRefresh() {
    if (isRefreshing === false) {
      setIsRefreshing(true);
      if (selectedfeed === "publicfeed") {
        RefreshPublicFeed({ dispatch, publicRefreshDate, publicfeed });
        setPublicRefreshDate(new Date().toISOString());
      } else if (selectedfeed === "addedfeed") {
        RefreshAddedFeed({
          dispatch,
          addedRefreshDate, // HERE !!!  conditional send addedRefreshDate if addedusersfilter is untouched. Different stuff if addedusersfilter is updated.
          addedfeed,
          addedusersfilter,
        });
        setAddedRefreshDate(new Date().toISOString());
      }
      await sleep(2000);
      setIsRefreshing(false);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={FeedData()}
        ref={ref}
        ListHeaderComponent={SocialHeader({
          dispatch,
          currentuser,
          navigation,
          selectedfeed,
        })}
        refreshing={isRefreshing}
        onRefresh={OnRefresh}
        style={styles.feedstyle}
        renderItem={renderItem}
        ListFooterComponent={FooterComponent}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={EndReached}
        ListEmptyComponent={NoFriendsTab({ addedusersfilter, navigation })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Secondary,
    flex: 1,
    alignItems: "center",
  },
  feedstyle: {
    width: Environment.FullBar,
  },
  footerstyle: {
    marginBottom: Environment.HalfBar,
  },
});

export default SocialLanding;
