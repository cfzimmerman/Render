import * as FileSystem from "expo-file-system";
import {
  LocalConfigType,
  setLocalConfig,
} from "../../../redux/system/localsync";

// See LSNotes.txt for more info
// LocalConfig.txt

// syncPreference: "All" | "Partial" | "None"
const defaultLocalConfig: LocalConfigType = {
  syncPreference: "Partial",
};

async function LSGetConfig({ dispatch }) {
  const configAddress = FileSystem.documentDirectory + "LocalConfig.txt";
  try {
    const configExists = await FileSystem.getInfoAsync(configAddress);
    if (configExists.exists === false) {
      console.log("\nWrite file");
      // Create new default config file
      const defaultConfigString = JSON.stringify(defaultLocalConfig);
      await FileSystem.writeAsStringAsync(configAddress, defaultConfigString);
      dispatch(setLocalConfig(defaultLocalConfig));
    } else {
      // Read existing config file
      const localConfigString = await FileSystem.readAsStringAsync(
        configAddress
      );
      const localConfig: LocalConfigType = JSON.parse(localConfigString);
      dispatch(setLocalConfig(localConfig));
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default LSGetConfig;
