import { setActivePost } from "../../../redux/vault/vaultpostdata";

async function ChangeActivePost({ dispatch, index }) {
  dispatch(setActivePost(index));
}

export default ChangeActivePost;
