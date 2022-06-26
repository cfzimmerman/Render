import { GraphQLResult } from '@aws-amplify/api';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { UserByCognitosubQuery } from '../API';
import { UserInfo } from '../Types/Users';

// @items: newline delimited string of requested fields on user object
// ex: 'id\nemail\nstoragesizeinbytes'
export const getUserByCognitoSub = async (sub: string, items: string) => {
  const userResult: GraphQLResult<UserByCognitosubQuery> = (await API.graphql(
    graphqlOperation(`
              query userByCognitosub {
                userByCognitosub (
                    cognitosub: "${sub}"
                  ) {
                    items {
                        ${items}
                    }
                  }
              }
          `)
  )) as GraphQLResult<UserByCognitosubQuery>;
  const resultArray = userResult.data?.userByCognitosub?.items;
  if (!resultArray || !resultArray.length) {
    return null;
  }
  const validUsers = resultArray.filter((user) => !!user);
  return validUsers[0] ?? null;
};

export const getUserSub = async (): Promise<string> => {
  const info: UserInfo = await Auth.currentUserInfo();
  return info.attributes.sub;
};
