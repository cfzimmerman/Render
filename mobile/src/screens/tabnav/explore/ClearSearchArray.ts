import { clearUserSearchResult } from "../../../redux/explore/exploremain";

const ClearSearchArray = ({ dispatch }) => {
  dispatch(clearUserSearchResult());
};

export default ClearSearchArray;
