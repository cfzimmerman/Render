import {
  setLandscapeTrue,
  setLandscapeFalse,
} from "../../../redux/general/pageoptions";

const ChangeLandscape = ({ dispatch, set }) => {
  if (set === true) {
    dispatch(setLandscapeTrue());
  } else {
    dispatch(setLandscapeFalse());
  }
};

export default ChangeLandscape;
