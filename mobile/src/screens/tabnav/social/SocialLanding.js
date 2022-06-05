import react, { useState, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScrollToTop } from "@react-navigation/native";

import { Colors, Environment, GlobalStyles } from "../../../resources/project";
import ChangeSelectedFeed from "../home/ChangeSelectedFeed";
import GetAddedFeedData from "../home/GetAddedFeedData";
import GetAddedUsersFilter from "../home/GetAddedUsersFilter";
import GetPublicFeedData from "../home/GetPublicFeedData";
import NoFriendsTab from "./NoFriendsTab";
import PostTile from "../home/PostTile";
import SocialHeader from "./SocialHeader";

function SocialLanding({ navigation }) {
  const [gotAddedUsersFilter, setGotAddedUsersFilter] = useState(false);

  const [gotAddedFeed, setGotAddedFeed] = useState(false);

  const [gotPublicFeed, setGotPublicFeed] = useState(false);

  const currentuser = useSelector((state) => state.profilemain.currentuser);

  const selectedfeed = useSelector((state) => state.homemain.selectedfeed);

  const addedusersfilter = useSelector(
    (state) => state.homemain.addedusersfilter,
  );
  const gotaddedusersfilter = useSelector(
    (state) => state.homemain.gotaddedusersfilter,
  );

  const addedfeed = useSelector((state) => state.homemain.addedfeed);
  const addedfeednexttoken = useSelector(
    (state) => state.homemain.addedfeednexttoken,
  );

  const publicfeed = useSelector((state) => state.homemain.publicfeed);
  const publicfeednexttoken = useSelector(
    (state) => state.homemain.publicfeednexttoken,
  );

  const dispatch = useDispatch();

  if (gotAddedUsersFilter === false && addedusersfilter.length === 0) {
    GetAddedUsersFilter({ dispatch, currentuser });
    setGotAddedUsersFilter(true);
  } else if (
    (gotAddedUsersFilter === true || addedusersfilter.length > 0)
    && gotAddedFeed === false
  ) {
    GetAddedFeedData({
      dispatch,
      currentuser,
      addedusersfilter,
      addedfeed,
      addedfeednexttoken,
    });
    setGotAddedFeed(true);
  } else if (
    selectedfeed === "publicfeed"
    && publicfeed.length === 0
    && gotPublicFeed === false
  ) {
    GetPublicFeedData({
      dispatch,
      currentuser,
      publicfeed,
      publicfeednexttoken,
    });
    setGotPublicFeed(true);
  }

  const FeedData = () => {
    if (selectedfeed === "addedfeed") {
      return addedfeed;
    } if (selectedfeed === "publicfeed") {
      return publicfeed;
    }
  };

  const EndReached = () => {
    if (
      selectedfeed === "addedfeed"
      && addedfeed.length > 0
      && addedfeednexttoken != null
      && gotAddedFeed === true
    ) {
      GetAddedFeedData({
        dispatch,
        currentuser,
        addedusersfilter,
        addedfeed,
        addedfeednexttoken,
      });
    } else if (
      selectedfeed === "publicfeed"
      && publicfeed.length > 0
      && publicfeednexttoken != null
      && gotPublicFeed === true
    ) {
      GetPublicFeedData({
        dispatch,
        currentuser,
        publicfeed,
        publicfeednexttoken,
      });
    }
  };

  const ref = useRef(null);

  useScrollToTop(ref);

  // No friends -> add some friends

  const renderItem = ({ item, index }) => PostTile({
    item, index, dispatch, navigation, addedfeed, selectedfeed,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={FeedData()}
        ref={ref}
        ListHeaderComponent={() => (
          <SocialHeader
            dispatch={dispatch}
            currentuser={currentuser}
            navigation={navigation}
            selectedfeed={selectedfeed}
          />
        )}
        style={styles.feedstyle}
        renderItem={renderItem}
        ListFooterComponent={() => <View style={styles.footerstyle} />}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => EndReached()}
        ListEmptyComponent={() => NoFriendsTab({ addedusersfilter, navigation })}
      />
    </View>
  );
}

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
