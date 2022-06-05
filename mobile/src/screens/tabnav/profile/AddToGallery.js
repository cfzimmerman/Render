import { addToGalleryData } from "../../../redux/profile/profilemain";

const AddToGallery = ({
  dispatch, item, signedurl, thumbnailurl,
}) => {
  const Post = {
    id: item.id,
    contentdate: item.contentdate,
    contenttype: item.contenttype,
    contentkey: item.contentkey,
    aspectratio: item.aspectratio,
    publicpostdate: item.publicpostdate,
    posttext: item.posttext,
    publicpost: true,
    signedurl,
    thumbnailurl,
  };

  dispatch(addToGalleryData(Post));
};

export default AddToGallery;
