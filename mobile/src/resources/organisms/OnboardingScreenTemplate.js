import React from "react";
import {
  View, Text, Image, StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  GlobalStyles, Environment, Colors, Icons,
} from "../project";
import { DismissKeyboard } from "../utilities";
import { AuthScreenIndicator } from "../molecules";

// Use case example below

function SecondaryText({ options }) {
  if (options.secondarytext === null) {
    return null;
  }
  return (
    <Text
      style={[
        styles.secondarytext,
        GlobalStyles.p1text,
        GlobalStyles.standardtext,
        GlobalStyles.centertext,
      ]}
    >
      {" "}
      {options.secondarytext}
      {" "}
    </Text>
  );
}

function OnboardingScreenTemplate({ children, options }) {
  return (
    <DismissKeyboard>
      <View style={styles.mastercontainer}>
        <Image
          style={[StyleSheet.absoluteFill, styles.backgroundimage]}
          source={{ uri: options.backgroundimg }}
          blurRadius={Environment.BlurRadius}
        />
        {/* <BlurView intensity={70} tint={'dark'}  style={StyleSheet.absoluteFill} /> */}
        <SafeAreaView style={styles.container}>
          <View style={styles.contentcontainer}>
            <AuthScreenIndicator activebox={options.activebox} />
            {/* <View style={styles.templatecontent}> */}
            <View style={styles.logobox}>
              {options.headerimg}

              <Text
                style={[
                  GlobalStyles.h2text,
                  GlobalStyles.standardtext,
                  GlobalStyles.centertext,
                ]}
              >
                {" "}
                {options.primarytext}
                {" "}
              </Text>
              <SecondaryText options={options} />
            </View>
            {children}
            {/* </View> */}
          </View>
        </SafeAreaView>
      </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  backgroundimage: {
    resizeMode: "cover",
    height: Environment.ScreenHeight,
    width: Environment.ScreenWidth,
    opacity: Environment.BackgroundOpacity,
  },
  contentcontainer: {
    alignItems: "center",
    height: Environment.ScreenHeight / 2,
    justifyContent: "space-between",
  },
  logobox: {
    alignItems: "center",
    width: Environment.FullBar,
  },
  container: {
    flex: 1,
  },
  mastercontainer: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  secondarytext: {
    marginTop: Environment.StandardPadding,
  },
  templatecontent: {
    height: Environment.ScreenHeight / 2 - Environment.CubeSize,
    justifyContent: "space-between",
  },
});

export default OnboardingScreenTemplate;

/* Example on import screen

import OnboardingScreenTemplate from '../../resources/organisms/OnboardingScreenTemplate';

// If needed, create a HeaderImg component to pass to the template. If not needed, pass null.
const HeaderImg = () => {
    return (
        <Image style={{
            height: Environment.HalfBar,
            width: Environment.HalfBar,
            marginVertical: Environment.LargePadding,
            borderRadius: 16, }}
            source={{uri: 'https://i.pinimg.com/originals/c7/c6/d4/c7c6d4e62a2f96134ee819240dd07390.jpg'}}
        />
    )
}

// Create an Items object and pass necessary config info. Backgroundimg is required. Others can be null as needed.
const Items = {
    backgroundimg: 'https://images3.alphacoders.com/113/thumb-1920-1131606.png',
    headerimg: HeaderImg(),
    primarytext: 'Save forever, share anywhere',
    secondarytext: null,
}

const Example = () => {
    return (
        <OnboardingScreenTemplate options={Items}>
            // Rest of the screen here
        </OnboardingScreenTemplate>
    );
};

export default Example;

*/
