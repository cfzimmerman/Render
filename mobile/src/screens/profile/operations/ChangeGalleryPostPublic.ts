import { compareAsc } from "date-fns";
import {
  exciseGalleryPost,
  injectGalleryPost,
} from "../../../redux/profilemain";
import { excisePublicFeedPost } from "../../../redux/shared/homemain";
import { PostType } from "../../../global/CommonTypes";

export interface ChangeGalleryPostPublicType {
  newPost: PostType;
  postIndex: number;
}

// action: "add", "remove"
const ChangeGalleryPostPublic = ({
  gallerydata,
  item,
  action,
  dispatch,
  isodate,
  publicfeeddata,
}) => {
  if (gallerydata != null && gallerydata.length > 0) {
    if (action === "remove") {
      const postIndex = gallerydata.findIndex(
        (element) => element.id === item.id
      );
      if (postIndex > -1) {
        dispatch(exciseGalleryPost(postIndex));
      }
    } else if (action === "add") {
      const postDate = new Date(item.contentdate);
      const postIndex = gallerydata.findIndex(
        (item) => 1 === compareAsc(postDate, new Date(item.contentdate))
      );

      const newPost: PostType = {
        id: item.id,
        contentdate: item.contentdate,
        contenttype: item.contenttype,
        contentkey: item.contentkey,
        aspectratio: item.aspectratio,
        publicpostdate: isodate,
        posttext: item.posttext,
        publicpost: true,
        header: null,
        signedurl: item.signedurl,
        thumbnailurl: item.thumbnailurl,
        gamesID: item.gamesID,
        coverID: item.coverID,
        title: item.title,
      };

      const update = {
        newPost: newPost,
        postIndex: postIndex,
      };

      dispatch(injectGalleryPost(update));
    }
  }

  if (action === "remove" && publicfeeddata.length > 0) {
    // Add actions can be covered by public feed refresh (added feed post public updates are irrelevant to current user changes)
    const targetPostIndex = publicfeeddata.findIndex(
      (element: PostType) => element.id === item.id
    );

    if (targetPostIndex > -1) {
      // Cut out publicfeeddata post
      dispatch(excisePublicFeedPost(targetPostIndex));
    }
  }
};

export default ChangeGalleryPostPublic;
