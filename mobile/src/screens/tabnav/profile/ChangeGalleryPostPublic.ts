import { compareAsc } from "date-fns";
import {
  exciseGalleryPost,
  injectGalleryPost,
} from "../../../redux/profile/profilemain";
import { PostType } from "../../../resources/CommonTypes";

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
        signedurl: item.signedurl,
        thumbnailurl: item.thumbnailurl,
      };

      const update = {
        newPost: newPost,
        postIndex: postIndex,
      };

      dispatch(injectGalleryPost(update));
    }
  }
};

export default ChangeGalleryPostPublic;
