import * as FileSystem from "expo-file-system";
import {
  LocalConfigType,
  setLocalConfig,
} from "../../../../redux/shared/localsync";

// See LSNotes.txt for more info
// LocalConfig.txt

// syncPreference: "All" | "Partial" | "None"
const defaultLocalConfig: LocalConfigType = {
  syncPreference: "Partial",
};

async function LSGetConfig({ dispatch }) {
  const configAddress = FileSystem.documentDirectory + "LocalConfig.txt";
  const directoryAddress = FileSystem.documentDirectory + "LocalSync/";

  try {
    const configExists = await FileSystem.getInfoAsync(configAddress);
    const directoryExists = await FileSystem.getInfoAsync(directoryAddress);
    if (configExists.exists === false) {
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

    if (directoryExists.exists === false) {
      // If the local sync content folder doesn't exist yet, create it.
      await FileSystem.makeDirectoryAsync(directoryAddress);
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default LSGetConfig;
