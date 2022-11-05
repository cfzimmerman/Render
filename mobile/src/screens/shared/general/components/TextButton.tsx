import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { GlobalStyles, Colors, Environment } from "../../../../global";

interface TextButtonPT {
  Action: Function;
  disabled: boolean;
  title: string;
}

const TextButton = ({ Action, disabled, title }: TextButtonPT) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => Action()}
      style={styles.textButtonHolder}
    >
      <Text
        style={[
          GlobalStyles.h4text,
          GlobalStyles.irregularshadow,
          styles.textButtonTitle,
          {
            textDecorationLine: disabled === true ? "none" : "underline",
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButtonHolder: {
    width: Environment.FullBar,
    alignItems: "center",
    justifyContent: "flex-start",
    height: Environment.HalfBar,
    margin: Environment.StandardPadding,
  },
  textButtonTitle: {
    color: Colors.AccentOn,
  },
});

export default TextButton;
