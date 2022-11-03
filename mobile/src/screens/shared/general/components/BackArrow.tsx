import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Icons, Colors, Environment, GlobalStyles } from "../../../../global";
import ToPortrait from "../operations/ToPortrait";

interface InputTypes {
  CustomAction?: Function;
}

const BackArrow = ({ CustomAction }: InputTypes) => {
  const navigation = useNavigation();

  const ButtonAction = () => {
    if (typeof CustomAction === "function") {
      CustomAction();
    } else {
      ToPortrait(), navigation.goBack();
    }
  };

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
      onPress={ButtonAction}
    />
  );
};

export default BackArrow;
