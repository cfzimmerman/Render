import { addToPublicFeed } from "../../../redux/shared/homemain";
import { PostType } from "../../../global/CommonTypes";

const AddToPublicFeed = ({ dispatch, item, signedurl, thumbnailurl }) => {
  const post: PostType = {
    id: item.id,
    contenttype: item.contenttype,
    aspectratio: item.aspectratio,
    contentkey: item.contentkey,
    cognitosub: item.cognitosub,
    thumbnailkey: item.thumbnailkey,
    publicpostdate: item.publicpostdate,
    posttext: item.posttext,
    signedurl,
    thumbnailurl,
    userid: item.Users.id,
    displayname: item.Users.displayname,
    userpfp: item.Users.pfp,
    userpfpurl: null,
    gamesID: item.Games === null ? null : item.Games.id,
    coverID: item.Games === null ? null : item.Games.coverID,
    title: item.Games === null ? null : item.Games.title,
  };

  dispatch(addToPublicFeed(post));
};

export default AddToPublicFeed;
