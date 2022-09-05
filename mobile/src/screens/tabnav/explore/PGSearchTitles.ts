import SearchGameTitle from "../homevault/GameTags/SearchGameTitle";
// ^^^ Take lessons from this
import { DispatchType } from "../../../redux/store";

interface InputTypes {
  input: string;
  dispatch: DispatchType;
}

async function PGSearchTitles({ input, dispatch }: InputTypes) {
  try {
  } catch (error) {
    console.log(error);
  }
}

export default PGSearchTitles;
