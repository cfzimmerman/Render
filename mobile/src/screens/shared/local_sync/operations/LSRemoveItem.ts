import * as FileSystem from "expo-file-system";
import { removeFromLocalLibrary } from "../../../../redux/shared/localsync";

const libraryAddress = FileSystem.documentDirectory + "LocalLibrary.txt";
const directoryAddress = FileSystem.documentDirectory + "LocalSync/";

async function LSRemoveItem({ dispatch, contentkey, localLibrary }) {
  // contentkey is a poorly named variable. Also accepts thumbnailkey values
  const contentAddress = directoryAddress + contentkey;

  try {
    const libraryExists = await FileSystem.getInfoAsync(libraryAddress);
    const directoryExists = await FileSystem.getInfoAsync(directoryAddress);
    const contentExists = await FileSystem.getInfoAsync(contentAddress);

    if (
      libraryExists.exists === true &&
      directoryExists.exists === true &&
      contentExists.exists === true &&
      typeof localLibrary[`${contentkey}`] != "undefined"
    ) {
      await FileSystem.deleteAsync(contentAddress);
      dispatch(removeFromLocalLibrary(contentkey));
    } else {
      if (
        contentExists.exists === true &&
        typeof localLibrary[`${contentkey}`] === "undefined"
      ) {
        await FileSystem.deleteAsync(contentAddress);
        // Exists in LocalSync/ but not localLibrary. Remove from LocalSync/
      } else if (
        contentExists.exists === false &&
        typeof localLibrary[`${contentkey}`] != "undefined"
      ) {
        dispatch(removeFromLocalLibrary(contentkey));
        // In localLibrary but no file in LocalSync/. Remove from localLibrary
      }
    }
  } catch (error) {
    console.log("Error: " + error);
  }

  // check if in localLibrary
  // check if in LocalSync/
  // remove from LocalSync
  // Update redux, removes from LocalLibrary
}

export default LSRemoveItem;
