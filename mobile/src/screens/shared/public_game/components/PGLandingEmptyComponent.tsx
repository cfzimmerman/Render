import React from "react";
import { View, StyleSheet } from "react-native";
import HalfByFullDisplayBox from "../../general/components/HalfByFullDisplayBox";
import { Environment } from "../../../../global";

const AreEqual = () => {
  return true;
};

const PGLandingEmptyComponent = () => {
  return (
    <View style={styles.boxWrapper}>
      <HalfByFullDisplayBox
        Action={() => null}
        disabled={true}
        header={"🔒"}
        title={"All uploads private"}
        description={"Be the first to post!"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boxWrapper: {
    marginVertical: Environment.StandardPadding,
  },
});

export default React.memo(PGLandingEmptyComponent, AreEqual);
