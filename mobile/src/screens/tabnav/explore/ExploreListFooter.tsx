import { DispatchType } from "../../../redux/store";
import GetUserSearchResults from "./GetUserSearchResults";
import { TextButton } from "../../../resources/atoms";

interface InputTypes {
  input: string;
  searchResultsLength: number;
  category: "users";
  nextToken: string | null;
  dispatch: DispatchType;
  cognitosub: string;
}

const ExploreListFooter = ({
  input,
  searchResultsLength,
  category,
  nextToken,
  dispatch,
  cognitosub,
}: InputTypes) => {
  if (searchResultsLength < 3) {
    return <TextButton title={""} disabled={true} Action={() => null} />;
  } else if (nextToken === null) {
    return (
      <TextButton
        title={"All results displayed"}
        disabled={true}
        Action={() => null}
      />
    );
  } else {
    return (
      <TextButton
        title={"Get more results"}
        disabled={false}
        Action={() =>
          GetUserSearchResults({
            input,
            category: "users",
            nextToken,
            dispatch,
            cognitosub,
          })
        }
      />
    );
  }
};

export default ExploreListFooter;
