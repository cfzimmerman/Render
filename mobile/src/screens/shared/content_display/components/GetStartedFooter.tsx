import { View, Text, StyleSheet, Platform } from "react-native";
import { GlobalStyles, Environment, Colors } from "../../../../global";
import { SafeAreaView } from "react-native-safe-area-context";
import GestureRecognizer from "react-native-swipe-gestures";
import { useSelector } from "react-redux";
import { DispatchType, RootStateType } from "../../../../redux";
import { CurrentUserType } from "../../../../global/CommonTypes";
import ExitGetStarted from "../../onboarding/operations/ExitGetStarted";

interface InputTypes {
  navigation: any;
  dispatch: DispatchType;
}

const GetStartedFooter = ({ navigation, dispatch }: InputTypes) => {
  const currentUser: CurrentUserType = useSelector(
    (state: RootStateType) => state.profilemain.currentuser
  );
  const NavigateBack = () => {
    ExitGetStarted({ currentUser, navigation, dispatch });
  };
  return (
    <GestureRecognizer onSwipeDown={NavigateBack}>
      <SafeAreaView style={styles.itemWrapper}>
        <View style={styles.dividedContentContainer}>
          <View style={[GlobalStyles.shadow, styles.additionalInfoWrapper]}>
            <Text
              style={[
                GlobalStyles.irregularshadow,
                GlobalStyles.h2text,
                styles.additionalInfoTitle,
              ]}
            >
              Some details
            </Text>
            <Text
              style={[
                GlobalStyles.p1text,
                GlobalStyles.irregularshadow,
                styles.additionalInfoText,
              ]}
            >
              {`1. We don't sell user data and collect only what's needed to maintain your account.\n\n2. Your uploads are safely and securely stored in the Amazon cloud.\n\n3. No compression - all uploads are saved and retrieved at original quality.\n\n4. We don't know who Rando Shark is either, but he'll be so proud of you.`}
            </Text>
          </View>

          <View style={styles.bottomContentContainer}>
            <View style={[GlobalStyles.shadow, styles.bottomTextBox]}>
              <View style={styles.textWrapper}>
                <Text
                  style={[
                    GlobalStyles.irregularshadow,
                    GlobalStyles.h2text,
                    styles.titleText,
                  ]}
                >
                  See you around!
                </Text>
                <Text
                  style={[
                    GlobalStyles.h4text,
                    GlobalStyles.irregularshadow,
                    styles.descriptionText,
                  ]}
                >
                  Swipe down to exit ↓
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureRecognizer>
  );
};

/*

    <GestureRecognizer onSwipeDown={NavigateBack}>
      <SafeAreaView style={styles.itemWrapper}>
        <View style={styles.dividedContentContainer}>
          <View style={[GlobalStyles.shadow, styles.imageWrapper]}>
            <Image
              style={styles.topImage}
              source={{
                uri: item.headerImageURL,
              }}
            />
          </View>

          <View style={styles.bottomContentContainer}>
            <View style={[GlobalStyles.shadow, styles.bottomTextBox]}>
              <View style={styles.textWrapper}>
                <Text
                  style={[
                    GlobalStyles.irregularshadow,
                    GlobalStyles.h2text,
                    styles.titleText,
                  ]}
                >
                  {item.titleText}
                </Text>
                <item.descriptionTextBlock />
              </View>
              <Text
                style={[
                  GlobalStyles.irregularshadow,
                  GlobalStyles.p1text,
                  styles.bottomSwipe,
                ]}
              >
                {(index + 1).toString()} / {totalNumberOfScreens.toString()}:
                Swipe →
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureRecognizer>

*/

const styles = StyleSheet.create({
  itemWrapper: {
    width: Environment.ScreenWidth,
    height: Environment.ScreenHeight,
    alignItems: "center",
    paddingVertical:
      Platform.OS === "android" ? Environment.StandardPadding : 0,
  },
  dividedContentContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  additionalInfoWrapper: {
    height: "59%",
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
    padding: Environment.LargePadding,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
  },
  bottomContentContainer: {
    width: Environment.FullBar,
    height: "39%",
  },
  bottomTextBox: {
    flex: 1,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
  },
  textWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: Colors.AccentOn,
    textAlign: "center",
  },
  descriptionText: {
    color: Colors.AccentOn,
    textAlign: "center",
    margin: Environment.LargePadding,
  },
  additionalInfoText: {
    color: Colors.Accent90,
    textAlign: "left",
  },
  additionalInfoTitle: {
    color: Colors.Accent90,
    textAlign: "center",
    marginBottom: Environment.LargePadding,
  },
});

export default GetStartedFooter;
