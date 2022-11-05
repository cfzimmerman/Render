import * as FileSystem from "expo-file-system";

const libraryAddress = FileSystem.documentDirectory + "LocalLibrary.txt";

async function LSRewriteLocalLibrary({
  localLibraryString,
}: {
  localLibraryString: string;
}) {
  try {
    const libraryExists = await FileSystem.getInfoAsync(libraryAddress);
    if (libraryExists.exists === true) {
      await FileSystem.writeAsStringAsync(libraryAddress, localLibraryString);
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default LSRewriteLocalLibrary;
