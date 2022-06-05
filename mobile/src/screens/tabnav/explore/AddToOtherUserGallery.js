import { addToOtherUserGalleryData } from "../../../redux/explore/otheruserprofile";

const AddToOtherUserGallery = ({
  dispatch, item, signedurl, thumbnailurl,
}) => {
  const Post = {
    id: item.id,
    contenttype: item.contenttype,
    cognitosub: item.cognitosub,
    contentkey: item.contentkey,
    aspectratio: item.aspectratio,
    publicpostdate: item.publicpostdate,
    signedurl,
    thumbnailurl,
  };

  dispatch(addToOtherUserGalleryData(Post));
};

export default AddToOtherUserGallery;
