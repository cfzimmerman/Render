import { compareAsc, format } from "date-fns";
import { batch } from "react-redux";

import {
  injectNewHeaderPost,
  injectNewTrailingPost,
  injectNewSection,
  addVaultPostDataObject,
  addToVaultFeedData,
} from "../../../redux/vault/vaultpostdata";
import { GetDate } from "../../../resources/utilities";
import { PostHeaderType, PostType } from "../../../resources/CommonTypes";
import { InjectPostIntoFeedPropsType } from "./ModifyVaultData";
import { Storage } from "aws-amplify";

export interface InjectNewHeaderPostPropsType {
  sectionIndex: number;
  feedIndex: number;
  newHeaderPost: PostType;
  oldHeaderPost: PostType;
}

export interface InjectNewTrailingPostPropsType {
  sectionIndex: number;
  feedIndex: number;
  sectionDataIndex: number;
  newPost: PostType;
}

export interface InjectNewSectionPropsType {
  newSection: PostHeaderType;
  feedIndex: number;
  sectionPlacement: number;
  newPost: PostType;
}

async function InjectPostIntoFeed({
  vaultpostdata,
  vaultfeeddata,
  sectionIndex,
  index,
  postDate,
  postSimpleDate,
  post,
  dispatch,
  newPostID,
}: InjectPostIntoFeedPropsType) {
  interface PrepVaultDataWorkersPropsType {
    pathway: string;
    isNewPostHeader: boolean;
    signedurl: string;
    thumbnailurl: string;
    sectionPlacement?: number;
  }

  async function PrepVaultDataWorkers({
    pathway,
    isNewPostHeader,
    signedurl,
    thumbnailurl,
    sectionPlacement,
  }: PrepVaultDataWorkersPropsType) {
    const newPost: PostType = {
      id: newPostID,
      contenttype: post.contenttype,
      contentkey: post.contentkey,
      thumbnailkey: post.thumbnailkey,
      publicpost: post.publicpost,
      publicpostdate: post.publicpostdate,
      contentdate: post.contentdate,
      aspectratio: post.aspectratio,
      posttext: post.posttext,
      header: isNewPostHeader,
      signedurl: signedurl,
      thumbnailurl: thumbnailurl,
      gamesID: post.gamesID,
      coverID: post.coverID,
      title: post.title,
    };

    const newSection: PostHeaderType = {
      header: {
        title: postSimpleDate,
        post: newPost,
      },
      data: [],
    };

    if (pathway === "injectnewheaderpost") {
      // New post should replace a current section header

      const newHeaderPost: PostType = newPost;
      const oldHeaderPost: PostType = vaultpostdata[sectionIndex].header.post;

      const update = {
        sectionIndex: sectionIndex,
        feedIndex: index,
        newHeaderPost: newHeaderPost,
        oldHeaderPost: oldHeaderPost,
      };

      // console.log('InjectNewHeaderPost')
      dispatch(injectNewHeaderPost(update));
    } else if (pathway === "injectnewtrailingpost") {
      // New post should be added under an existing month header

      const sectionDataIndex = vaultpostdata[sectionIndex].data.findIndex(
        (element) => 1 === compareAsc(postDate, new Date(element.contentdate))
      );
      const update = {
        sectionIndex: sectionIndex,
        feedIndex: index,
        sectionDataIndex: sectionDataIndex,
        newPost: newPost,
      };

      // console.log('InjectNewTrailingPost')
      dispatch(injectNewTrailingPost(update));
    } else if (pathway === "injectnewsection") {
      // New section somewhere in the current section list
      const update = {
        newSection: newSection,
        feedIndex: index,
        sectionPlacement: sectionPlacement,
        newPost: newPost,
      };

      // console.log("InjectNewSection")
      dispatch(injectNewSection(update));
    } else if (pathway === "pushnewsection") {
      // Add new section / post to end of both vault data arrays

      // console.log("AddNewSection");

      batch(() => {
        dispatch(addVaultPostDataObject(newSection));
        dispatch(addToVaultFeedData(newPost));
      });
    }
  }

  // Index greater than -1 means that a section exists with that title (Ex. "April 2022")
  if (sectionIndex > -1) {
    if (
      typeof vaultfeeddata[index - 1] === "undefined" ||
      (vaultfeeddata[index].header === true &&
        GetDate(new Date(vaultfeeddata[index].contentdate)) ===
          GetDate(new Date(post.contentdate)))
    ) {
      // New post should replace a current section header

      if (post.contenttype === "video") {
        const signedurl = null;
        const thumbnailurl = await Storage.get(post.thumbnailkey, {
          expires: 86400,
        });

        PrepVaultDataWorkers({
          pathway: "injectnewheaderpost",
          isNewPostHeader: true,
          signedurl,
          thumbnailurl,
        });
      } else if (post.contenttype === "image") {
        const signedurl = await Storage.get(post.contentkey, {
          expires: 86400,
        });
        const thumbnailurl = null;

        PrepVaultDataWorkers({
          pathway: "injectnewheaderpost",
          isNewPostHeader: true,
          signedurl,
          thumbnailurl,
        });
      }
    } else {
      // New post should be added under an existing month header

      if (post.contenttype === "video") {
        const signedurl = null;
        const thumbnailurl = await Storage.get(post.thumbnailkey, {
          expires: 86400,
        });

        PrepVaultDataWorkers({
          pathway: "injectnewtrailingpost",
          isNewPostHeader: false,
          signedurl,
          thumbnailurl,
        });
      } else if (post.contenttype === "image") {
        const signedurl = await Storage.get(post.contentkey, {
          expires: 86400,
        });
        const thumbnailurl = null;

        PrepVaultDataWorkers({
          pathway: "injectnewtrailingpost",
          isNewPostHeader: false,
          signedurl,
          thumbnailurl,
        });
      }
    }
  } else {
    // New section

    const sectionPlacement = vaultpostdata.findIndex(
      (element) =>
        1 === compareAsc(postDate, new Date(element.header.post.contentdate))
    );

    if (sectionPlacement > -1) {
      // Add new section between currently fetched sections

      if (post.contenttype === "video") {
        const signedurl = null;
        const thumbnailurl = await Storage.get(post.thumbnailkey, {
          expires: 86400,
        });

        PrepVaultDataWorkers({
          pathway: "injectnewsection",
          isNewPostHeader: true,
          signedurl,
          thumbnailurl,
          sectionPlacement,
        });
      } else if (post.contenttype === "image") {
        const signedurl = await Storage.get(post.contentkey, {
          expires: 86400,
        });
        const thumbnailurl = null;

        PrepVaultDataWorkers({
          pathway: "injectnewsection",
          isNewPostHeader: true,
          signedurl,
          thumbnailurl,
          sectionPlacement,
        });
      }
    } else {
      // Add new section to end of both vault data arrays

      if (post.contenttype === "video") {
        const signedurl = null;
        const thumbnailurl = await Storage.get(post.thumbnailkey, {
          expires: 86400,
        });

        PrepVaultDataWorkers({
          pathway: "pushnewsection",
          isNewPostHeader: true,
          signedurl,
          thumbnailurl,
        });
      } else if (post.contenttype === "image") {
        const signedurl = await Storage.get(post.contentkey, {
          expires: 86400,
        });
        const thumbnailurl = null;

        PrepVaultDataWorkers({
          pathway: "pushnewsection",
          isNewPostHeader: true,
          signedurl,
          thumbnailurl,
        });
      }
    }
  }
}

export default InjectPostIntoFeed;
