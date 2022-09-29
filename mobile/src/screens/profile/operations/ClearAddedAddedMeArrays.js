import { clearAddedMe, clearAdded } from "../../../redux/shared/relationships";

const ClearAddedAddedMeArrays = ({ target, dispatch }) => {
  if (target === "AddedMe") {
    dispatch(clearAddedMe());
  } else if (target === "Added") {
    dispatch(clearAdded());
  }
};

export default ClearAddedAddedMeArrays;
