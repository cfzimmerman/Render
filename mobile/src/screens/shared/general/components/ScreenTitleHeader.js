import { Text, StyleSheet } from "react-native";
import { GlobalStyles, Colors } from "../../../../global";

// <ScreenTitleHeader title={'Hello'} />
function ScreenTitleHeader({ title }) {
  return (
    <Text
      style={[styles.header, GlobalStyles.h1text, GlobalStyles.irregularshadow]}
    >
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    color: Colors.AccentOn,
    textAlign: "left",
  },
});

export default ScreenTitleHeader;
