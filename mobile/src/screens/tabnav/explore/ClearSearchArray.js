import { clearSearchResult } from "../../../redux/explore/exploremain";

const ClearSearchArray = ({ dispatch }) => {
  dispatch(clearSearchResult());
};

export default ClearSearchArray;
