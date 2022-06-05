import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  Icons,
  Colors,
  Environment,
  GlobalStyles,
} from "../project";
import { ToPortrait } from "../utilities";

function BackArrow() {
  const navigation = useNavigation();

  return (
    <IconButton
      icon={Icons.Resized.BackButton}
      color={Colors.AccentOff}
      animated
      size={Environment.StandardPadding * 7}
      style={[
        GlobalStyles.irregularshadow,
        {
          height: Environment.StandardPadding * 5,
          width: Environment.StandardPadding * 3,
        },
      ]}
      onPress={() => {
        ToPortrait(), navigation.goBack();
      }}
    />
  );
}

export default BackArrow;
