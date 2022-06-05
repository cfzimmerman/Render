import { Storage, API, graphqlOperation } from "aws-amplify";
import AddToAddedUsers from "./AddToAddedUsers";
import ChangeAddedAddedMeNextToken from "./ChangeAddedAddedMeNextToken";

import { filteredRelationshipsBySenderDate } from "../../../graphql/customqueries";

async function GetAddedUsers({
  cognitosub,
  dispatch,
  addednexttoken,
  addedusers,
}) {
  if (addedusers.length > 0 && addednexttoken === null) {

  } else {
    const querylimit = 20;

    const result = await API.graphql(
      graphqlOperation(filteredRelationshipsBySenderDate, {
        limit: querylimit,
        sendercognitosub: cognitosub,
        sortDirection: "DESC",
        nextToken: addednexttoken,
      }),
    );

    const addeduserarray = result.data.relationshipsBySenderDate.items;
    const token = result.data.relationshipsBySenderDate.nextToken;

    if (addeduserarray.length > 0) {
      addeduserarray.forEach((item) => {
        async function GetUser({ user, dispatch }) {
          const pfpurl = await Storage.get(user.pfp, { expires: 86400 });
          AddToAddedUsers({ dispatch, user, pfpurl });
        }

        GetUser({ dispatch, user: item.Users });

        if (
          typeof addeduserarray[querylimit - 1] === "undefined"
          || item.id === addeduserarray[querylimit - 1].id
        ) {
          ChangeAddedAddedMeNextToken({
            dispatch,
            origin: "addedme",
            token,
          });
        }
      });
    }
  }
}

export default GetAddedUsers;
