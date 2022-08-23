import { Storage } from "aws-amplify";
import * as FileSystem from "expo-file-system";

async function LSGetImage({ key }: { key: string }) {
  try {
    const imageAddress = FileSystem.documentDirectory + "LocalSync/" + key;
    const { exists } = await FileSystem.getInfoAsync(imageAddress);

    if (exists === true) {
      return imageAddress;
    } else {
      const signedURL = await Storage.get(key, { expires: 86400 });
      return signedURL;
    }
  } catch (error) {
    console.log(error);
  }
}

export default LSGetImage;

/*

        const imageAddress =
          FileSystem.documentDirectory + "LocalSync/" + item.contentkey;
        const { exists } = await FileSystem.getInfoAsync(imageAddress);
        if (exists === true) {
          newPost.signedurl = imageAddress;
        } else {
          newPost.signedurl = await Storage.get(item.contentkey, {
            expires: 86400,
          });
        }

*/
