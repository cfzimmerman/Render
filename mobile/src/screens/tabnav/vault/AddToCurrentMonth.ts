import { addToLastVaultPostDataArray } from "../../../redux/vault/vaultpostdata";
import { PostType } from "../../../resources/CommonTypes";
import { AddToCurrentMonthPropsType } from "./GetVaultData";

const AddToCurrentMonth = ({
  dispatch,
  item,
  signedurl,
  thumbnailurl,
}: AddToCurrentMonthPropsType) => {
  const Post: PostType = {
    id: item.id,
    contenttype: item.contenttype,
    contentkey: item.contentkey,
    publicpost: item.publicpost,
    contentdate: item.contentdate,
    signedurl: signedurl,
    publicpostdate: item.publicpostdate,
    aspectratio: item.aspectratio,
    posttext: item.posttext,
    userid: null,
    thumbnailurl: thumbnailurl,
    gamesID: item.Games === null ? null : item.Games.id,
    coverID: item.Games === null ? null : item.Games.coverID,
    title: item.Games === null ? null : item.Games.title,
  };

  dispatch(addToLastVaultPostDataArray(Post));
};

export default AddToCurrentMonth;
