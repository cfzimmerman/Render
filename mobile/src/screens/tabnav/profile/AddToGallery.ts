import { addToGalleryData } from "../../../redux/profile/profilemain";
import { PostType } from "../../../resources/CommonTypes";

const AddToGallery = ({ dispatch, item, signedurl, thumbnailurl, userID }) => {
  const Post: PostType = {
    id: item.id,
    contentdate: item.contentdate,
    contenttype: item.contenttype,
    contentkey: item.contentkey,
    aspectratio: item.aspectratio,
    publicpostdate: item.publicpostdate,
    posttext: item.posttext,
    publicpost: true,
    userid: userID,
    signedurl,
    thumbnailurl,
    gamesID: item.Games === null ? null : item.Games.id,
    coverID: item.Games === null ? null : item.Games.coverID,
  };

  dispatch(addToGalleryData(Post));
};

export default AddToGallery;
