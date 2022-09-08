import { Platform, Share } from "react-native";

async function ShareLink(message: string) {
  if (Platform.OS === "ios") {
    await Share.share({
      url: message,
    });
  } else {
    await Share.share({
      message: message,
    });
  }
}

export default ShareLink;
