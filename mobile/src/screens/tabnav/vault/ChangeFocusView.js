import {
  setFocusViewTrue,
  setFocusViewFalse,
} from "../../../redux/vault/vaultpostdata";

const ChangeFocusView = ({ dispatch, set }) => {
  if (set === true) {
    dispatch(setFocusViewTrue());
  } else {
    dispatch(setFocusViewFalse());
  }
};

export default ChangeFocusView;
