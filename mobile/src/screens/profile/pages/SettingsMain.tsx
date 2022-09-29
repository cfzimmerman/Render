import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { useSelector, useDispatch } from "react-redux";

import { Colors, Environment, GlobalStyles } from "../../../global";
import { HalfbarButton } from "../../../resources/atoms";

import ChangePfp from "../operations/ChangePfp";
import GetPfp from "../operations/GetPfp";
import LogOut from "../operations/LogOut";
import ProfileNavOptions from "../components/ProfileNavOptions";
import { RootStateType } from "../../../redux";

const SettingsMain = ({ navigation }) => {
  const dispatch = useDispatch();

  const currentuser = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const pfpsignedurl = useSelector(
    (state: RootStateType) => state.profilemain.pfpsignedurl
  );
  const localLibrary = useSelector(
    (state: RootStateType) => state.localsync.localLibrary
  );
  const localConfig = useSelector(
    (state: RootStateType) => state.localsync.localConfig
  );

  if (typeof currentuser.cognitosub === "undefined") {
    navigation.navigate("ProfileLanding");
  }

  if (pfpsignedurl === null && typeof currentuser.id !== "undefined") {
    GetPfp({
      dispatch,
      pfpkey: currentuser.pfp,
      localLibrary,
      syncPreference: localConfig.syncPreference,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollviewstyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.navoptionswrapper}>
          <ProfileNavOptions
            dispatch={dispatch}
            navigation={navigation}
            currentScreen="SettingsMain"
          />
        </View>

        <View style={[GlobalStyles.shadow, styles.pfpcard]}>
          <TouchableOpacity
            onPress={() =>
              ChangePfp({
                dispatch,
                currentuserid: currentuser.id,
                currentpfpkey: currentuser.pfp,
                cognitosub: currentuser.cognitosub,
                localLibrary,
                syncPreference: localConfig.syncPreference,
              })
            }
          >
            <View style={GlobalStyles.shadow}>
              <Image style={styles.userpfp} source={{ uri: pfpsignedurl }} />
            </View>
            <Text style={[GlobalStyles.p1text, styles.pfplabel]}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttongridwrapper}>
          <View style={styles.buttonrowwrapper}>
            <HalfbarButton
              label="Added"
              Action={() => navigation.navigate("AddedUsers")}
              active={false}
            />
            <HalfbarButton
              label="Added Me"
              Action={() => navigation.navigate("AddedMeUsers")}
              active={false}
            />
          </View>
          <View style={styles.buttonrowwrapper}>
            <HalfbarButton
              label="Local sync"
              Action={() => navigation.navigate("LocalSyncSettings")}
              active={false}
            />
            <HalfbarButton
              label="Our Discord"
              Action={() => Linking.openURL("https://discord.gg/nrpHKgKfrJ")}
              active={false}
            />
          </View>
          <View style={styles.buttonrowwrapper}>
            <HalfbarButton
              label="Password"
              Action={() => navigation.navigate("ForgotPassword")}
              active={false}
            />
            <HalfbarButton
              label="Onboarding"
              Action={() => navigation.navigate("GetStartedLanding")}
              active={false}
            />
          </View>
          <View style={styles.buttonrowwrapper}>
            <HalfbarButton
              label="Backup"
              Action={() => navigation.navigate("BackupMain")}
              active={false}
            />
            <HalfbarButton
              label="Log out"
              Action={() => LogOut({ dispatch, navigation })}
              active={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
    alignItems: "center",
  },
  scrollviewstyle: {
    flex: 1,
  },
  headerwrapper: {
    width: Environment.FullBar,
  },
  cubenavbarwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Environment.StandardPadding,
  },
  pfpcard: {
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
    marginTop: Environment.LargePadding,
  },
  userpfp: {
    height: Environment.FullBar,
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
  },
  pfplabel: {
    color: Colors.AccentPartial,
    textAlign: "center",
    padding: Environment.SmallPadding,
  },
  buttongridwrapper: {
    width: Environment.FullBar,
    marginBottom: Environment.CubeSize + Environment.LargePadding,
  },
  buttonrowwrapper: {
    width: Environment.FullBar,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: Environment.StandardPadding,
  },
  navoptionswrapper: {
    marginTop: Environment.StandardPadding,
  },
});

export default SettingsMain;
