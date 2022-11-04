import { setSelectedFeed } from "../../../redux/shared/homemain";

const ChangeSelectedFeed = ({ dispatch, selection }) => {
  dispatch(setSelectedFeed(selection));
};

export default ChangeSelectedFeed;
