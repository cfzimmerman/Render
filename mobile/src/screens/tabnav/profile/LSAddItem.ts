import * as FileSystem from "expo-file-system";
import { DispatchType } from "../../../redux/store";

interface LSAddItemPropTypes {
  contentkey: string;
  signedurl: string;
  dispatch: DispatchType;
}

async function LSAddItem({
  contentkey,
  signedurl,
  dispatch,
}: LSAddItemPropTypes) {
  try {
    // Check if directory exists
    // Check if already in library
    // Download image
    // Add to directory and library
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default LSAddItem;
