import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { BlurView } from "expo-blur";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootStateType } from "../../../redux/store";
import { setAddCommentActive } from "../../../redux/social/socialmain";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";
import { SafeAreaView } from "react-native-safe-area-context";
import AddComment from "./AddComment";
import {
  PostType,
  PostHeaderType,
  CurrentUserType,
} from "../../../resources/CommonTypes";
import { VaultPostFullViewUsecaseTypes } from "../vault/VaultPostFullView";

interface AddCommentModalPropType {
  dispatch: DispatchType;
  item: PostType;
  usecase: VaultPostFullViewUsecaseTypes;
  index: number;
  currentuser: CurrentUserType;
}

const CustomHalfbarButton = ({ label, Action }) => {
  return (
    <TouchableOpacity onPress={() => Action()}>
      <View style={[GlobalStyles.shadow, styles.customhalfbarbutton]}>
        <Text style={[GlobalStyles.h3text, styles.halfbarlabel]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const AddCommentModal = ({
  dispatch,
  item,
  usecase,
  index,
  currentuser,
}: AddCommentModalPropType) => {
  const [commentText, setCommentText] = useState("");

  const addcommentactive = useSelector(
    (state: RootStateType) => state.socialmain.addcommentactive
  );

  const commentTextLimit = 500;

  // Based this off the wrong modal. Look over to EditTextModal to continue

  return (
    <Modal
      animationType="slide"
      transparent
      visible={addcommentactive}
      onRequestClose={() => {
        dispatch(setAddCommentActive(false));
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
              <View style={[GlobalStyles.irregularshadow, styles.textbox]}>
                <TextInput
                  onChangeText={setCommentText}
                  value={commentText}
                  maxLength={commentTextLimit}
                  autoFocus
                  multiline
                  style={[GlobalStyles.p1text, styles.textinputstyle]}
                />
              </View>

              <View style={styles.buttonholder}>
                <CustomHalfbarButton
                  label="Cancel"
                  Action={() => dispatch(setAddCommentActive(false))}
                />
                <CustomHalfbarButton
                  label="Comment"
                  Action={() => {
                    if (commentText.length <= commentTextLimit) {
                      dispatch(setAddCommentActive(false));
                      AddComment({
                        item,
                        dispatch,
                        commentText,
                        currentuser,
                      });
                      /*
                        ChangePostText({
                          postID: item.id,
                          newText: postText,
                          contentdate: item.contentdate,
                          vaultpostdata,
                          vaultfeeddata,
                          dispatch,
                        });
                        */
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
    textAlignVertical: "top",
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

export default AddCommentModal;
