import { setStoryViewed } from "../../../redux/home/homemain";

const UpdateStoriesViewed = ({ dispatch, targetcognitosub }) => {
  dispatch(setStoryViewed(targetcognitosub));
};

export default UpdateStoriesViewed;
