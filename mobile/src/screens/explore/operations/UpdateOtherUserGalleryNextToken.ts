import { setOtherUserGalleryNextToken } from "../../../redux/shared/otheruserprofile";

const UpdateOtherUserGalleryNextToken = ({ token, dispatch }) => {
  dispatch(setOtherUserGalleryNextToken(token));
};

export default UpdateOtherUserGalleryNextToken;
