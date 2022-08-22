import { API, graphqlOperation } from "aws-amplify";
import {
  addToAddedUsersFilter,
  setGotAddedUsersFilter,
} from "../../../redux/home/homemain";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { AddedByCurrentUserQuery } from "../../../API";

export interface AddedUsersFilterItem {
  usersID: {
    eq: string;
  };
}

async function GetAddedUsersFilter({ dispatch, currentuser }) {
  // Note, lots of @ts-ignore on this page. That's because Amplify's generated models don't include relations. In this case, it doesn't expect ReceiverUser or any of its fields
  const searchLimitBuffer = 2;

  const searchlimit = currentuser.addedcount + searchLimitBuffer;

  const userResult = (await API.graphql(
    graphqlOperation(`
        query AddedByCurrentUser {
          addedByCurrentUser (
                senderID: "${currentuser.id}"
                limit: ${searchlimit},
            ) {
                items {
                  ReceiverUser {
                        id
                    }
                }
            }
        }
    `)
  )) as GraphQLResult<AddedByCurrentUserQuery>;

  const userArray = userResult.data.addedByCurrentUser.items;

  if (userArray.length === 0) {
    dispatch(setGotAddedUsersFilter(true));
  } else {
    userArray.forEach((item) => {
      // @ts-ignore
      if (item.ReceiverUser != null) {
        const filterObject: AddedUsersFilterItem = {
          usersID: {
            // @ts-ignore
            eq: item.ReceiverUser.id,
          },
        };
        dispatch(addToAddedUsersFilter(filterObject));
      }

      if (
        typeof userArray[searchlimit - 1 - searchLimitBuffer] === "undefined" ||
        // @ts-ignore
        item.ReceiverUser.id ===
          // @ts-ignore
          userArray[searchlimit - 1 - searchLimitBuffer].ReceiverUser.id
      ) {
        dispatch(setGotAddedUsersFilter(true));
      }
    });
  }
}

export default GetAddedUsersFilter;
