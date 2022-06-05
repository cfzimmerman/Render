import {
  View, Text, TouchableOpacity, StyleSheet, Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { setSystemmessageActive } from "../../../redux/system/systemmessage";
import {
  Environment,
  GlobalStyles,
  Colors,
  UserDialogue,
} from "../../../resources/project";
import { CollapsingHeaderBox, PrimaryDivider } from "../../../resources/atoms";
import HomeTopLogo from "../home/HomeTopLogo";
import StoriesBox from "./StoriesBox";

function HomeVaultHeader({
  navigation,
  dispatch,
  storiesfullview,
  storiessectionlist,
}) {
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
          onPress={() => dispatch(
            setSystemmessageActive(
              UserDialogue().systemmessage.searchconstruction,
            ),
          )}
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

      <StoriesBox
        navigation={navigation}
        dispatch={dispatch}
        storiesfullview={storiesfullview}
        storiessectionlist={storiessectionlist}
      />

      <PrimaryDivider />
    </SafeAreaView>
  );
}

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
