import react, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector } from "react-redux";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

import { setEditTextModalActive } from "../../../redux/plus/plusmain";
import { Environment, GlobalStyles, Colors } from "../../../resources/project";
import { HalfbarButton } from "../../../resources/atoms";
import ChangePostText from "./ChangePostText";
import { DispatchType, RootStateType } from "../../../redux/store";
import { PostHeaderType, PostType } from "../../../resources/CommonTypes";

const CustomHalfbarButton = ({ label, Action }) => {
  return (
    <TouchableOpacity onPress={() => Action()}>
      <View style={[GlobalStyles.shadow, styles.customhalfbarbutton]}>
        <Text style={[GlobalStyles.h3text, styles.halfbarlabel]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface EditTextModalPT {
  dispatch: DispatchType;
  item: PostType;
  vaultpostdata: PostHeaderType[];
  vaultfeeddata: PostType[];
}

const EditTextModal = ({
  dispatch,
  item,
  vaultpostdata,
  vaultfeeddata,
}: EditTextModalPT) => {
  const [postText, setPostText] = useState(item.posttext);

  const edittextmodalactive = useSelector(
    (state: RootStateType) => state.plusmain.edittextmodalactive
  );

  // Character limit for user input text
  const postTextLengthLimit = 2000;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={edittextmodalactive}
      onRequestClose={() => {
        dispatch(setEditTextModalActive(false));
      }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <BlurView
            tint="dark"
            intensity={60}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView style={styles.safeareawrapper}>
            <KeyboardAvoidingView
              style={styles.keyboardavoidingwrapper}
              behavior="height"
            >
              <View style={[GlobalStyles.shadow, styles.textbox]}>
                <TextInput
                  onChangeText={setPostText}
                  value={postText}
                  maxLength={2000}
                  autoFocus
                  multiline
                  style={[GlobalStyles.p1text, styles.textinputstyle]}
                />
              </View>

              <View style={styles.buttonholder}>
                <CustomHalfbarButton
                  label="Cancel"
                  Action={() => dispatch(setEditTextModalActive(false))}
                />
                <CustomHalfbarButton
                  label="Save"
                  Action={() => {
                    if (postText.length <= postTextLengthLimit) {
                      dispatch(setEditTextModalActive(false)),
                        ChangePostText({
                          postID: item.id,
                          newText: postText,
                          contentdate: item.contentdate,
                          vaultpostdata,
                          vaultfeeddata,
                          dispatch,
                        });
                    }
                  }}
                />
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeareawrapper: {
    flex: 1,
    padding: Environment.StandardPadding,
  },
  textbox: {
    backgroundColor: Colors.BackgroundPartial,
    padding: Environment.StandardPadding,
    borderRadius: Environment.StandardRadius,
    width: Environment.FullBar,
  },
  textinputstyle: {
    color: Colors.AccentOn,
    height: Environment.HalfBar,
  },
  buttonholder: {
    width: Environment.FullBar,
    flexDirection: "row",
    marginVertical: Environment.StandardPadding,
    justifyContent: "space-between",
  },
  keyboardavoidingwrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  customhalfbarbutton: {
    height: Environment.CubeSize,
    width: Environment.HalfBar,
    backgroundColor: Colors.BackgroundPartial,
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  halfbarlabel: {
    color: Colors.AccentOn,
  },
  textlimitlabel: {
    color: Colors.AccentPartial,
    textAlign: "right",
  },
});

export default EditTextModal;
