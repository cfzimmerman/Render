import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { HalfByFullDisplayBox } from "../../../resources/atoms";
import { CurrentUserType } from "../../../resources/CommonTypes";
import { Environment } from "../../../resources/project";

const AreEqual = (previousProps, nextProps) => {
  if (
    previousProps.currentuser.setpassword ===
      nextProps.currentuser.setpassword &&
    previousProps.currentuser.id === nextProps.currentuser.id
  ) {
    return true;
  }
  return false;
};

interface SetPasswordBoxPropsType {
  currentuser: CurrentUserType;
  navigation: any;
}

const SetPasswordBox = ({
  currentuser,
  navigation,
}: SetPasswordBoxPropsType) => {
  if (currentuser.setpassword != "unknown" && currentuser.setpassword != true) {
    return (
      <View style={styles.wrapper}>
        <HalfByFullDisplayBox
          Action={() => navigation.navigate("ForgotPassword")}
          header={"🔒"}
          title={"Add a password"}
          description={"Required for secure web upload"}
        />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: Environment.StandardPadding,
  },
});

export default React.memo(SetPasswordBox, AreEqual);
