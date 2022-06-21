import * as FileSystem from "expo-file-system";
import { setButtonMessageInactive } from "../../../redux/system/messagemodal";
import LSGetConfig from "./LSGetConfig";

const directoryAddress = FileSystem.documentDirectory + "LocalSync/";

async function LSClearStorage({ dispatch, setGotStorageInfo }) {
  try {
    const directoryExists = await FileSystem.getInfoAsync(directoryAddress);
    if (directoryExists.exists === true) {
      await FileSystem.deleteAsync(directoryAddress);
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
  setGotStorageInfo(false);
  LSGetConfig({ dispatch });
  dispatch(setButtonMessageInactive());
}

export default LSClearStorage;
