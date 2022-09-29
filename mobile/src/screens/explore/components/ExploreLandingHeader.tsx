import React from "react";
import { View, StyleSheet } from "react-native";
import { HalfbarButton, PrimaryDivider } from "../../../resources/atoms";
import { Environment } from "../../../global";
import { ExploreSearchCategory } from "../pages/ExploreLanding";

interface InputTypes {
  currentCategory: ExploreSearchCategory;
  setCurrentCategory: Function;
}

const AreEqual = (previousProps: InputTypes, nextProps: InputTypes) => {
  if (previousProps.currentCategory === nextProps.currentCategory) {
    return true;
  }
  return false;
};

const ExploreLandingHeader = ({
  currentCategory,
  setCurrentCategory,
}: InputTypes) => {
  return (
    <View style={styles.buttonHolder}>
      <HalfbarButton
        label={"Games"}
        active={currentCategory === "games" ? true : false}
        Action={() => setCurrentCategory("games")}
      />
      <HalfbarButton
        label={"Users"}
        active={currentCategory === "users" ? true : false}
        Action={() => setCurrentCategory("users")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonHolder: {
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Environment.StandardPadding,
  },
});

export default React.memo(ExploreLandingHeader, AreEqual);
