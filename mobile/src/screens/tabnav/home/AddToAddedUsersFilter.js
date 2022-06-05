import { addToAddedUsersFilter } from "../../../redux/home/homemain";

const AddToAddedUsersFilter = ({ dispatch, filterObject }) => {
  dispatch(addToAddedUsersFilter(filterObject));
};

export default AddToAddedUsersFilter;
