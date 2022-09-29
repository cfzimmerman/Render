import react, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import { GlobalStyles, Environment, Colors } from "../../../global";
import { SystemmessageModal } from "../../../resources/molecules";

import GetAddedFeedData from "../operations/GetAddedFeedData";
import GetAddedUsersFilter from "../operations/GetAddedUsersFilter";
import GetCurrentUser from "../../profile/operations/GetCurrentUser";
import GetPageAssets from "../operations/GetPageAssets";
import GetPublicFeedData from "../operations/GetPublicFeedData";
import GetStoriesData from "../operations/GetStoriesData";
import GetVaultPreviewData from "../operations/GetVaultPreviewData";
import HomeListHeader from "../components/HomeListHeader";
import HomeTopLogo from "../components/HomeTopLogo";
import PostTile from "../components/PostTile";

function HomeLanding({ navigation }) {
  const [initialLoad, setInitialLoad] = useState(false);

  const [gotCurrentUser, setGotCurrentUser] = useState(false);

  const [gotAddedUsersFilter, setGotAddedUsersFilter] = useState(false);

  const [gotPublicFeed, setGotPublicFeed] = useState(false);

  // While you were gone (from friends)
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.profilemain.currentuser);
  const onboardingstatus = useSelector(
    (state) => state.homemain.onboardingstatus
  );
  const onboardingassets = useSelector((state) => state.onboarding.imageurls);

  const vaultheader = useSelector((state) => state.homemain.vaultheader);
  const pageassets = useSelector((state) => state.appstart.pageassets);
  const selectedfeed = useSelector((state) => state.homemain.selectedfeed);

  const addedusersfilter = useSelector(
    (state) => state.homemain.addedusersfilter
  );
  const gotaddedusersfilter = useSelector(
    (state) => state.homemain.gotAddedUsersFilter
  );

  const storiessectionlist = useSelector(
    (state) => state.homemain.storiessectionlist
  );
  const storiesfullview = useSelector(
    (state) => state.homemain.storiesfullview
  );

  const addedfeed = useSelector((state) => state.homemain.addedfeed);
  const addedfeednexttoken = useSelector(
    (state) => state.homemain.addedfeednexttoken
  );

  const publicfeed = useSelector((state) => state.homemain.publicfeed);
  const publicfeednexttoken = useSelector(
    (state) => state.homemain.publicfeednexttoken
  );

  if (pageassets === null) {
    GetPageAssets({ dispatch });
  } else if (
    typeof currentuser.cognitosub === "undefined" &&
    gotCurrentUser === false
  ) {
    GetCurrentUser({ dispatch });
    setGotCurrentUser(true);
  } else if (
    gotAddedUsersFilter === false &&
    typeof currentuser.cognitosub !== "undefined"
  ) {
    GetAddedUsersFilter({ dispatch, currentuser });
    setGotAddedUsersFilter(true);
  } else if (
    vaultheader === null &&
    typeof currentuser.cognitosub !== "undefined"
  ) {
    GetVaultPreviewData({ currentuser, dispatch });
  } else if (
    typeof currentuser.cognitosub !== "undefined" &&
    initialLoad === false &&
    gotaddedusersfilter === true
  ) {
    GetStoriesData({
      dispatch,
      storiessectionlist,
      currentuser,
      addedusersfilter,
    });
    GetAddedFeedData({
      dispatch,
      currentuser,
      addedusersfilter,
      addedfeed,
      addedfeednexttoken,
    });
    setInitialLoad(true);
  } else if (
    selectedfeed === "publicfeed" &&
    publicfeed.length === 0 &&
    gotPublicFeed === false
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
    }
    if (selectedfeed === "publicfeed") {
      return publicfeed;
    }
  };

  const EndReached = () => {
    if (
      selectedfeed === "addedfeed" &&
      addedfeed.length > 0 &&
      addedfeednexttoken != null &&
      initialLoad === true
    ) {
      GetAddedFeedData({
        dispatch,
        currentuser,
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
        currentuser,
        publicfeed,
        publicfeednexttoken,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerbox}>
        <TouchableOpacity>
          <View style={styles.logowrapper}>
            <HomeTopLogo />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Explore", { screen: "ExploreLanding" })
          }
        >
          <View style={[GlobalStyles.shadow, styles.searchbarwrapper]}>
            <Text
              style={[
                GlobalStyles.irregularshadow,
                GlobalStyles.h3text,
                styles.searchbartext,
              ]}
            >
              Search
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={FeedData()}
          ListHeaderComponent={() => (
            <HomeListHeader
              dispatch={dispatch}
              currentuser={currentuser}
              onboardingstatus={onboardingstatus}
              navigation={navigation}
              vaultheader={vaultheader}
              storiessectionlist={storiessectionlist}
              storiesfullview={storiesfullview}
              selectedfeed={selectedfeed}
            />
          )}
          style={styles.feedstyle}
          renderItem={({ item, index }) =>
            PostTile({
              item,
              index,
              dispatch,
              navigation,
              addedfeed,
              selectedfeed,
            })
          }
          ListFooterComponent={() => <View style={styles.footerstyle} />}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => EndReached()}
        />
      </View>

      <SystemmessageModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Secondary,
    flex: 1,
    alignItems: "center",
  },
  headerbox: {
    width: Environment.FullBar,
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: Environment.StandardPadding,
  },
  logowrapper: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    alignItems: "center",
    justifyContent: "center",
  },
  searchbarwrapper: {
    height: Environment.CubeSize,
    width: Environment.TextBarOption,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    padding: Environment.StandardPadding,
  },
  searchbartext: {
    color: Colors.AccentPartial,
  },
  feedstyle: {
    width: Environment.FullBar,
  },
  footerstyle: {
    marginBottom: Environment.HalfBar,
  },
});

export default HomeLanding;
