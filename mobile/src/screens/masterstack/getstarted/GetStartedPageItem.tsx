import {
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../resources/project";
import { GetStartedPageDataTypes } from "./GetStartedLanding";

interface InputTypes {
  item: GetStartedPageDataTypes;
  index: number;
  totalNumberOfScreens: number;
}

const GetStartedPageItem = ({
  item,
  index,
  totalNumberOfScreens,
}: InputTypes) => {
  return (
    <SafeAreaView style={styles.itemWrapper}>
      <View style={styles.dividedContentContainer}>
        <TouchableOpacity style={[GlobalStyles.shadow, styles.imageWrapper]}>
          <Image
            style={styles.topImage}
            source={{
              uri: item.headerImageURL,
            }}
          />
        </TouchableOpacity>

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
              <Text
                style={[
                  GlobalStyles.h4text,
                  GlobalStyles.irregularshadow,
                  styles.descriptionText,
                ]}
              >
                {item.descriptionText}
              </Text>
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
  descriptionText: {
    color: Colors.AccentOn,
    textAlign: "center",
    margin: Environment.LargePadding,
  },
  bottomSwipe: {
    color: Colors.AccentPartial,
    textAlign: "right",
    marginTop: Environment.StandardPadding,
  },
});

export default GetStartedPageItem;
