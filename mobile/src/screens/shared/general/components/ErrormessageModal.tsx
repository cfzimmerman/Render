import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

import { useDispatch, useSelector } from "react-redux";
import { setErrorMessageInactive } from "../../../../redux/shared/errormessage";

import { Environment, Colors, GlobalStyles } from "../../../../global";
import { RootStateType } from "../../../../redux";

// Usage at the bottom

function ErrorMessageModal() {
  const errormessage = useSelector(
    (state: RootStateType) => state.errormessage
  );
  const dispatch = useDispatch();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={errormessage.isactive}
      onRequestClose={() => {
        dispatch(setErrorMessageInactive());
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setErrorMessageInactive());
        }}
      >
        <View style={styles.modalcontainer}>
          <BlurView
            intensity={60}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.modalbox, GlobalStyles.shadow]}>
            <Text style={[styles.header, GlobalStyles.h1text]}>
              {errormessage.header}
            </Text>
            <Text style={[styles.header, GlobalStyles.h2text]}>
              {errormessage.title}
            </Text>
            <Text style={[styles.description, GlobalStyles.p1text]}>
              {errormessage.description}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://discord.gg/8U45tcwxFY");
              }}
            >
              <Text selectable style={[styles.helplink, GlobalStyles.p1text]}>
                https://discord.gg/8U45tcwxFY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalbox: {
    height: Environment.HalfBar,
    width: Environment.FullBar,
    backgroundColor: Colors.Primary,
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    color: Colors.AccentOn,
    textAlign: "center",
  },
  description: {
    color: Colors.AccentPartial,
    textAlign: "center",
  },
  helplink: {
    textDecorationLine: "underline",
    color: Colors.AccentPartial,
    textAlign: "center",
  },
});

export default ErrorMessageModal;

/* Example:

import { useDispatch } from 'react-redux';

import { setErrorMessageActive } from '../../../redux/system/errormessage';
import { UserDialogue } from '../../../resources/project'
import { ErrorMessageModal } from '../../../resources/molecules';

const Helper = () => {
    if (condition === met) {
        dispatch(setErrorMessageActive(UserDialogue('4').errormessage.systemerror))
    }
}

const Example = () => {

    const dispatch = useDispatch()

    Helper( dispatch );
    return (
        ...
        <ErrorMessageModal />
        ...
    )
}

export default Example;
*/
