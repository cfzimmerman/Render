import { View, Image, StyleSheet } from "react-native";
import { Environment, GlobalStyles } from "../../../resources/project";

function HomeTopLogo({ pageassets }) {
  if (pageassets === null) {
    return null;
  }
  return (
    <View style={GlobalStyles.shadow}>
      <Image
        source={require("../../../../assets/adaptive-icon.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: Environment.CubeSize * 1.25,
    width: Environment.CubeSize * 1.25,
  },
});

export default HomeTopLogo;
