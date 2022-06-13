import { addToVaultFeedData } from "../../../redux/vault/vaultpostdata";
import { AddToFullViewListPropsType } from "./GetVaultData";

const AddToFullviewList = ({
  dispatch,
  item,
  signedurl,
  thumbnailurl,
  header,
}: AddToFullViewListPropsType) => {
  const Post = {
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
  };

  dispatch(addToVaultFeedData(Post));
};

export default AddToFullviewList;
