import { addToOtherUserGalleryData } from "../../../redux/shared/otheruserprofile";
import { PostType } from "../../../global/CommonTypes";

const AddToOtherUserGallery = ({ dispatch, item, signedurl, thumbnailurl }) => {
  const post: PostType = {
    id: item.id,
    contenttype: item.contenttype,
    cognitosub: item.cognitosub,
    contentkey: item.contentkey,
    aspectratio: item.aspectratio,
    publicpostdate: item.publicpostdate,
    posttext: item.posttext,
    displayname: item.Users.displayname,
    signedurl,
    thumbnailurl,
    gamesID: item.Games === null ? null : item.Games.id,
    coverID: item.Games === null ? null : item.Games.coverID,
    title: item.Games === null ? null : item.Games.title,
  };

  dispatch(addToOtherUserGalleryData(post));
};

export default AddToOtherUserGallery;
