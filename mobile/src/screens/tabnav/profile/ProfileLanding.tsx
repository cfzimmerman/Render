import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TouchableScale from "react-native-touchable-scale";
import { useDispatch, useSelector } from "react-redux";

import { setSystemmessageActive } from "../../../redux/system/messagemodal";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
  UserDialogue,
} from "../../../resources/project";
import {
  CubeSizeButton,
  IconHalfbarButton,
  PrimaryDivider,
} from "../../../resources/atoms";

import AddBackDisplay from "./AddBackDisplay";
import ChangePfp from "./ChangePfp";
import GetAddedMeUsers from "./GetAddedMeUsers";
import GetCurrentUser from "./GetCurrentUser";
import GetPfp from "./GetPfp";
import ProfileNavOptions from "./ProfileNavOptions";
import {
  SystemmessageModal,
  LoadProgressModal,
} from "../../../resources/molecules";
import { RootStateType } from "../../../redux/store";
import InviteFriendBox from "./InviteFriendBox";
import { useState } from "react";

// To add: (1) Remove follower, (2) clear add back recommendation
// First, implement 'AddBackDisplay'

const ProfileLanding = ({ navigation }) => {
  const dispatch = useDispatch();

  const [inviteFriendLinkCopied, setInviteFriendLinkCopied] =
    useState<boolean>(false);

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const pfpsignedurl = useSelector(
    (state: RootStateType) => state.profilemain.pfpsignedurl
  );

  const addedmeusers = useSelector(
    (state: RootStateType) => state.relationships.addedme
  );
  const addedmenexttoken = useSelector(
    (state: RootStateType) => state.relationships.addedmenexttoken
  );
  const addbackusers = useSelector(
    (state: RootStateType) => state.profilemain.addbackusers
  );
  const localConfig = useSelector(
    (state: RootStateType) => state.localsync.localConfig
  );
  const localLibrary = useSelector(
    (state: RootStateType) => state.localsync.localLibrary
  );
  if (typeof currentuser.id === "undefined") {
    GetCurrentUser({ dispatch, navigation });
  }

  if (
    typeof currentuser.cognitosub === "undefined" ||
    currentuser.fullyauthenticated === false
  ) {
    return (
      <SafeAreaView style={styles.emptypagewrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("OnboardingLanding")}
        >
          <View>
            <Text style={[GlobalStyles.h4text, styles.unauthenticatedmessage]}>
              Log in to view your Profile
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  if (pfpsignedurl === null && typeof currentuser.id !== "undefined") {
    GetPfp({
      dispatch,
      pfpkey: currentuser.pfp,
      syncPreference: localConfig.syncPreference,
      localLibrary,
    });
  }
  /*else if (addedmeusers.length === 0 && addedmenexttoken === null) {
    GetAddedMeUsers({
      addedmenexttoken,
      dispatch,
      cognitosub: currentuser.cognitosub,
      addedmeusers,
    });
  }
  */

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollviewcontainerstyle}
      bounces={false}
    >
      <TouchableScale
        tension={250}
        friction={25}
        delayPressIn={750}
        onPress={() =>
          ChangePfp({
            dispatch,
            currentpfpkey: currentuser.pfp,
            cognitosub: currentuser.cognitosub,
            currentuserid: currentuser.id,
            localLibrary,
            syncPreference: localConfig.syncPreference,
          })
        }
        onLongPress={() => {
          console.log("LongPress");
        }}
      >
        <View style={GlobalStyles.shadow}>
          <Image style={styles.pfp} source={{ uri: pfpsignedurl }} />
        </View>
      </TouchableScale>
      <TouchableOpacity>
        <View style={[GlobalStyles.shadow, styles.userinfowrapper]}>
          <Text
            style={[
              GlobalStyles.h1text,
              GlobalStyles.irregularshadow,
              styles.displayname,
            ]}
          >
            {currentuser.displayname}
          </Text>
          <Text
            style={[
              GlobalStyles.h4text,
              GlobalStyles.irregularshadow,
              styles.gamertag,
            ]}
          >
            {`@${currentuser.gamertag}`}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.halfbarbuttonwrapper}>
        <IconHalfbarButton
          label={` ${currentuser.addedmecount}`}
          Action={() => navigation.navigate("AddedMeUsers")}
          Icon={Icons.OriginalSize.Friends}
          active={false}
          origin={"ProfileLanding"}
        />
        <IconHalfbarButton
          label={" "}
          Action={() =>
            dispatch(
              setSystemmessageActive(
                UserDialogue().systemmessage.shareconstruction
              )
            )
          }
          Icon={Icons.OriginalSize.Share}
          active={false}
          origin={"ProfileLanding"}
        />
      </View>

      <ProfileNavOptions
        dispatch={dispatch}
        navigation={navigation}
        currentScreen="ProfileLanding"
      />

      <PrimaryDivider />

      <View style={styles.bottomfiller}>
        <AddBackDisplay
          addbackusers={addbackusers}
          dispatch={dispatch}
          navigation={navigation}
          currentuser={currentuser}
          addedmeusers={addedmeusers}
        />
        <InviteFriendBox
          username={currentuser.gamertag}
          inviteFriendLinkCopied={inviteFriendLinkCopied}
          setInviteFriendLinkCopied={setInviteFriendLinkCopied}
        />
      </View>
      <LoadProgressModal />
      <SystemmessageModal />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
    paddingBottom: Environment.HalfBar,
  },
  scrollviewcontainerstyle: {
    alignItems: "center",
  },
  pfp: {
    height: Environment.ScreenWidth,
    width: Environment.ScreenWidth,
    borderRadius: Environment.StandardRadius,
  },
  userinfowrapper: {
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Primary,
    padding: Environment.StandardPadding,
    marginTop: Environment.StandardPadding,
  },
  displayname: {
    color: Colors.AccentOn,
    textAlign: "center",
  },
  gamertag: {
    color: Colors.AccentPartial,
    textAlign: "center",
  },
  halfbarbuttonwrapper: {
    width: Environment.FullBar,
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: Environment.StandardPadding,
  },
  cubenavbarwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "center",
  },
  emptypagewrapper: {
    flex: 1,
    backgroundColor: Colors.Secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  unauthenticatedmessage: {
    color: Colors.AccentOn,
  },
  bottomfiller: {
    width: Environment.FullBar,
    marginBottom: Environment.CubeSize * 2,
  },
});

export default ProfileLanding;