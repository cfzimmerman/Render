import { setStoryViewed } from "../../../redux/shared/homemain";

const UpdateStoriesViewed = ({ dispatch, targetcognitosub }) => {
  dispatch(setStoryViewed(targetcognitosub));
};

export default UpdateStoriesViewed;
