import { DispatchType } from "../../../redux/store";
import { TextButton } from "../../../resources/atoms";
import GetSearchResults from "./GetSearchResults";

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
          GetSearchResults({
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

/*


  if (listData === null || listData.length === 0 || searchMode === "library") {
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
          GetMore({ searchMode, title, dispatch, nextToken, currentUserID })
        }
      />
    );
  }

*/
