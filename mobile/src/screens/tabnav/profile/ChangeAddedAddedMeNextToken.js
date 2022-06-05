import {
  setAddedMeNextToken,
  setAddedNextToken,
} from "../../../redux/profile/relationships";

// Supports 'added' and 'addedme'
const ChangeAddedAddedMeNextToken = ({ dispatch, origin, token }) => {
  if (origin === "added") {
    dispatch(setAddedNextToken(token));
  } else if (origin === "addedme") {
    dispatch(setAddedMeNextToken(token));
  }
};

export default ChangeAddedAddedMeNextToken;
