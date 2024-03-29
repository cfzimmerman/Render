import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Storage, API, graphqlOperation } from "aws-amplify";
import GetContentName from "../../plus/operations/GetContentName";
import GetPfp from "./GetPfp";

import {
  setLoadProgressActive,
  setPercentComplete,
  setLoadProgressInactive,
} from "../../../redux/shared/loadprogressmessage";

import { updateUsers } from "../../../graphql/mutations";

async function SetNewPfp({
  uri,
  oldpfpkey,
  dispatch,
  cognitosub,
  currentuserid,
  localLibrary,
  syncPreference,
}) {
  const size = await FileSystem.getInfoAsync(uri);
  const content = await fetch(uri);
  const contentblob = await content.blob();
  const imagename = GetContentName(uri);

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
        dispatch(
          setPercentComplete(
            `${Math.round((progress.loaded / progress.total) * 100)}%`
          )
        );
      },
    });

    UpdateProfile({
      newpfpkey: result.key,
      cognitosub,
      oldpfpkey,
      dispatch,
      currentuserid,
      localLibrary,
      syncPreference,
    });

    dispatch(setPercentComplete("Success!"));
    setTimeout(() => {
      dispatch(setLoadProgressInactive());
    }, 1000);
  } catch (error) {
    console.log(`Upload Image Error: ${error}`);
  }
}

async function UpdateProfile({
  newpfpkey,
  cognitosub,
  oldpfpkey,
  dispatch,
  currentuserid,
  syncPreference,
  localLibrary,
}) {
  const updateduser = {
    id: currentuserid,
    pfp: newpfpkey,
  };

  try {
    await API.graphql(graphqlOperation(updateUsers, { input: updateduser }));
  } catch (error) {
    console.log("error: " + JSON.stringify(error));
  }

  if (oldpfpkey != "CompanyStock/defaultpfp.png") {
    RemoveOldPfp(oldpfpkey);
  }

  GetPfp({ dispatch, pfpkey: newpfpkey, localLibrary, syncPreference });
}

async function RemoveOldPfp(oldpfpkey) {
  try {
    await Storage.remove(oldpfpkey);
  } catch (error) {
    console.log("error: " + JSON.stringify(error));
  }
}

async function ChangePfp({
  cognitosub,
  dispatch,
  currentpfpkey,
  currentuserid,
  localLibrary,
  syncPreference,
}) {
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });

  // @ts-ignore - VS Code specific error. Type and URI are included if not cancelled
  if (!result.cancelled && result.type === "image") {
    SetNewPfp({
      // @ts-ignore - VS Code specific error. Type and URI are included if not cancelled
      uri: result.uri,
      oldpfpkey: currentpfpkey,
      dispatch,
      cognitosub,
      currentuserid,
      localLibrary,
      syncPreference,
    });
    // @ts-ignore - VS Code specific error. Type and URI are included if not cancelled
  } else if (!result.cancelled && result.type === "video") {
    console.log("error: cannot select video");
  }
}

export default ChangePfp;
