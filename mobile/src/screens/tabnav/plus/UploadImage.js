import * as FileSystem from "expo-file-system";

import { Storage } from "aws-amplify";
import { TransformDimensions } from "../../../resources/utilities";
import {
  setLoadProgressActive,
  setLoadProgressInactive,
  setPercentComplete,
} from "../../../redux/system/loadprogressmessage";
import AddToDB from "./AddToDB";
import GetContentName from "./GetContentName";
import CleanupFailedUpload from "./CleanupFailedUpload";

async function UploadImage({
  dispatch,
  uri,
  height,
  width,
  type,
  date,
  currentuser,
  vaultpostdata,
  vaultfeeddata,
  vaultnexttoken,
  gotaddedusersfilter,
  multiSelectActive,
}) {
  const size = await FileSystem.getInfoAsync(uri);

  const content = await fetch(uri);
  const contentblob = await content.blob();
  const imagename = GetContentName(uri);
  const aspectratio = TransformDimensions(width / height);
  dispatch(
    setLoadProgressActive({
      title: "Uploading image",
      description: `${(size.size / 1000000).toFixed(2)} MB total`,
    })
  );
  dispatch(setPercentComplete("Processing"));

  try {
    const result = await Storage.put(imagename, contentblob, {
      progressCallback(progress) {
        // console.log(`Uploading image: ${parseInt((progress.loaded / progress.total) * 100)}%`);
        dispatch(
          setPercentComplete(
            `${parseInt((progress.loaded / progress.total) * 100)}%`
          )
        );
      },
    });

    dispatch(setPercentComplete("Success!"));
    setTimeout(() => {
      dispatch(setLoadProgressInactive());
    }, 1000);

    AddToDB({
      contentkey: result.key,
      aspectratio,
      contenttype: type,
      date,
      thumbnailkey: null,
      currentuser,
      dispatch,
      vaultpostdata,
      vaultfeeddata,
      vaultnexttoken,
      gotaddedusersfilter,
      filesize: size.size,
      multiSelectActive,
    });
  } catch (error) {
    CleanupFailedUpload({ origin: "UploadImage", imagename });
    setTimeout(() => {
      dispatch(setLoadProgressInactive());
    }, 1000);
  }
}

export default UploadImage;
