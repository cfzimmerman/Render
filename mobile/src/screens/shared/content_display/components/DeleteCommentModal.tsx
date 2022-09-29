import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { HalfbarButton } from "../../../resources/atoms";
import { DispatchType, RootStateType } from "../../../../redux";
import { setDeleteComment } from "../../../../redux/socialmain";
import { Environment, GlobalStyles, Colors } from "../../../../global";
import { BlurView } from "expo-blur";
import { useSelector } from "react-redux";
import DeleteComment from "../operations/DeleteComment";
import { CommentType } from "../../../../global/CommonTypes";

const DeleteCommentModal = ({
  dispatch,
  commentsdata,
}: {
  dispatch: DispatchType;
  commentsdata: CommentType[];
}) => {
  const deletecomment = useSelector(
    (state: RootStateType) => state.socialmain.deletecomment
  );
  return (
    <Modal
      animationType="fade"
      transparent
      visible={deletecomment.active}
      onRequestClose={() => {
        dispatch(setDeleteComment({ active: false, commentID: null }));
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setDeleteComment({ active: false, commentID: null }));
        }}
      >
        <View style={styles.modalcontainer}>
          <BlurView
            intensity={60}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.modalbox, GlobalStyles.shadow]}>
            <Text style={[styles.header, GlobalStyles.h2text]}>
              Delete comment?
            </Text>
          </View>
          <View style={styles.sharebuttonwrapper}>
            <HalfbarButton
              label="Maybe not"
              active={false}
              Action={() => {
                dispatch(setDeleteComment({ active: false, commentID: null }));
              }}
            />
            <HalfbarButton
              label="Now!"
              active={false}
              Action={() => {
                DeleteComment({
                  commentID: deletecomment.commentID,
                  dispatch,
                  commentsdata,
                });
              }}
            />
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
  sharebuttonwrapper: {
    marginTop: Environment.StandardPadding,
    width: Environment.FullBar,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    color: Colors.AccentOn,
    textAlign: "center",
  },
  description: {
    color: Colors.AccentPartial,
    textAlign: "center",
  },
});

export default DeleteCommentModal;
