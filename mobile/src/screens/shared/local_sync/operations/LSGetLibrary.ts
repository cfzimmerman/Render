import * as FileSystem from "expo-file-system";
import {
  setLocalLibrary,
  LSLibraryItemType,
} from "../../../../redux/shared/localsync";

const defaultLibrary = {};

// LS Library lists all the Local Sync content stored on the device and when it was last updated. That info is essential to ensuring that edited images and videos are updated and in-sync with cloud copies.

async function LSGetLibrary({ dispatch }) {
  const libraryAddress = FileSystem.documentDirectory + "LocalLibrary.txt";
  try {
    const libraryExists = await FileSystem.getInfoAsync(libraryAddress);
    if (libraryExists.exists === true) {
      // If library exists, read it from the filesystem, parse it into an object, and send it to the localsync Redux slice
      const localLibraryString = await FileSystem.readAsStringAsync(
        libraryAddress
      );
      const localLibrary: Record<string, LSLibraryItemType> =
        JSON.parse(localLibraryString);
      dispatch(setLocalLibrary(localLibrary));
    } else {
      // If library doesn't exist, create a default empty library and send it to the localsync Redux slice
      const defaultLibraryString = JSON.stringify(defaultLibrary);
      await FileSystem.writeAsStringAsync(libraryAddress, defaultLibraryString);
      dispatch(setLocalLibrary(defaultLibrary));
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default LSGetLibrary;
