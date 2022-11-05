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

import { setSystemMessageActive } from "../../../redux/shared/messagemodal";
import BackArrow from "../../shared/general/components/BackArrow";
import IconHalfbarButton from "../../shared/general/components/IconHalfbarButton";
import SystemMessageModal from "../../shared/general/components/SystemMessageModal";
import {
  GlobalStyles,
  Environment,
  Colors,
  Icons,
  UserDialogue,
} from "../../../global";
import ChangeUserRelationship from "../operations/ChangeUserRelationship";
import OtherUserNavOptions from "../components/OtherUserNavOptions";
import { RootStateType } from "../../../redux";

// How to navigate from profile added with unmounted explore to other user profile and go back without it looking cringe?

function BackBar({ navigation }) {
  return (
    <SafeAreaView pointerEvents="box-none" style={styles.backbarstyle}>
      <BackArrow />
    </SafeAreaView>
  );
}

// async function ChangeUserRelationship ({ index, action, dispatch, cognitosub, targetcognitosub, origin })
// Supported actions: 'add', 'remove', 'approve', 'unrequest', 'reject'
// Outputs: 'unauthenticated', 'user', 'outgoingpending', 'incomingpending', true, false

function CorrectFriendButton({
  relationship,
  dispatch,
  currentuserid,
  targetuserid,
  currentusercognitosub,
  targetusercognitosub,
  addedmecount,
  navigation,
}) {
  if (relationship === "unauthenticated") {
    return (
      <IconHalfbarButton
        label={` ${addedmecount}`}
        Action={() => navigation.navigate("OnboardingLanding")}
        Icon={Icons.OriginalSize.AddUser}
        active={false}
        origin={"OtherUserProfileLanding"}
      />
    );
  }
  if (relationship === true) {
    return (
      // Remove friend
      <IconHalfbarButton
        label={` ${addedmecount}`}
        Action={() =>
          ChangeUserRelationship({
            action: "remove",
            dispatch,
            currentuserid,
            targetuserid,
            origin: "otheruserprofile",
          })
        }
        Icon={Icons.OriginalSize.CurrentFriend}
        active={true}
        origin={"OtherUserProfileLanding"}
      />
    );
  }
  if (relationship === false) {
    return (
      // Add friend
      <IconHalfbarButton
        label={` ${addedmecount}`}
        Action={() =>
          ChangeUserRelationship({
            action: "add",
            dispatch,
            currentuserid,
            targetuserid,
            origin: "otheruserprofile",
          })
        }
        Icon={Icons.OriginalSize.AddUser}
        active={false}
        origin={"OtherUserProfileLanding"}
      />
    );
  }
  return navigation.navigate("Profile", { screen: "ProfileLanding" });
}

function OtherUserProfileLanding({ navigation }) {
  const dispatch = useDispatch();

  const otheruser = useSelector(
    (state: RootStateType) => state.otheruserprofile.otheruser
  );
  const relationship = useSelector(
    (state: RootStateType) => state.otheruserprofile.relationship
  );
  const addedmecount = useSelector(
    (state: RootStateType) => state.otheruserprofile.addedmecount
  );
  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );

  return (
    <ScrollView
      style={styles.scrollviewstyle}
      contentContainerStyle={styles.scrollviewcontainerstyle}
      bounces={false}
    >
      <TouchableScale
        tension={250}
        friction={25}
        delayPressIn={750}
        onPress={() => console.log("Beep boop")}
      >
        <View style={GlobalStyles.shadow}>
          <Image style={styles.userpfp} source={{ uri: otheruser.pfpurl }} />
        </View>
      </TouchableScale>
      <BackBar navigation={navigation} />
      <TouchableOpacity>
        <View style={[GlobalStyles.shadow, styles.userinfoholder]}>
          <Text
            style={[
              GlobalStyles.h1text,
              GlobalStyles.irregularshadow,
              styles.displayname,
            ]}
          >
            {otheruser.displayname}
          </Text>
          <Text
            style={[
              GlobalStyles.h4text,
              GlobalStyles.irregularshadow,
              styles.gamertag,
            ]}
          >
            {`@${otheruser.gamertag}`}
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: Environment.FullBar,
          justifyContent: "space-between",
          flexDirection: "row",
          marginVertical: Environment.StandardPadding,
        }}
      >
        <CorrectFriendButton
          currentuserid={currentuser.id}
          targetuserid={otheruser.id}
          currentusercognitosub={currentuser.cognitosub}
          targetusercognitosub={otheruser.cognitosub}
          relationship={relationship}
          dispatch={dispatch}
          addedmecount={addedmecount}
          navigation={navigation}
        />
        <IconHalfbarButton
          label=""
          Action={() =>
            dispatch(
              setSystemMessageActive(
                UserDialogue().systemmessage.shareconstruction
              )
            )
          }
          Icon={Icons.OriginalSize.Share}
          origin={null}
          active={false}
        />
      </View>

      <OtherUserNavOptions
        navigation={navigation}
        currentScreen="OtherUserProfileLanding"
      />

      <View style={styles.bottomplaceholder} />

      <SystemMessageModal />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollviewstyle: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  scrollviewcontainerstyle: {
    alignItems: "center",
  },
  profilenavbar: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "center",
  },
  backbarstyle: {
    width: Environment.FullBar,
    position: "absolute",
    alignItems: "baseline",
    justifyContent: "center",
  },
  userpfp: {
    height: Environment.ScreenWidth,
    width: Environment.ScreenWidth,
    borderRadius: Environment.StandardRadius,
  },
  userinfoholder: {
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
  bottomplaceholder: {
    width: Environment.FullBar,
    height: Environment.CubeSize + Environment.LargePadding,
  },
});

export default OtherUserProfileLanding;
