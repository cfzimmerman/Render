import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "../../redux/store";
import { setButtonMessageInactive } from "../../redux/system/messagemodal";
import { BlurView } from "expo-blur";
import { HalfbarButton } from "../atoms";
import { Environment, Colors, GlobalStyles } from "../project";

const ButtonMessageModal = () => {
  const buttonmessage = useSelector(
    (state: RootStateType) => state.messagemodal.buttonmessagemodal
  );
  const dispatch = useDispatch();

  /*
  Restore the code below to auto-hide the message
  
  setTimeout(() => {
    dispatch(setButtonMessageInactive());
  }, 10000);
  */

  return (
    <Modal
      animationType="fade"
      transparent
      visible={buttonmessage.isactive}
      onRequestClose={() => {
        dispatch(setButtonMessageInactive());
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setButtonMessageInactive());
        }}
      >
        <View style={styles.modalcontainer}>
          <BlurView
            intensity={60}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <View>
            <View style={[styles.modalbox, GlobalStyles.shadow]}>
              <Text style={[styles.header, GlobalStyles.h1text]}>
                {buttonmessage.header}
              </Text>
              <Text style={[styles.header, GlobalStyles.h2text]}>
                {buttonmessage.title}
              </Text>
              <Text style={[styles.description, GlobalStyles.p1text]}>
                {buttonmessage.description}
              </Text>
            </View>
            <View
              style={{
                width: Environment.FullBar,
                marginTop: Environment.StandardPadding,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <HalfbarButton
                label={buttonmessage.leftButton.title}
                active={false}
                Action={() => buttonmessage.leftButton.Action()}
              />
              <HalfbarButton
                label={buttonmessage.rightButton.title}
                active={false}
                Action={() => buttonmessage.rightButton.Action()}
              />
            </View>
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

export default ButtonMessageModal;
