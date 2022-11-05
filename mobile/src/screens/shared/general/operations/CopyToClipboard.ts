import * as Clipboard from "expo-clipboard";

async function CopyToClipboard(message: string) {
  // As of writing this (July 4, 2022), expo-clipboard doesn't yet support +v3.0.0 for iOS, in which functions are all async (why this is async). When v3.0.0 is fully supported, switch to setAsStringAsync() or something similar
  try {
    Clipboard.setString(message);
  } catch (error) {
    console.log("Error: " + error);
  }
}

export default CopyToClipboard;
