import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { SearchableGamesFilterInput, SearchGamesQuery } from "../../../../API";

async function SearchGameTitle({ title }) {
  console.log(title);
  try {
    const result = (await API.graphql(
      graphqlOperation(`
        query SearchGames {
            searchGames (
                limit: 10,
                sort: { direction: desc, field: releaseDate },
                filter: {
                  title: {
                    wildcard: "*${title}*"
                  }
                }

            ) {
                items {
                    id
                    title
                    coverID
                    backgroundID
                }
            }
        }
    `)
    )) as GraphQLResult<SearchGamesQuery>;

    console.log(result.data.searchGames.items);
  } catch (error) {
    console.log(error);
  }
}

export default SearchGameTitle;

/*

    const result = (await API.graphql(
      graphqlOperation(`
        query CheckAddedUser {
          checkAddedUser (
              limit: 1,
              senderID: "${currentuser.id}",
              receiverID: {
                eq: "${targetID}"
              }
          ) {
              items {
                  id
              }
          }
        }
    `)
    )) as GraphQLResult<CheckAddedUserQuery>;

*/
