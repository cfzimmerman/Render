import {
  setOptionsActive,
  setOptionsInactive,
} from "../../../redux/vault/vaultpostdata";

const SetOptions = ({
  shouldshowoptions, optionstatus, dispatch, postid,
}) => {
  if (shouldshowoptions === false && optionstatus.active === false) {

  } else if (shouldshowoptions === false && optionstatus.active === true) {
    dispatch(setOptionsInactive());
  } else if (shouldshowoptions === true && optionstatus.active === false) {
    dispatch(setOptionsActive(postid));
  } else if (shouldshowoptions === true && optionstatus.active === true) {
    // User tapped screen while options were active
    dispatch(setOptionsInactive());
  }
};

export default SetOptions;
