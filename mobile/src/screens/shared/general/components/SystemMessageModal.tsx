import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

import { useDispatch, useSelector } from "react-redux";
import { setSystemMessageInactive } from "../../../../redux/shared/messagemodal";
import { Environment, Colors, GlobalStyles } from "../../../../global";
import { RootStateType } from "../../../../redux";

const SystemMessageModal = () => {
  const systemmessage = useSelector(
    (state: RootStateType) => state.messagemodal.systemmessagemodal
  );
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(setSystemMessageInactive());
  }, 10000);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={systemmessage.isactive}
      onRequestClose={() => {
        dispatch(setSystemMessageInactive());
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setSystemMessageInactive());
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
};

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

export default SystemMessageModal;

/* Example:

import { useDispatch } from 'react-redux';

import { setSystemMessageActive } from "../../../redux/system/systemmessage";
import { UserDialogue } from '../../../resources/project'
import { SystemMessageModal } from "../../../resources/molecules";

const Helper = () => {
    if (condition === met) {
        dispatch(setSystemMessageActive(UserDialogue().systemmessage.resendcodesuccess))
    }
}

const Example = () => {

    const dispatch = useDispatch()

    Helper( dispatch );
    return (
        ...
        <SystemMessageModal />
        ...
    )
}

export default Example;
*/
