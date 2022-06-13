import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { GlobalStyles, Environment, Colors } from "../../../resources/project";

const PostTextDisplay = ({ item, Action }) => {
  if (
    item.posttext != null &&
    typeof item.posttext != "undefined" &&
    item.posttext.length != 0
  ) {
    return (
      <TouchableOpacity onPress={() => Action()}>
        <View style={[GlobalStyles.shadow, styles.textwrapper]}>
          <Text
            numberOfLines={3}
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.p1text,
              styles.posttextstyle,
            ]}
          >
            {item.posttext}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  textwrapper: {
    width: Environment.FullBar,
    padding: Environment.StandardPadding,
    marginTop: Environment.SmallPadding,
    borderRadius: Environment.StandardRadius,
    backgroundColor: Colors.Primary,
  },
  posttextstyle: {
    color: Colors.AccentOn,
  },
});

export default PostTextDisplay;
