import { addToVaultFeedData } from "../../../redux/shared/vaultpostdata";
import { PostType } from "../../../global/CommonTypes";
import { AddToFullViewListPropsType } from "./GetVaultData";

const AddToFullviewList = ({
  dispatch,
  item,
  signedurl,
  thumbnailurl,
  header,
}: AddToFullViewListPropsType) => {
  const Post: PostType = {
    id: item.id,
    contenttype: item.contenttype,
    contentkey: item.contentkey,
    publicpost: item.publicpost,
    contentdate: item.contentdate,
    posttext: item.posttext,
    publicpostdate: item.publicpostdate,
    signedurl: signedurl,
    aspectratio: item.aspectratio,
    thumbnailurl: thumbnailurl,
    userid: null,
    header: header,
    gamesID: item.Games === null ? null : item.Games.id,
    coverID: item.Games === null ? null : item.Games.coverID,
    title: item.Games === null ? null : item.Games.title,
  };

  dispatch(addToVaultFeedData(Post));
};

export default AddToFullviewList;
