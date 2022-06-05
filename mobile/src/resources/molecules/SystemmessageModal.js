import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

import { useDispatch, useSelector } from "react-redux";
import { setSystemmessageInactive } from "../../redux/system/systemmessage";

import { Environment, Colors, GlobalStyles } from "../project";

function SystemmessageModal() {
  const systemmessage = useSelector((state) => state.systemmessage);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(setSystemmessageInactive());
  }, 10000);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={systemmessage.isactive}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setSystemmessageInactive());
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
              {systemmessage.header}
            </Text>
            <Text style={[styles.header, GlobalStyles.h2text]}>
              {systemmessage.title}
            </Text>
            <Text style={[styles.description, GlobalStyles.p1text]}>
              {systemmessage.description}
            </Text>
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
  },
  description: {
    color: Colors.AccentPartial,
    textAlign: "center",
  },
});

export default SystemmessageModal;

/* Example:

import { useDispatch } from 'react-redux';

import { setSystemmessageActive } from "../../../redux/system/systemmessage";
import { UserDialogue } from '../../../resources/project'
import { SystemmessageModal } from "../../../resources/molecules";

const Helper = () => {
    if (condition === met) {
        dispatch(setSystemmessageActive(UserDialogue().systemmessage.resendcodesuccess))
    }
}

const Example = () => {

    const dispatch = useDispatch()

    Helper( dispatch );
    return (
        ...
        <SystemmessageModal />
        ...
    )
}

export default Example;
*/
