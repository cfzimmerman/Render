import { compareAsc, format } from "date-fns";
import { DispatchType } from "../../../redux";

import {
  exciseHeaderPost,
  exciseSection,
  exciseTrailingPost,
  setVaultRefreshDate,
} from "../../../redux/shared/vaultpostdata";
import { PostHeaderType, PostType } from "../../../global/CommonTypes";
import { GetDate } from "../../../resources/utilities";

import InjectPostIntoFeed from "./InjectPostIntoFeed";

interface ModifyVaultData {
  action: "add" | "remove";
  dispatch: DispatchType;
  vaultpostdata: PostHeaderType[];
  vaultfeeddata: PostType[];
  post: PostType;
  vaultnexttoken: string | null;
  newPostID: string;
}

export interface InjectPostIntoFeedPropsType {
  vaultpostdata: PostHeaderType[];
  vaultfeeddata: PostType[];
  sectionIndex: number;
  index: number;
  postDate: Date;
  postSimpleDate: string;
  post: PostType;
  dispatch: DispatchType;
  newPostID: string;
}

export interface ExciseGeneralPropsType {
  sectionIndex: number;
  sectionDataIndex: number;
  feedIndex: number;
  newSectionHeaderPost?: PostType;
}

const ModifyVaultData = ({
  action,
  dispatch,
  vaultpostdata,
  vaultfeeddata,
  post,
  vaultnexttoken,
  newPostID,
}: ModifyVaultData) => {
  const postDate = new Date(post.contentdate);
  const postSimpleDate = GetDate(postDate);

  dispatch(setVaultRefreshDate(new Date().toISOString()));

  if (action === "add") {
    const index = vaultfeeddata.findIndex(
      (item: PostType) => 1 === compareAsc(postDate, new Date(item.contentdate))
    );

    if (index > -1 || (vaultnexttoken === null && index === -1)) {
      // Index is found or if all data is already fetched (don't want to add to the end if we still have data to fetch in case it messes up the order of further data we add to the Vault arrays)
      // Since we've already checked for a vaultfeeddata.length > 0, vaultnexttoken will only be null if we've fetched everything we can

      const sectionIndex = vaultpostdata.findIndex(
        (section: PostHeaderType) => section.header.title === postSimpleDate
      );
      InjectPostIntoFeed({
        vaultpostdata,
        vaultfeeddata,
        sectionIndex,
        index,
        postDate,
        postSimpleDate,
        post,
        dispatch,
        newPostID,
      });
      return;
    }
  } else if (action === "remove") {
    const sectionIndex = vaultpostdata.findIndex(
      (item: PostHeaderType) => item.header.title === postSimpleDate
    );

    // if sectionDataIndex === -1, the deleted post is the header
    const sectionDataIndex = vaultpostdata[sectionIndex].data.findIndex(
      (item: PostType) => item.id === post.id
    );
    const feedIndex = vaultfeeddata.findIndex(
      (item: PostType) => item.id === post.id
    );

    if (sectionIndex > -1) {
      if (sectionDataIndex > -1) {
        // Cut out and replace month item (not header)
        const update = {
          sectionIndex: sectionIndex,
          sectionDataIndex: sectionDataIndex,
          feedIndex: feedIndex,
        };

        // console.log("ExciseTrailingPost")
        dispatch(exciseTrailingPost(update));
      } else {
        if (vaultpostdata[sectionIndex].data.length === 0) {
          // Delete section
          const update = {
            sectionIndex: sectionIndex,
            sectionDataIndex: sectionDataIndex,
            feedIndex: feedIndex,
          };

          // console.log("ExciseSection")
          dispatch(exciseSection(update));
        } else {
          const update = {
            sectionIndex: sectionIndex,
            sectionDataIndex: sectionDataIndex,
            feedIndex: feedIndex,
            newSectionHeaderPost: vaultpostdata[sectionIndex].data[0],
          };

          // console.log("ExciseHeaderPost")
          dispatch(exciseHeaderPost(update));
        }
      }
    }
  }
};

export default ModifyVaultData;
