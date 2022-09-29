import * as VideoThumbnails from "expo-video-thumbnails";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import { batch } from "react-redux";

import { Storage } from "aws-amplify";
import {
  setLoadProgressActive,
  setLoadProgressInactive,
  setPercentComplete,
  setUploadObject,
} from "../../../redux/shared/loadprogressmessage";
import { TransformDimensions } from "../../../resources/utilities";
import AddToDB from "./AddToDB";
import CleanupFailedUpload from "./CleanupFailedUpload";
import GetContentName from "./GetContentName";

async function UploadVideo({
  dispatch,
  uri,
  height,
  width,
  type,
  duration,
  date,
  currentuser,
  vaultpostdata,
  vaultfeeddata,
  vaultnexttoken,
  gotaddedusersfilter,
  multiSelectActive,
}) {
  const size = await FileSystem.getInfoAsync(uri);
  const aspectratio = TransformDimensions(width / height);

  const storageresponse = [];
  const thumbnailNameArray = [];

  batch(() => {
    dispatch(
      setLoadProgressActive({
        title: "Uploading video",
        description: `${parseInt(size.size / 1000000)} MB total`,
      })
    );
    dispatch(setPercentComplete("Processing"));
    // dispatch(setUploadObject(postobject))
  });

  // Get video thumbnail. VideoThumbnails.getThumbnailAsync() isn't that robust, so there's a backup
  try {
    const address = await VideoThumbnails.getThumbnailAsync(uri);

    const thumbnail = await fetch(address.uri);

    const thumbnailblob = await thumbnail.blob();

    const thumbnailname = GetContentName(address.uri);

    const thumbnailkey = await Storage.put(thumbnailname, thumbnailblob);

    storageresponse.push(thumbnailkey);
    thumbnailNameArray.unshift(thumbnailname);
  } catch (error) {
    const fauxUpload = {
      key: "CompanyStock/defaultthumbnail.png",
    };
    storageresponse.push(fauxUpload);
    thumbnailNameArray.unshift("CompanyStock/defaultthumbnail.png");
  }

  /*
    const postobject = {
        video: {
            key: videoname
        },
        thumbnail: {
            key: thumbnailname
        },
        image: {
            key: null
        }
    }
    */

  const videoname = GetContentName(uri);

  const file = {
    size: size.size,
    slice: (bodystart, bodyend) =>
      FileSystem.readAsStringAsync(uri, {
        length: bodyend - bodystart,
        position: bodystart,
        encoding: "base64",
      })
        .then((data) => Buffer.from(data, "base64"))
        .catch((error) => {
          console.log(`error: ${error}`);
        }),
  };

  try {
    const result = await Storage.put(videoname, file, {
      resumable: true,
      provider: "StorageChunkUpload",
      progressCallback(progress) {
        // console.log(`Uploading video: ${parseInt((progress.loaded / progress.total) * 100)}%`);
        dispatch(
          setPercentComplete(
            `${parseInt((progress.loaded / progress.total) * 100)}%`
          )
        );
      },
    });

    storageresponse.push(result);

    dispatch(setPercentComplete("Success!"));
    setTimeout(() => {
      dispatch(setLoadProgressInactive());
    }, 1000);
  } catch (error) {
    CleanupFailedUpload({
      origin: "UploadVideo",
      videoname,
      thumbnailname: thumbnailNameArray[0],
    });
    dispatch(setPercentComplete("Upload failed"));
    setTimeout(() => {
      dispatch(setLoadProgressInactive());
    }, 1000);
    return;
  }

  AddToDB({
    contentkey: storageresponse[1].key,
    aspectratio,
    contenttype: type,
    thumbnailkey: storageresponse[0].key,
    date,
    currentuser,
    dispatch,
    vaultpostdata,
    vaultfeeddata,
    vaultnexttoken,
    gotaddedusersfilter,
    filesize: size.size,
    multiSelectActive,
  });
}

export default UploadVideo;
