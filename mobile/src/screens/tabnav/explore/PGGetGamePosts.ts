import { DispatchType } from "../../../redux/store";

interface InputTypes {
  gameID: string;
  nextToken: string | null;
  dispatch: DispatchType;
}

async function PGGetGamePosts({ gameID, nextToken, dispatch }: InputTypes) {
  try {
  } catch (error) {
    console.log(error);
  }
}

export default PGGetGamePosts;
