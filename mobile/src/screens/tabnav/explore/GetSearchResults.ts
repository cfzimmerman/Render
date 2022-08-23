import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { SearchByGamertagQuery } from "../../../API";
import AddUserSearchResult from "./AddUserSearchResult";

const IsUser = ({ cognitosub, targetcognitosub }) => {
  if (cognitosub === targetcognitosub) {
    return "user";
  }
  return false;
};

async function GetSearchResults({
  input,
  category,
  fetchmore,
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
                    nextToken: ${nextToken},
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
                }
            }
        `)
    )) as GraphQLResult<SearchByGamertagQuery>;

    const userarray = result.data.searchByGamertag.items;

    userarray.forEach((item) => {
      const userresult = IsUser({
        cognitosub,
        targetcognitosub: item.cognitosub,
      });
      async function GetOtherUserPfp() {
        const pfpurl = await Storage.get(item.pfp, { expires: 86400 });
        AddUserSearchResult({
          dispatch,
          pfpurl,
          item,
          relationship: userresult,
        });
      }

      GetOtherUserPfp();
    });
  } else {
    console.log("currently only user search is supported");
  }
}

export default GetSearchResults;
