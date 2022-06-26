import { setGalleryNextToken } from "../../../redux/profile/profilemain";

const UpdateGalleryNextToken = ({ nextToken, dispatch }) => {
  dispatch(setGalleryNextToken(nextToken));
};

export default UpdateGalleryNextToken;
