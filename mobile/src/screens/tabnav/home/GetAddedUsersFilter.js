import { API, graphqlOperation } from "aws-amplify";
import AddToAddedUsersFilter from "./AddToAddedUsersFilter";
import { setGotAddedUsersFilter } from "../../../redux/home/homemain";

async function GetAddedUsersFilter({ dispatch, currentuser }) {
  const searchLimitBuffer = 2;

  searchlimit = currentuser.addedcount + searchLimitBuffer;

  const userResult = await API.graphql(
    graphqlOperation(`
        query AddedUsersByCurrentUser {
            addedUsersByCurrentUser (
                sendercognitosub: "${currentuser.cognitosub}"
                limit: ${searchlimit},
            ) {
                items {
                    Users {
                        id
                    }
                }
            }
        }
    `)
  );

  const userArray = userResult.data.addedUsersByCurrentUser.items;

  if (userArray.length === 0) {
    dispatch(setGotAddedUsersFilter(true));
  } else {
    userArray.forEach((item) => {
      const filterObject = {
        usersID: {
          eq: item.Users.id,
        },
      };

      AddToAddedUsersFilter({ dispatch, filterObject });

      if (
        typeof userArray[searchlimit - 1 - searchLimitBuffer] === "undefined" ||
        item.Users.id ===
          userArray[searchlimit - 1 - searchLimitBuffer].Users.id
      ) {
        dispatch(setGotAddedUsersFilter(true));
      }
    });
  }
}

export default GetAddedUsersFilter;
