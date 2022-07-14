import react, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SectionGrid } from "react-native-super-grid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScrollToTop } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch, useSelector } from "react-redux";

import {
  setFetchingData,
  setVaultRefreshDate,
} from "../../../redux/vault/vaultpostdata";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
} from "../../../resources/project";
import { SystemmessageModal } from "../../../resources/molecules";
import GetAddedUsersFilter from "../home/GetAddedUsersFilter";
import GetCurrentUser from "../profile/GetCurrentUser";
import GetStoriesData from "../home/GetStoriesData";
import GetVaultData from "../vault/GetVaultData";
import HomeVaultHeader from "./HomeVaultHeader";
import NoUploads from "./NoUploads";
import SectionGridFooter from "../vault/SectionGridFooter";
import VaultSectionHeader from "../vault/VaultSectionHeader";
import VaultSectionItem from "../vault/VaultSectionItem";
import LSGetConfig from "../profile/LSGetConfig";
import LSGetLibrary from "../profile/LSGetLibrary";
import CheckDeletedPosts from "./CheckDeletedPosts";
import RefreshHomeVault from "./RefreshHomeVault";
import LSGetNotificationStore from "./LSGetNotificationStore";
import GetNotificationsCloud from "./GetNotificationsCloud";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function DelayCheckPosts({ dispatch, localLibrary, currentuser }) {
  if (typeof currentuser.id != "undefined") {
    setTimeout(() => {
      CheckDeletedPosts({ userID: currentuser.id, dispatch, localLibrary });
    }, 6000);
  }
}

const HomeVaultLanding = ({ navigation }) => {
  // How to initial load without flickering? Long splash screen?

  const [initialLoad, setInitialLoad] = useState(false);

  const [gotAddedUsersFilter, setGotAddedUsersFilter] = useState(false);

  const [gotInitialVaultData, setGotInitialVaultData] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentuser = useSelector((state) => state.profilemain.currentuser);
  const onboardingstatus = useSelector(
    (state) => state.homemain.onboardingstatus
  );

  const vaultpostdata = useSelector(
    (state) => state.vaultpostdata.vaultpostdata
  );
  const vaultfeeddata = useSelector(
    (state) => state.vaultpostdata.vaultfeeddata
  );
  const nextToken = useSelector((state) => state.vaultpostdata.nextToken);
  const fetchingdata = useSelector((state) => state.vaultpostdata.fetchingdata);

  const addedusersfilter = useSelector(
    (state) => state.homemain.addedusersfilter
  );
  const gotaddedusersfilter = useSelector(
    (state) => state.homemain.gotaddedusersfilter
  );

  const storiessectionlist = useSelector(
    (state) => state.homemain.storiessectionlist
  );
  const storiesfullview = useSelector(
    (state) => state.homemain.storiesfullview
  );
  const vaultRefreshDate = useSelector(
    (state) => state.vaultpostdata.vaultrefreshdate
  );

  const localConfig = useSelector((state) => state.localsync.localConfig);
  const localLibrary = useSelector((state) => state.localsync.localLibrary);
  const unreadCutoffDate = useSelector(
    (state) => state.notifications.unreadCutoffDate
  );

  const dispatch = useDispatch();

  const ref = useRef(null);

  useScrollToTop(ref);

  if (
    gotAddedUsersFilter === false &&
    typeof currentuser.cognitosub !== "undefined" &&
    currentuser.cognitosub != null
  ) {
    GetAddedUsersFilter({ dispatch, currentuser });
    LSGetConfig({ dispatch });
    LSGetLibrary({ dispatch });
    LSGetNotificationStore({ dispatch });
    setGotAddedUsersFilter(true);
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
    DelayCheckPosts({ dispatch, localLibrary, currentuser });
    setInitialLoad(true);
  } else if (unreadCutoffDate != null) {
    GetNotificationsCloud({ currentuser, unreadCutoffDate, dispatch });
  }

  async function HideSplash() {
    await SplashScreen.hideAsync();
  }

  if (
    vaultpostdata.length === 0 &&
    nextToken === null &&
    initialLoad === true &&
    gotInitialVaultData === false
  ) {
    GetVaultData({
      dispatch,
      vaultpostdata,
      cognitosub: currentuser.cognitosub,
      nextToken,
      syncPreference: localConfig.syncPreference,
      localLibrary,
    }); // .then((result) => console.log(result))
    HideSplash();
    setGotInitialVaultData(true);
  }

  const EndReached = () => {
    if (
      vaultpostdata.length > 0 &&
      nextToken != null &&
      fetchingdata === false
    ) {
      dispatch(setFetchingData(true));
      GetVaultData({
        dispatch,
        vaultpostdata,
        cognitosub: currentuser.cognitosub,
        nextToken,
        syncPreference: localConfig.syncPreference,
        localLibrary,
      });
    }
  };

  const renderItem = ({ item }) => (
    <VaultSectionItem
      item={item}
      navigation={navigation}
      vaultfeeddata={vaultfeeddata}
    />
  );

  const renderSectionHeader = ({ section }) => (
    <VaultSectionHeader
      section={section}
      navigation={navigation}
      vaultfeeddata={vaultfeeddata}
    />
  );

  async function OnRefresh() {
    setIsRefreshing(true);
    RefreshHomeVault({
      cognitosub: currentuser.cognitosub,
      userID: currentuser.id,
      dispatch,
      vaultpostdata,
      vaultfeeddata,
      syncPreference: localConfig.syncPreference,
      localLibrary,
      vaultNextToken: nextToken,
      refreshDateString: vaultRefreshDate,
    });
    await sleep(2000);
    dispatch(setVaultRefreshDate(new Date().toISOString()));
    setIsRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <SectionGrid
        sections={vaultpostdata}
        style={styles.sectiongridstyle}
        key={(item) => item.id}
        itemDimension={Environment.HalfBar}
        ref={ref}
        fixed
        spacing={0}
        refreshing={isRefreshing}
        onRefresh={OnRefresh}
        stickySectionHeadersEnabled={false}
        additionalRowStyle={styles.sectiongridrowstyle}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        onEndReachedThreshold={1}
        onEndReached={EndReached}
        ListHeaderComponent={HomeVaultHeader({
          navigation,
          dispatch,
          storiesfullview,
          storiessectionlist,
          currentuser,
        })}
        ListFooterComponent={SectionGridFooter({
          length: vaultfeeddata.length,
          vaultNextToken: nextToken,
        })}
        ListEmptyComponent={NoUploads({
          navigation,
          firstvaultupload: currentuser.firstvaultupload,
        })}
      />
      <SystemmessageModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
    alignItems: "center",
    width: Environment.ScreenWidth,
  },
  sectiongridstyle: {
    flex: 1,
    width: Environment.ScreenWidth,
  },
  sectiongridrowstyle: {
    marginVertical: Environment.SmallPadding,
  },
  unauthenticateduserwrapper: {
    flex: 1,
    backgroundColor: Colors.Secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  unauthenticatedusermessage: {
    color: Colors.AccentOn,
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
  logowrapper: {
    height: Environment.CubeSize,
    width: Environment.CubeSize,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeVaultLanding;
