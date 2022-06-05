import {
  View, TouchableOpacity, Text, StyleSheet,
} from "react-native";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";

function SearchResultHeader({
  length,
  GetData,
  input,
  dispatch,
  nextToken,
}) {
  if (length > 9) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => GetData({ value: input })}>
          <View>
            <Text style={[styles.message, GlobalStyles.h4text]}>
              Get more results
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    width: Environment.FullBar,
    alignItems: "flex-end",
    marginTop: Environment.StandardPadding,
  },
  message: {
    color: Colors.AccentPartial,
    textDecorationLine: "underline",
    textAlign: "right",
  },
});

export default SearchResultHeader;
