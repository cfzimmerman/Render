import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { setSystemMessageActive } from "../../../redux/shared/messagemodal";
import {
  Environment,
  GlobalStyles,
  Colors,
  UserDialogue,
} from "../../../global";
import PrimaryDivider from "../../shared/general/components/PrimaryDivider";
import HomeTopLogo from "./HomeTopLogo";
import SetPasswordBox from "./SetPasswordBox";
import HeaderButtons from "./HeaderButtons";
import StoriesBox from "./StoriesBox";
import NewNotificationsPreview from "../../shared/notifications/components/NewNotificationsPreview";
import GetStartedHeaderBox from "./GetStartedHeaderBox";
import { DispatchType } from "../../../redux";

const HomeVaultHeader = ({
  navigation,
  dispatch,
  storiesfullview,
  storiessectionlist,
  currentuser,
  newNotificationData,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoboxwrapper}>
        <TouchableOpacity>
          <View style={styles.logowrapper}>
            <View style={GlobalStyles.shadow}>
              <Image
                source={require("../../../../assets/adaptive-icon.png")}
                style={styles.logo}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("HVSearchLanding")}
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

      <HeaderButtons navigation={navigation} />

      <StoriesBox
        navigation={navigation}
        dispatch={dispatch}
        storiesfullview={storiesfullview}
        storiessectionlist={storiessectionlist}
      />

      <NewNotificationsPreview
        newNotificationData={newNotificationData}
        navigation={navigation}
        currentuser={currentuser}
        dispatch={dispatch}
      />

      <GetStartedHeaderBox
        navigation={navigation}
        fullyOnboarded={currentuser.fullyonboarded}
      />
      <SetPasswordBox currentuser={currentuser} navigation={navigation} />

      <PrimaryDivider />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Environment.ScreenWidth,
    alignItems: "center",
  },
  logoboxwrapper: {
    width: Environment.FullBar,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Environment.StandardPadding,
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
  logo: {
    height: Environment.CubeSize * 1.25,
    width: Environment.CubeSize * 1.25,
  },
});

export default HomeVaultHeader;
