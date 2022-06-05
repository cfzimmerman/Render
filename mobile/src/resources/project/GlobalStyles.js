import { StyleSheet, Platform } from "react-native";
import Colors from "./Colors";
import Environment from "./Environment";

function GetIrregularShadow() {
  if (Platform.OS === "ios") {
    return {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      textShadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      borderRadius: Environment.StandardRadius,
    };
  }
  return null;
}

// Play around with background color to enable the shadow on View for Android
const GlobalStyles = StyleSheet.create({
  // Primary component shadow used throughout the app
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderRadius: Environment.StandardRadius,
    elevation: 10,
  },
  irregularshadow: GetIrregularShadow(),
  // h1: Used for main page headings and titles
  h1text: {
    fontFamily: "Inter_600SemiBold",
    fontSize: Environment.FontDimensions.h1text,
  },
  // h2: Used to accent h1 cases
  h2text: {
    fontFamily: "Inter_500Medium",
    fontSize: Environment.FontDimensions.h2text,
  },
  // h3: Used for button labels and searchbars
  h3text: {
    fontFamily: "Inter_400Regular",
    fontSize: Environment.FontDimensions.h3text,
  },
  // h4: Used for post author name display
  h4text: {
    fontFamily: "Inter_600SemiBold",
    fontSize: Environment.FontDimensions.h4text,
  },
  // Default app text style. Used for some labels and text on posts and comments
  p1text: {
    fontFamily: "Inter_500Medium",
    fontSize: Environment.FontDimensions.p1text,
  },
  // Used for small labels and accents to p1
  p2text: {
    fontFamily: "Inter_500Medium",
    fontSize: Environment.FontDimensions.p2text,
  },
  // Both standardtext and centertext are vestigial and should be replaced in their target cases.
  standardtext: {
    color: Colors.AccentOn,
  },
  centertext: {
    textAlign: "center",
  },
});

export default GlobalStyles;
