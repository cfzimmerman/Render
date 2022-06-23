import * as FileSystem from "expo-file-system";
import { setButtonMessageInactive } from "../../../redux/system/messagemodal";
import LSGetConfig from "./LSGetConfig";
import { setLocalLibrary } from "../../../redux/system/localsync";
import { DispatchType } from "../../../redux/store";

const defaultLibrary = {};

const directoryAddress = FileSystem.documentDirectory + "LocalSync/";
const libraryAddress = FileSystem.documentDirectory + "LocalLibrary.txt";

async function LSClearStorage({
  dispatch,
  setGotStorageInfo,
}: {
  dispatch: DispatchType;
  setGotStorageInfo: Function | undefined;
}) {
  try {
    const directoryExists = await FileSystem.getInfoAsync(directoryAddress);
    const libraryExists = await FileSystem.getInfoAsync(libraryAddress);

    if (directoryExists.exists === true) {
      await FileSystem.deleteAsync(directoryAddress);
    }
    if (libraryExists.exists === true) {
      const defaultLibraryString = JSON.stringify(defaultLibrary);
      await FileSystem.writeAsStringAsync(libraryAddress, defaultLibraryString);
      dispatch(setLocalLibrary(defaultLibrary));
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }

  if (typeof setGotStorageInfo != "undefined") {
    setGotStorageInfo(false);
  }
  LSGetConfig({ dispatch });
  dispatch(setButtonMessageInactive());
}

export default LSClearStorage;
