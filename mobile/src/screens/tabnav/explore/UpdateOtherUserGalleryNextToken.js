import { setOtherUserGalleryNextToken } from "../../../redux/explore/otheruserprofile";

const UpdateOtherUserGalleryNextToken = ({ token, dispatch }) => {
  dispatch(setOtherUserGalleryNextToken(token));
};

export default UpdateOtherUserGalleryNextToken;
