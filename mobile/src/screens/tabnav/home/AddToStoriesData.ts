import { addStoriesSectionListObject } from "../../../redux/home/homemain";
import { PostType } from "../../../resources/CommonTypes";

const AddToStoriesData = ({
  dispatch,
  postItem,
  thumbnailurl,
  signedurl,
  displayname,
  previewurl,
  userid,
}) => {
  const newpost: PostType = {
    id: postItem.id,
    cognitosub: postItem.cognitosub,
    contenttype: postItem.contenttype,
    contentkey: postItem.contentkey,
    contentdate: postItem.contentdate,
    aspectratio: postItem.aspectratio,
    posttext: postItem.posttext,
    userid,
    signedurl,
    thumbnailurl,
    displayname,
    gamesID: postItem.Games === null ? null : postItem.Games.id,
    coverID: postItem.Games === null ? null : postItem.Games.coverID,
    title: postItem.Games === null ? null : postItem.Games.title,
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
