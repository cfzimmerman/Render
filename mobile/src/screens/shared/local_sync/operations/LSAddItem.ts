import * as FileSystem from "expo-file-system";
import {
  AddToLocalLibraryPropsType,
  addToLocalLibrary,
  LSLibraryItemType,
  removeFromLocalLibrary,
} from "../../../../redux/shared/localsync";
import LSGetConfig from "./LSGetConfig";
import LSGetLibrary from "./LSGetLibrary";
import { DispatchType } from "../../../../redux";

interface LSAddItemPropTypes {
  contentkey: string;
  signedurl: string;
  localLibrary: {} | Record<string, LSLibraryItemType>;
  dispatch: DispatchType;
}

const libraryAddress = FileSystem.documentDirectory + "LocalLibrary.txt";
const directoryAddress = FileSystem.documentDirectory + "LocalSync/";

async function LSAddItem({
  contentkey,
  signedurl,
  localLibrary,
  dispatch,
}: LSAddItemPropTypes) {
  try {
    const downloadDestination = directoryAddress + contentkey;
    const libraryExists = await FileSystem.getInfoAsync(libraryAddress);
    const directoryExists = await FileSystem.getInfoAsync(directoryAddress);
    const contentExists = await FileSystem.getInfoAsync(downloadDestination);

    if (libraryExists.exists === true && directoryExists.exists === true) {
      if (
        contentkey.includes(".") === true &&
        typeof localLibrary[`${contentkey}`] === "undefined" &&
        contentExists.exists === false
      ) {
        // If the name (contentkey) is structured as a filetype (it at least has a period), localLibrary doesn't have that item yet, and the item isn't saved in DocumentDirectory/LocalSync/ yet, download it and update localLibrary in Redux to reflect the new addition

        await FileSystem.downloadAsync(signedurl, downloadDestination, {
          sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
        });
        const newLibraryItem: AddToLocalLibraryPropsType = {
          [contentkey]: {
            lastUpdated: new Date().toISOString(),
          },
        };
        dispatch(addToLocalLibrary(newLibraryItem));
        // Updating Redux triggers a rewrite the DocumentDirectory copy
      } else {
        // Check for imbalance errors where different sources of data are conflicting, correct them
        if (
          contentExists.exists === false &&
          typeof localLibrary[`${contentkey}`] != "undefined"
        ) {
          // localLibrary declares an instance for a piece of content that doesn't exist in LocalSync/. Delete the localLibrary item to match the LocalSync/ folder.
          dispatch(removeFromLocalLibrary(contentkey));
        } else if (
          contentExists.exists === true &&
          typeof typeof localLibrary[`${contentkey}`] === "undefined"
        ) {
          // LocalSync/ has a file that localLibrary does not declare. Add the object info to localLibrary to declare it for future use.
          const newLibraryItem: AddToLocalLibraryPropsType = {
            [contentkey]: {
              lastUpdated: new Date().toISOString(),
            },
          };
          dispatch(addToLocalLibrary(newLibraryItem));
        }
      }
    } else {
      if (directoryExists.exists === false) {
        // If missing directory, make it (that happens on GetConfig)
        LSGetConfig({ dispatch });
      }

      if (libraryExists.exists === false) {
        // If missing library, make it
        LSGetLibrary({ dispatch });
      }
    }
  } catch (error) {
    // console.log("Error: " + JSON.stringify(error));
    console.log("🤖 Big Error");
  }
}

export default LSAddItem;
