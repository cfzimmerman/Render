interface InputTypes {
  nextToken: string | null;
  items: any[];
  resultsLimit: number;
}

const GetSearchableNextToken = ({
  nextToken,
  items,
  resultsLimit,
}: InputTypes) => {
  // Sometimes OpenSearch returns a non-null nextToken, even when we've clearly found all results
  if (nextToken === null || items.length < resultsLimit) {
    return null;
  }
  return nextToken;
};

export default GetSearchableNextToken;
