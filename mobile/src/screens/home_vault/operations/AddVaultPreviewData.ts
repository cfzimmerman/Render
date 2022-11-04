// import { setVaultHeader } from "../../../redux/shared/homemain";

const AddVaultPreviewData = ({ dispatch, post, signedurl }) => {
  const item = {
    cognitosub: post.cognitosub,
    contentdate: post.contentdate,
    signedurl,
  };

  // dispatch(setVaultHeader(item));
  console.log("AddVaultPreviewData.ts HAS BEEN DISABLED. Visit it to fix.");
};

export default AddVaultPreviewData;
