import { setVaultHeader } from "../../../redux/home/homemain";

const AddVaultPreviewData = ({ dispatch, post, signedurl }) => {
  const item = {
    cognitosub: post.cognitosub,
    contentdate: post.contentdate,
    signedurl,
  };

  dispatch(setVaultHeader(item));
};

export default AddVaultPreviewData;
