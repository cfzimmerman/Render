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
import { setErrormessageInactive } from "../../redux/system/errormessage";

import { Environment, Colors, GlobalStyles } from "../project";

// Usage at the bottom

function ErrormessageModal() {
  const errormessage = useSelector((state) => state.errormessage);
  const dispatch = useDispatch();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={errormessage.isactive}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setErrormessageInactive());
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
              <Text
                selectable
                style={[styles.helplink, GlobalStyles.p1text]}
              >
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

export default ErrormessageModal;

/* Example:

import { useDispatch } from 'react-redux';

import { setErrormessageActive } from '../../../redux/system/errormessage';
import { UserDialogue } from '../../../resources/project'
import { ErrormessageModal } from '../../../resources/molecules';

const Helper = () => {
    if (condition === met) {
        dispatch(setErrormessageActive(UserDialogue('4').errormessage.systemerror))
    }
}

const Example = () => {

    const dispatch = useDispatch()

    Helper( dispatch );
    return (
        ...
        <ErrormessageModal />
        ...
    )
}

export default Example;
*/
