import { addToAddedFeed } from "../../../redux/home/homemain";

const AddToAddedFeed = ({ dispatch, item, signedurl, thumbnailurl }) => {
  const post = {
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
  };

  dispatch(addToAddedFeed(post));
};

export default AddToAddedFeed;
