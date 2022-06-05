import react, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

import { setShareActive } from "../../../redux/vault/vaultpostdata";
import {
  Environment,
  Colors,
  GlobalStyles,
  Icons,
} from "../../../resources/project";
import { HalfbarButton } from "../../../resources/atoms";

async function DownloadPost({ item, dispatch }) {
  let fileURI;
  try {
    const { uri } = await FileSystem.downloadAsync(
      item.signedurl,
      `${FileSystem.cacheDirectory}shareable${item.contentkey}`,
    );

    fileURI = uri;

    await MediaLibrary.saveToLibraryAsync(uri);
  } catch (error) {
    console.log(error);
  } finally {
    FileSystem.deleteAsync(fileURI);
    dispatch(setShareActive(false));
  }
}

async function NativeShare({ item, dispatch, setUserMessage }) {
  let fileURI;
  try {
    const { uri } = await FileSystem.downloadAsync(
      item.signedurl,
      `${FileSystem.documentDirectory}shareable${item.contentkey}`,
    );

    fileURI = uri;

    await Sharing.shareAsync(uri);
  } catch (error) {
    console.log(error);
  } finally {
    FileSystem.deleteAsync(fileURI);
    setUserMessage("Download content");
    dispatch(setShareActive(false));
  }
}

function PostShareModal({ dispatch, item }) {
  const [userMessage, setUserMessage] = useState("Download content");

  const shareactive = useSelector((state) => state.vaultpostdata.shareactive);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={shareactive}
      onRequestClose={() => {
        dispatch(setShareActive(false));
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(setShareActive(false));
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
            <Text style={[styles.description, GlobalStyles.p1text]}>
              Link share coming soon.
            </Text>
          </View>
          <View style={styles.sharebuttonwrapper}>
            <HalfbarButton
              label="Download"
              active={false}
              Action={() => {
                DownloadPost({ item, dispatch }), setUserMessage("Saving");
              }}
            />
            <HalfbarButton
              label="More"
              active={false}
              Action={() => {
                NativeShare({ item, dispatch, setUserMessage }),
                setUserMessage("Exporting");
              }}
            />
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

export default PostShareModal;
