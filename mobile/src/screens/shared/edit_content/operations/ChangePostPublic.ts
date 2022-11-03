import { format } from "date-fns";

import { updatePostPublic } from "../../../../redux/shared/vaultpostdata";
import GetDate from "../../general/operations/GetDate";
import { API, graphqlOperation } from "aws-amplify";
import { updatePosts } from "../../../../graphql/mutations";

import {
  ChangePostPublicPropsType,
  PostOperationType,
} from "../components/EditOptionsModal";
import { PostHeaderType, PostType } from "../../../../global/CommonTypes";

export interface PostPublicUpdatePropsType {
  header: boolean;
  vaultFeedIndex: number;
  sectionIndex: number;
  sectionDataIndex?: number;
  postOperation: PostOperationType;
}

async function ChangePostPublic({
  postID,
  postOperation,
  contentdate,
  vaultpostdata,
  vaultfeeddata,
  dispatch,
}: ChangePostPublicPropsType) {
  if (typeof contentdate != "undefined") {
    const headerTitle = GetDate(contentdate);

    const vaultFeedIndex = vaultfeeddata.findIndex(
      (item: PostType) => item.id === postID
    );

    const sectionIndex = vaultpostdata.findIndex(
      (item: PostHeaderType) => item.header.title === headerTitle
    );

    if (vaultFeedIndex > -1) {
      if (vaultfeeddata[vaultFeedIndex].header === false) {
        const sectionDataIndex = vaultpostdata[sectionIndex].data.findIndex(
          (item: PostType) => item.id === postID
        );

        const notHeaderUpdate = {
          header: false,
          vaultFeedIndex: vaultFeedIndex,
          sectionIndex: sectionIndex,
          sectionDataIndex: sectionDataIndex,
          postOperation: postOperation,
        };

        dispatch(updatePostPublic(notHeaderUpdate));
      } else if (vaultfeeddata[vaultFeedIndex].header === true) {
        // added the elif in case there's a null or undefined floating around

        const headerUpdate = {
          header: true,
          vaultFeedIndex: vaultFeedIndex,
          sectionIndex: sectionIndex,
          postOperation: postOperation,
        };

        dispatch(updatePostPublic(headerUpdate));
      }
    }
  }
}

export default ChangePostPublic;
