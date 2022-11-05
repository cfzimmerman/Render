import React from "react";
import { View, StyleSheet } from "react-native";
import { Environment } from "../../../../global";

const AreEqual = (previousProps, nextProps) => {
  return true;
};

const FlatListFooterSpacer = () => {
  return <View style={styles.footer} />;
};

const styles = StyleSheet.create({
  footer: {
    width: Environment.FullBar,
    height: Environment.CubeSize * 2,
  },
});

export default React.memo(FlatListFooterSpacer, AreEqual);
