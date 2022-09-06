import {
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GestureRecognizer from "react-native-swipe-gestures";
import { DispatchType } from "../../../redux/store";
import { CurrentUserType } from "../../../resources/CommonTypes";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../resources/project";
import ExitGetStarted from "./ExitGetStarted";
import { GetStartedPageDataTypes } from "./GetStartedLanding";

interface InputTypes {
  item: GetStartedPageDataTypes;
  index: number;
  totalNumberOfScreens: number;
  navigation: any;
  currentUser: CurrentUserType;
  dispatch: DispatchType;
}

const GetStartedPageItem = ({
  item,
  index,
  totalNumberOfScreens,
  navigation,
  currentUser,
  dispatch,
}: InputTypes) => {
  const NavigateBack = () => {
    ExitGetStarted({ navigation, currentUser, dispatch });
  };
  return (
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
  );
};

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
  imageWrapper: {
    height: "59%",
    width: Environment.FullBar,
    borderRadius: Environment.StandardRadius,
  },
  topImage: {
    width: Environment.FullBar,
    height: "100%",
    borderRadius: Environment.StandardRadius,
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
  },
  bottomSwipe: {
    color: Colors.AccentPartial,
    textAlign: "right",
    marginTop: Environment.StandardPadding,
  },
});

export default GetStartedPageItem;
