import { setGalleryNextToken } from "../../../redux/profilemain";

const UpdateGalleryNextToken = ({ nextToken, dispatch }) => {
  dispatch(setGalleryNextToken(nextToken));
};

export default UpdateGalleryNextToken;
