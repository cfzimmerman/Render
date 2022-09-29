import { setActivePost } from "../../../redux/shared/vaultpostdata";

async function ChangeActivePost({ dispatch, index }) {
  dispatch(setActivePost(index));
}

export default ChangeActivePost;
