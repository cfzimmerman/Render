import { Storage, API, graphqlOperation } from "aws-amplify";
import AddToAddedMeUsers from "./AddToAddedMeUsers";
import ChangeAddedAddedMeNextToken from "./ChangeAddedAddedMeNextToken";

const GetRelationship = ({ relationshiparray }) => {
  if (relationshiparray.length === 0) {
    return false;
  } if (relationshiparray.length > 0) {
    return true;
  }
};

async function GetAddedMeUsers({
  addedmenexttoken,
  dispatch,
  cognitosub,
  addedmeusers,
}) {
  if (addedmeusers.length > 0 && addedmenexttoken === null) {

  } else {
    const querylimit = 20;

    const result = await API.graphql(
      graphqlOperation(`
            query RelationshipsByReceiverDate {
                relationshipsByReceiverDate (
                    receivercognitosub: "${cognitosub}"
                    limit: ${querylimit},
                    sortDirection: DESC,
                    nextToken: ${addedmenexttoken}
                ) {
                    items {
                        id
                        sendercognitosub
                    }
                    nextToken
                }
            }
        `),
    );

    const addedmeuserarray = result.data.relationshipsByReceiverDate.items;
    const token = result.data.relationshipsByReceiverDate.nextToken;

    if (addedmeuserarray.length > 0) {
      addedmeuserarray.forEach((item) => {
        async function GetUser({ targetcognitosub, dispatch }) {
          const [userresult, relationshipresult] = await Promise.all([
            API.graphql(
              graphqlOperation(`
                            query UserByCognitosub {
                                userByCognitosub (
                                    cognitosub: "${targetcognitosub}"
                                    limit: 1,
                                ) {
                                    items {
                                        id
                                        cognitosub
                                        displayname
                                        gamertag
                                        pfp
                                        addedmecount
                                    }
                                }
                            }
                        `),
            ),

            API.graphql(
              graphqlOperation(`
                            query VerifyAddedUser {
                                verifyAddedUser (
                                    limit: 1,
                                    sendercognitosub: "${cognitosub}",
                                    receivercognitosub: { 
                                        eq: "${targetcognitosub}"
                                    }
                                ) {
                                    items {
                                        id
                                    }
                                }
                            }
                        `),
            ),
          ]);

          const userarray = userresult.data.userByCognitosub.items;
          const relationshiparray = relationshipresult.data.verifyAddedUser.items;

          const pfpurl = await Storage.get(userarray[0].pfp, {
            expires: 86400,
          });
          const relationship = GetRelationship({ relationshiparray });

          AddToAddedMeUsers({
            dispatch,
            user: userarray[0],
            pfpurl,
            relationship,
          });
        }

        GetUser({
          targetcognitosub: item.sendercognitosub,
          dispatch,
        });

        if (
          typeof addedmeuserarray[querylimit - 1] === "undefined"
          || item.id === addedmeuserarray[querylimit - 1].id
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

export default GetAddedMeUsers;
