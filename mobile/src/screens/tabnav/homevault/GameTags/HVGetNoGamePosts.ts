import { DispatchType } from "../../../../redux/store";
import { PostType } from "../../../../resources/CommonTypes";

interface InputTypes {
  currentUserID: string;
  dispatch: DispatchType;
  vaultfeeddata: PostType[];
  hvGameSearchNextToken: string | null;
}

async function HVGetNoGamePosts({
  currentUserID,
  dispatch,
  vaultfeeddata,
  hvGameSearchNextToken,
}: InputTypes) {
  try {
  } catch (error) {
    console.log(error);
  }
}

export default HVGetNoGamePosts;
