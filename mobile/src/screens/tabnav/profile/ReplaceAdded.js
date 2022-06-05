import { batch } from "react-redux";
import {
  replaceAdded,
  clearAdded,
  clearAddedMe,
} from "../../../redux/profile/relationships";

const ReplaceAdded = ({ dispatch, updatedcurrentuser }) => {
  batch(() => {
    dispatch(replaceAdded(updatedcurrentuser));
    dispatch(clearAdded());
    dispatch(clearAddedMe());
  });
};

export default ReplaceAdded;
