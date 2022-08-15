import { addToOtherUserGalleryData } from "../../../redux/explore/otheruserprofile";
import { PostType } from "../../../resources/CommonTypes";

const AddToOtherUserGallery = ({ dispatch, item, signedurl, thumbnailurl }) => {
  const Post: PostType = {
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
  };

  dispatch(addToOtherUserGalleryData(Post));
};

export default AddToOtherUserGallery;
