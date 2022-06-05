import { addStoriesSectionListObject } from "../../../redux/home/homemain";

const AddToStoriesData = ({
  dispatch,
  postItem,
  thumbnailurl,
  signedurl,
  displayname,
  previewurl,
}) => {
  const newpost = {
    id: postItem.id,
    cognitosub: postItem.cognitosub,
    contenttype: postItem.contenttype,
    contentkey: postItem.contentkey,
    contentdate: postItem.contentdate,
    aspectratio: postItem.aspectratio,
    posttext: postItem.posttext,
    signedurl,
    thumbnailurl,
    displayname,
  };

  const newsection = {
    displayname,
    cognitosub: postItem.cognitosub,
    previewurl,
    viewed: false,
    firstpostid: postItem.id,
  };

  const object = {
    newpost,
    newsection,
  };

  dispatch(addStoriesSectionListObject(object));
};

export default AddToStoriesData;

/*

const Post = {
    id: item.id,
    contenttype: item.contenttype,
    contentkey: item.contentkey,
    publicpost: item.publicpost,
    contentdate: item.contentdate,
    signedurl: signedurl,
    aspectratio: item.aspectratio,
    thumbnailurl: thumbnailurl,
}

dispatch(addToVaultFeedData(Post))

*/
