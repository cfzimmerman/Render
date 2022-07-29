import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { GlobalStyles, Environment, Colors } from "../project";

interface HalfByFullDisplayBoxPropTypes {
  Action: Function;
  header: string | null;
  title: string | null;
  description: string | null;
  disabled: boolean;
}

const HalfByFullDisplayBox = ({
  Action,
  header,
  title,
  description,
  disabled,
}: HalfByFullDisplayBoxPropTypes) => {
  return (
    <TouchableOpacity onPress={() => Action()} disabled={disabled}>
      <View style={[GlobalStyles.shadow, styles.headerstyle]}>
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.h1text,
            { color: Colors.AccentOn },
          ]}
        >
          {header}
        </Text>
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.h2text,
            styles.titlestyle,
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            GlobalStyles.irregularshadow,
            GlobalStyles.p1text,
            styles.descriptionstyle,
          ]}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerstyle: {
    backgroundColor: Colors.Primary,
    width: Environment.FullBar,
    height: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
    padding: Environment.StandardPadding,
  },
  titlestyle: {
    color: Colors.AccentOn,
    marginBottom: Environment.SmallPadding,
  },
  descriptionstyle: {
    color: Colors.AccentPartial,
  },
});

export default HalfByFullDisplayBox;
