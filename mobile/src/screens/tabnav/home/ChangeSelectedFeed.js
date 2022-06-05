import { setSelectedFeed } from "../../../redux/home/homemain";

const ChangeSelectedFeed = ({ dispatch, selection }) => {
  dispatch(setSelectedFeed(selection));
};

export default ChangeSelectedFeed;
