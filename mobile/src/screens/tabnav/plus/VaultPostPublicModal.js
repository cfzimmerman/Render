import react, { useState } from "react";
import {
  Modal,
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import { HalfbarButton } from "../../../resources/atoms";
import { setPostPublicModal } from "../../../redux/vault/vaultpostdata";
import { Environment, Colors, GlobalStyles } from "../../../resources/project";
import ChangePostPublic from "./ChangePostPublic";
import PostPublic from "./PostPublic";
import UnpostPublic from "./UnpostPublic";

function CorrectOptions({
  item,
  vaultpostdata,
  vaultfeeddata,
  dispatch,
  currentuser,
  gallerydata,
  origin,
  navigation,
}) {
  if (item.publicpost != true) {
    const isodate = new Date().toISOString();

    const truePostOperation = {
      publicpost: true,
      publicpostdate: isodate,
    };

    return (
      <View style={styles.optionbuttonholder}>
        <HalfbarButton
          label="❌ Cancel"
          active={false}
          Action={() => dispatch(setPostPublicModal(false))}
        />
        <HalfbarButton
          label="✅ Post"
          active={false}
          Action={() => {
            PostPublic({
              dispatch, item, currentuser, isodate, gallerydata,
            });
            ChangePostPublic({
              postID: item.id,
              contentdate: item.contentdate,
              postOperation: truePostOperation,
              vaultpostdata,
              vaultfeeddata,
              dispatch,
            });
            dispatch(setPostPublicModal(false));
          }}
        />
      </View>
    );
  }
  const falsePostOperation = {
    publicpost: false,
    publicpostdate: null,
  };

  return (
    <View style={styles.optionbuttonholder}>
      <HalfbarButton
        label="Close"
        active={false}
        Action={() => dispatch(setPostPublicModal(false))}
      />
      <HalfbarButton
        label="Make private"
        active={false}
        Action={() => {
          UnpostPublic({
            dispatch, item, gallerydata, origin,
          });
          ChangePostPublic({
            postID: item.id,
            contentdate: item.contentdate,
            postOperation: falsePostOperation,
            vaultpostdata,
            vaultfeeddata,
            dispatch,
          });
          dispatch(setPostPublicModal(false));
          if (origin === "gallery") {
            navigation.navigate("Profile", { screen: "GalleryMain" });
          }
        }}
      />
    </View>
  );
}

// origin: "gallery", "vault"
function VaultPostPublicModal({
  dispatch, item, origin, navigation,
}) {
  const initialUserMessage = "Post this publicly?";

  const [userMessage, setUserMessage] = useState(initialUserMessage);

  const currentuser = useSelector((state) => state.profilemain.currentuser);
  const postpublicmodal = useSelector(
    (state) => state.vaultpostdata.postpublicmodal,
  );

  const vaultpostdata = useSelector(
    (state) => state.vaultpostdata.vaultpostdata,
  );
  const vaultfeeddata = useSelector(
    (state) => state.vaultpostdata.vaultfeeddata,
  );
  const gallerydata = useSelector((state) => state.profilemain.gallerydata);

  if (item.publicpost === true) {
    const newMessage = `Posted on ${format(new Date(item.publicpostdate), "PP")}.`;
    if (userMessage != newMessage) {
      setUserMessage(newMessage);
    }
  }

  if (item.publicpost === false && userMessage != initialUserMessage) {
    setUserMessage(initialUserMessage);
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={postpublicmodal}
      onRequestClose={() => {
        dispatch(setPostPublicModal(false));
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setPostPublicModal(false));
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
              {userMessage}
            </Text>
          </View>
          <CorrectOptions
            item={item}
            vaultfeeddata={vaultfeeddata}
            vaultpostdata={vaultpostdata}
            dispatch={dispatch}
            currentuser={currentuser}
            gallerydata={gallerydata}
            origin={origin}
            navigation={navigation}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
//                        <Text style={[styles.header, GlobalStyles.h1text]}>{systemmessage.header}</Text>
//                         <Text style={[styles.description, GlobalStyles.p1text]}>{systemmessage.description}</Text>

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
  optionbuttonholder: {
    width: Environment.FullBar,
    marginVertical: Environment.StandardPadding,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default VaultPostPublicModal;