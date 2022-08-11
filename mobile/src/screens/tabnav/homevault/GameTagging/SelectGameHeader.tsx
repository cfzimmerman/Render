import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Colors,
  Environment,
  GlobalStyles,
} from "../../../../resources/project";

const SelectGameHeader = () => {
  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        marginTop: Environment.StandardPadding,
      }}
    >
      <View
        style={[
          GlobalStyles.shadow,
          {
            height: Environment.CubeSize,
            width: Environment.FullBar,
            borderRadius: Environment.StandardRadius,
            backgroundColor: Colors.Primary,
            marginBottom: Environment.StandardPadding,
          },
        ]}
      ></View>
    </SafeAreaView>
  );
};

export default SelectGameHeader;
