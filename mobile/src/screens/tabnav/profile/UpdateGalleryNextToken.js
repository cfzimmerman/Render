import { setGalleryNextToken } from "../../../redux/profile/profilemain";

const UpdateGalleryNextToken = ({ token, dispatch }) => {
  dispatch(setGalleryNextToken(token));
};

export default UpdateGalleryNextToken;
