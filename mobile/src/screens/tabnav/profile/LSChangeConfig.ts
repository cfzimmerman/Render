import * as FileSystem from "expo-file-system";
import { DispatchType } from "../../../redux/store";
import LSGetConfig from "./LSGetConfig";
import { LocalConfigType } from "../../../redux/system/localsync";

interface LSChangeConfigPropTypes {
  dispatch: DispatchType;
  newLocalConfig: LocalConfigType;
}

/*
When last updated, this was LocalConfigType: 

export interface LocalConfigType {
  syncPreference: null | "All" | "Partial" | "None";
}
*/

async function LSChangeConfig({
  dispatch,
  newLocalConfig,
}: LSChangeConfigPropTypes) {
  const configAddress = FileSystem.documentDirectory + "LocalConfig.txt";
  const newLocalConfigString = JSON.stringify(newLocalConfig);
  try {
    const configExists = await FileSystem.getInfoAsync(configAddress);
    if (configExists.exists === true) {
      if (
        newLocalConfig.syncPreference === "All" ||
        newLocalConfig.syncPreference === "None" ||
        newLocalConfig.syncPreference === "Partial"
      ) {
        await FileSystem.writeAsStringAsync(
          configAddress,
          newLocalConfigString
        );
      }
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
  LSGetConfig({ dispatch });
}

export default LSChangeConfig;
