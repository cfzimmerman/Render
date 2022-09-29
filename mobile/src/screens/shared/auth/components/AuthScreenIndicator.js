import { View, StyleSheet, Text } from "react-native";
import { Environment, Colors } from "../../../../global";
import { BackArrow } from "../atoms";

function TabBox(prop) {
  return (
    <View
      style={[
        styles.tabbox,
        {
          backgroundColor: prop.active ? Colors.AccentOn : Colors.AccentPartial,
        },
      ]}
    />
  );
}

const IsActive = (prop) => {
  if (prop.activebox === prop.boxname) {
    return true;
  }
  return false;
};

/*
KEY
    0: OnboardingLanding
    0.5: Signup && Login
    1: There is no screen 1. If you get to screen 2, it's implied that the login / signup code was screen 1
    2: DisplayName
    3: Gamertag
    4: Birthday
    5:  TOS

*/

function TabIndicator(prop) {
  return (
    <View style={styles.tabindicator}>
      <TabBox active={IsActive({ boxname: 1, activebox: prop.activebox })} />
      <TabBox active={IsActive({ boxname: 2, activebox: prop.activebox })} />
      <TabBox active={IsActive({ boxname: 3, activebox: prop.activebox })} />
      <TabBox active={IsActive({ boxname: 4, activebox: prop.activebox })} />
      <TabBox active={IsActive({ boxname: 5, activebox: prop.activebox })} />
    </View>
  );
}

function AuthScreenIndicator(prop) {
  if (prop.activebox === 0) {
    return null;
  }
  if (prop.activebox === 0.5) {
    return (
      <View style={styles.backarrowholder}>
        <BackArrow />
        <View style={styles.counterweight} />
      </View>
    );
  }
  return (
    <View style={styles.infobarholder}>
      <TabIndicator activebox={prop.activebox} />
    </View>
  );
}

const styles = StyleSheet.create({
  infobarholder: {
    width: Environment.FullBar,
    height: Environment.CubeSize,
    alignItems: "center",
    justifyContent: "center",
  },
  backarrowholder: {
    width: Environment.FullBar,
    height: Environment.CubeSize,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  counterweight: {
    width: Environment.StandardPadding * 4.25,
  },
  tabindicator: {
    flexDirection: "row",
  },
  tabbox: {
    height: Environment.StandardPadding * 1.5,
    width: Environment.StandardPadding * 1.5,
    borderRadius: Environment.StandardPadding / 2,
    marginHorizontal: Environment.StandardPadding * 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default AuthScreenIndicator;
