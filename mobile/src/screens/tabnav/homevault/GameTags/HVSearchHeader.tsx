import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { PrimaryDivider } from "../../../../resources/atoms";
import {
  GlobalStyles,
  Colors,
  Environment,
  Icons,
} from "../../../../resources/project";

const HVSearchHeader = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => console.log("NoTag")}
        style={[GlobalStyles.shadow, styles.buttonWrapper]}
      >
        <Icons.OriginalSize.Tag
          stroke={Colors.AccentOn}
          height={Environment.IconSize * 2}
          width={Environment.IconSize * 2}
          style={[GlobalStyles.irregularshadow, styles.icon]}
        />
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.h2text,
            styles.header,
          ]}
        >
          No tag
        </Text>
      </TouchableOpacity>
      <PrimaryDivider />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
    height: Environment.HalfBar,
    width: Environment.FullBar,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Environment.SmallPadding,
    padding: Environment.StandardPadding,
  },
  icon: {
    margin: Environment.StandardPadding,
  },
  header: {
    color: Colors.AccentOn,
  },
});

export default HVSearchHeader;
