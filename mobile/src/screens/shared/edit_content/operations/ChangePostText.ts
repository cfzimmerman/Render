import { format } from "date-fns";

import {
  updateHeaderText,
  updateNonHeaderText,
} from "../../../../redux/shared/vaultpostdata";
import { PostType, PostHeaderType } from "../../../../global/CommonTypes";

import { API, graphqlOperation } from "aws-amplify";
import { updatePosts } from "../../../../graphql/mutations";
import { GetDate } from "../../../resources/utilities";
import { DispatchType } from "../../../../redux";

interface ChangePostTextPropsType {
  postID: string;
  newText: string;
  contentdate: string;
  vaultpostdata: PostHeaderType[];
  vaultfeeddata: PostType[];
  dispatch: DispatchType;
}

export interface TextUpdateType {
  vaultFeedIndex: number;
  sectionIndex: number;
  sectionDataIndex?: number;
  newText: string;
}

async function ChangePostText({
  postID,
  newText,
  contentdate,
  vaultpostdata,
  vaultfeeddata,
  dispatch,
}: ChangePostTextPropsType) {
  const headerTitle = GetDate(contentdate);

  const vaultFeedIndex = vaultfeeddata.findIndex(
    (item: PostType) => item.id === postID
  );

  const sectionIndex = vaultpostdata.findIndex(
    (item: PostHeaderType) => item.header.title === headerTitle
  );

  if (vaultfeeddata[vaultFeedIndex].header === false) {
    const sectionDataIndex = vaultpostdata[sectionIndex].data.findIndex(
      (item: PostType) => item.id === postID
    );

    const notHeaderUpdate = {
      vaultFeedIndex: vaultFeedIndex,
      sectionIndex: sectionIndex,
      sectionDataIndex: sectionDataIndex,
      newText: newText,
    };

    dispatch(updateNonHeaderText(notHeaderUpdate));
  } else if (vaultfeeddata[vaultFeedIndex].header === true) {
    // added the elif in case there's a null or undefined floating around

    const headerUpdate = {
      vaultFeedIndex: vaultFeedIndex,
      sectionIndex: sectionIndex,
      newText: newText,
    };

    dispatch(updateHeaderText(headerUpdate));
  }

  const changedPost = {
    id: postID,
    posttext: newText,
  };

  try {
    await API.graphql(graphqlOperation(updatePosts, { input: changedPost }));
  } catch (error) {
    console.log("Error: " + error);
  }
}

export default ChangePostText;
