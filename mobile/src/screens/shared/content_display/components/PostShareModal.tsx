import react, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Button,
  Share,
} from "react-native";
import { useSelector } from "react-redux";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Storage } from "aws-amplify";

import { setShareActive } from "../../../../redux/shared/vaultpostdata";
import { Environment, Colors, GlobalStyles } from "../../../../global";
import HalfbarButton from "../../general/components/HalfbarButton";
import { RootStateType } from "../../../../redux";
import CreateShareableLink from "../operations/CreateShareableLink";

async function DownloadPost({ item, dispatch, setUserMessage }) {
  let cacheUri;

  const callback = (downloadProgress) => {
    const progress = `${Math.round(
      (downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite) *
        100
    )}%`;
    setUserMessage(progress);
  };

  try {
    // Fetch a new url because only cloud content is supported by Filesystem.downloadAsync()
    const cloudSignedURL = await Storage.get(item.contentkey, {
      expires: 86400,
    });

    const cacheAddress =
      FileSystem.cacheDirectory + "shareable-" + item.contentkey;

    const downloadResumable = FileSystem.createDownloadResumable(
      cloudSignedURL,
      cacheAddress,
      {},
      callback
    );

    const downloadResult = await downloadResumable.downloadAsync();

    cacheUri = downloadResult.uri;
    await MediaLibrary.saveToLibraryAsync(downloadResult.uri);
  } catch (error) {
    console.log(error);
  } finally {
    await FileSystem.deleteAsync(cacheUri);
    dispatch(setShareActive(false));
  }
}

async function NativeShare({ item, dispatch, setUserMessage }) {
  try {
    const shareLink = CreateShareableLink({
      linkType: "post",
      itemID: item.id,
    });
    await Share.share({
      url: shareLink,
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setShareActive(false));
  }
}

const PostShareModal = ({ dispatch, item }) => {
  const [userMessage, setUserMessage] = useState("Download content");

  const shareactive = useSelector(
    (state: RootStateType) => state.vaultpostdata.shareactive
  );

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
                DownloadPost({ item, dispatch, setUserMessage });
                //, setUserMessage("Saving");
              }}
            />
            <HalfbarButton
              label="Share"
              active={false}
              Action={() => {
                NativeShare({ item, dispatch, setUserMessage });
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

export default PostShareModal;
