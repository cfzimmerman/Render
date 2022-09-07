import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { SearchGamesQuery } from "../../../../API";
import { CorrectNextToken } from "../../../../resources/utilities";

interface InputTypes {
  title: string;
  resultsLimit: number;
  origin: "SearchGameTitle" | "PGSearchTitles";
  nextToken: string | null;
}

async function GetGameTitleSearchResults({
  title,
  resultsLimit,
  origin,
  nextToken,
}: InputTypes): Promise<GraphQLResult<SearchGamesQuery>> {
  const CorrectSort = () => {
    if (origin === "SearchGameTitle") {
      return `sort: { direction: desc, field: updatedAt },`;
    } else if (origin === "PGSearchTitles") {
      return `sort: { direction: desc, field: numUserGames },`;
    }
  };

  const CorrectFilter = () => {
    if (origin === "SearchGameTitle") {
      return ``;
    } else if (origin === "PGSearchTitles") {
      return `
        numUserGames: {
          gt: 0
        }
      `;
    }
  };

  if (title.includes(" ")) {
    // Performs poorly on individual words but crushes it when spaces are involved
    const result = (await API.graphql(
      graphqlOperation(`
          query SearchGames {
              searchGames (
                  limit: ${resultsLimit},
                  ${CorrectNextToken({ nextToken })}
                  ${CorrectSort()}
                  filter: {
                    title: {
                      matchPhrase: "${title}"
                    },
                    ${CorrectFilter()}
                  }
              ) {
                  items {
                      id
                      title
                      coverID
                      backgroundID
                  }
                  nextToken
              }
          }
      `)
    )) as GraphQLResult<SearchGamesQuery>;
    return result;
  } else {
    // wildcard - functions perfectly when no spaces are involved
    const result = (await API.graphql(
      graphqlOperation(`
          query SearchGames {
              searchGames (
                  limit: ${resultsLimit},
                  ${CorrectNextToken({ nextToken })}
                  ${CorrectSort()}
                  filter: {
                    title: {
                      wildcard: "*${title}*"
                    },
                    ${CorrectFilter()}
                  }
              ) {
                  items {
                      id
                      title
                      coverID
                      backgroundID
                  }
                  nextToken
              }
          }
      `)
    )) as GraphQLResult<SearchGamesQuery>;
    return result;
  }
}

export default GetGameTitleSearchResults;
