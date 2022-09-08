import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { SearchByGamertagQuery } from "../../../API";
import {
  addNextUserSearchResultsArray,
  setUserSearchActive,
  setUserSearchNextToken,
  setUserSearchResultsArray,
} from "../../../redux/explore/exploremain";
import { CorrectNextToken } from "../../../resources/utilities";
import AddUserSearchResult from "./AddUserSearchResult";

const IsUser = ({ cognitosub, targetcognitosub }) => {
  // Tbh this design is atrocious. I wrote this in like March 2022, so I'll let it pass for now. But this whole vertical should be optimized. Leaving for now because it's not worth the time.
  if (cognitosub === targetcognitosub) {
    return "user";
  }
  return false;
};

export interface UserSearchResultType {
  id: string;
  displayname: string;
  gamertag: string;
  cognitosub: string;
  addedmecount: number;
  pfpurl: string;
  relationship: false | "user";
}

async function GetUserSearchResults({
  input,
  category,
  nextToken,
  dispatch,
  cognitosub,
}) {
  if (category === "users") {
    const DynamicFilter = () => {
      if (input.length === 0) {
        const landingfilter = `type: "user"`;
        return landingfilter;
      }
      if (input.length > 0) {
        const dynamicfilter = `type: "user", gamertag: { beginsWith: "${input}"}`;
        return dynamicfilter;
      }
    };

    const result = (await API.graphql(
      graphqlOperation(`
            query SearchByGamertag {
                searchByGamertag (
                    limit: 10,
                    ${CorrectNextToken({ nextToken })}
                    ${DynamicFilter()}
                ) {
                    items {
                        id
                        displayname
                        gamertag
                        cognitosub
                        addedmecount
                        pfp
                    }
                    nextToken
                }
            }
        `)
    )) as GraphQLResult<SearchByGamertagQuery>;

    const userArray = result.data.searchByGamertag.items;
    const nextNextToken = result.data.searchByGamertag.nextToken;

    const searchResults: UserSearchResultType[] = [];

    for await (const item of userArray) {
      const userResult: UserSearchResultType = {
        id: item.id,
        displayname: item.displayname,
        gamertag: item.gamertag,
        cognitosub: item.cognitosub,
        addedmecount: item.addedmecount,
        pfpurl: await Storage.get(item.pfp, { expires: 86400 }),
        relationship: IsUser({ cognitosub, targetcognitosub: item.cognitosub }),
      };
      searchResults.push(userResult);
    }

    if (nextToken === null) {
      // First results
      dispatch(setUserSearchResultsArray(searchResults));
    } else {
      // Get more results
      dispatch(addNextUserSearchResultsArray(searchResults));
    }
    dispatch(setUserSearchNextToken(nextNextToken));
    dispatch(setUserSearchActive(false));
  } else {
    console.log("currently only user search is supported");
  }
}

export default GetUserSearchResults;
