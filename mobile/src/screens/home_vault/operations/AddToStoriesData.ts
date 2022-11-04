import { addStoriesSectionListObject } from "../../../redux/shared/homemain";
import { PostType } from "../../../global/CommonTypes";

export interface StoriesSectionListItemType {
  displayname: string;
  cognitosub: string;
  previewurl: string;
  viewed: boolean;
  firstpostid: string;
}

export interface UpdateStoriesDataType {
  newPost: PostType;
  newSection: StoriesSectionListItemType;
}

const AddToStoriesData = ({
  dispatch,
  postItem,
  thumbnailurl,
  signedurl,
  displayname,
  previewurl,
  userid,
}) => {
  const newPost: PostType = {
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

  const newSection = {
    displayname,
    cognitosub: postItem.cognitosub,
    previewurl,
    viewed: false,
    firstpostid: postItem.id,
  };

  const object: UpdateStoriesDataType = {
    newPost,
    newSection,
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
