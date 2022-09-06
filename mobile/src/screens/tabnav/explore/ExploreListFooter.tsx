import { DispatchType } from "../../../redux/store";
import GetUserSearchResults from "./GetUserSearchResults";
import { TextButton } from "../../../resources/atoms";
import { ExploreSearchCategory } from "./ExploreLanding";
import PGSearchTitles from "./PGSearchTitles";

interface InputTypes {
  input: string;
  searchResultsLength: number;
  category: ExploreSearchCategory;
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
  const GetMoreResults = () => {
    if (category === "users") {
      GetUserSearchResults({
        input,
        category: "users",
        nextToken,
        dispatch,
        cognitosub,
      });
    } else if (category === "games") {
      PGSearchTitles({ input, dispatch, nextToken });
    }
  };
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
        Action={GetMoreResults}
      />
    );
  }
};

export default ExploreListFooter;
