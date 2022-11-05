import { Storage } from "aws-amplify";
import * as FileSystem from "expo-file-system";

export interface LSGetImageReturnType {
  imageURL: string | null;
  thumbnailURL: string | null;
  type: "S3" | "local";
}

interface InputTypes {
  contentKey: string;
  thumbnailKey: string | null;
  contentType: "image" | "video";
}

// This function returns the info needed to create a post item with signedURL and thumbnailURL. The "type" return value can be used when further LocalSync operations are involved.
async function LSGetImage({
  contentKey,
  thumbnailKey,
  contentType,
}: InputTypes): Promise<LSGetImageReturnType> {
  try {
    if (contentType === "image") {
      const imageAddress =
        FileSystem.documentDirectory + "LocalSync/" + contentKey;
      const { exists } = await FileSystem.getInfoAsync(imageAddress);

      const imageURL =
        exists === true
          ? imageAddress
          : await Storage.get(contentKey, { expires: 86400 });

      return {
        imageURL,
        thumbnailURL: null,
        type: exists === true ? "local" : "S3",
      };
    } else if (contentType === "video") {
      const thumbnailAddress =
        FileSystem.documentDirectory + "LocalSync/" + thumbnailKey;
      const { exists } = await FileSystem.getInfoAsync(thumbnailAddress);

      const thumbnailURL =
        exists === true
          ? thumbnailAddress
          : await Storage.get(thumbnailKey, { expires: 86400 });

      return {
        imageURL: null,
        thumbnailURL,
        type: exists === true ? "local" : "S3",
      };
    }
    /*
    const imageAddress =
    const { exists } = await FileSystem.getInfoAsync(imageAddress);

    if (exists === true) {
      return {
        imageURL: contentType === "image" ? imageAddress : null,
        thumbnailURL: contentType === "video" ? imageAddress : null,
        type: "local",
      };
    } else {
      return {
        imageURL: contentType === "image" ? signedURL : null,
        thumbnailURL: contentType === "video" ? signedURL : null,
        type: "S3",
      };
    }
    */
  } catch (error) {
    console.log(error);
  }
}

export default LSGetImage;
