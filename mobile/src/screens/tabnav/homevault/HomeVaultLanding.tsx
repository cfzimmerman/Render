import react, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SectionGrid } from "react-native-super-grid";
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
import { RootStateType } from "../../../redux/store";
import LSUpdateNotificationStore from "./LSUpdateNotificationStore";
import HomeVaultOptionsBar from "./HomeVaultOptionsBar";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function DelayCheckPosts({ dispatch, localLibrary, currentuser }) {
  // After a brief pause for other items to load, this checks if there are any recently deleted posts that need to be removed from the backend
  // We could do this in the backend as well, but this structure saves us Lambda time fees.
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

  const [gotNotifications, setGotNotifications] = useState(false);

  const [updatedNotificationStore, setUpdatedNotificationStore] =
    useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const onboardingstatus = useSelector(
    (state: RootStateType) => state.homemain.onboardingstatus
  );

  const vaultpostdata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultpostdata
  );
  const vaultfeeddata = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultfeeddata
  );
  const nextToken = useSelector(
    (state: RootStateType) => state.vaultpostdata.nextToken
  );
  const fetchingdata = useSelector(
    (state: RootStateType) => state.vaultpostdata.fetchingdata
  );

  const addedusersfilter = useSelector(
    (state: RootStateType) => state.homemain.addedusersfilter
  );
  const gotaddedusersfilter = useSelector(
    (state: RootStateType) => state.homemain.gotaddedusersfilter
  );

  const storiessectionlist = useSelector(
    (state: RootStateType) => state.homemain.storiessectionlist
  );
  const storiesfullview = useSelector(
    (state: RootStateType) => state.homemain.storiesfullview
  );
  const vaultRefreshDate = useSelector(
    (state: RootStateType) => state.vaultpostdata.vaultrefreshdate
  );

  const localConfig = useSelector(
    (state: RootStateType) => state.localsync.localConfig
  );
  const localLibrary = useSelector(
    (state: RootStateType) => state.localsync.localLibrary
  );
  const unreadCutoffDate = useSelector(
    (state: RootStateType) => state.notifications.unreadCutoffDate
  );
  const newNotificationData = useSelector(
    (state: RootStateType) => state.notifications.newNotificationData
  );
  const numberUnread = useSelector(
    (state: RootStateType) => state.notifications.numberUnread
  );
  const selectedPosts = useSelector(
    (state: RootStateType) => state.homevaultmain.selectedPosts
  );

  const multiSelectActive = useSelector(
    (state: RootStateType) => state.homevaultmain.multiSelectActive
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
  } else if (unreadCutoffDate != null && gotNotifications === false) {
    GetNotificationsCloud({ currentuser, unreadCutoffDate, dispatch });
    setGotNotifications(true);
  } else if (
    updatedNotificationStore === false &&
    newNotificationData.length > 0 &&
    numberUnread === newNotificationData.length
  ) {
    LSUpdateNotificationStore({ newNotificationData });
    setUpdatedNotificationStore(true);
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
      limit: undefined,
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
        limit: undefined,
      });
    }
  };

  const renderItem = ({ item }) => (
    <VaultSectionItem
      item={item}
      navigation={navigation}
      vaultfeeddata={vaultfeeddata}
      multiSelectActive={multiSelectActive}
      selectedPosts={selectedPosts}
      dispatch={dispatch}
    />
  );

  const renderSectionHeader = ({ section }) => (
    <VaultSectionHeader
      section={section}
      navigation={navigation}
      vaultfeeddata={vaultfeeddata}
      multiSelectActive={multiSelectActive}
      selectedPosts={selectedPosts}
      dispatch={dispatch}
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
      multiSelectActive,
    });
    await sleep(2000);
    dispatch(setVaultRefreshDate(new Date().toISOString()));
    setIsRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <SectionGrid
        // @ts-ignore
        sections={vaultpostdata}
        style={styles.sectiongridstyle}
        keyExtractor={(item) => item.id}
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
          newNotificationData,
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
      <HomeVaultOptionsBar />
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
