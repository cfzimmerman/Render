import { addToLastVaultPostDataArray } from "../../../redux/vault/vaultpostdata";
import { AddToCurrentMonthPropsType } from "./GetVaultData";

const AddToCurrentMonth = ({
  dispatch,
  item,
  signedurl,
  thumbnailurl,
}: AddToCurrentMonthPropsType) => {
  const Post = {
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
  };

  dispatch(addToLastVaultPostDataArray(Post));
};

export default AddToCurrentMonth;
