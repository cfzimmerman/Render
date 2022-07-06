import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import {
  ListUserRelationshipsQuery,
  ListUsersQuery,
  RelationshipsBySenderDateQuery,
} from "./API";
import { updateUserRelationships } from "./graphql/mutations";
import {
  listUserRelationships,
  listUsers,
  relationshipsBySenderDate,
} from "./graphql/queries";

// Run once to backfill user relationships

async function TemporaryRelationalShenanigans({ currentuser }) {
  try {
    // Script to get all users

    const {
      data: {
        listUsers: { items: userArray },
      },
    } = (await API.graphql(
      graphqlOperation(listUsers)
    )) as GraphQLResult<ListUsersQuery>;

    /*
    // Script to get all relationships
    
    const {
      data: {
        listUserRelationships: { items: relationshipsArray },
      },
    } = (await API.graphql(
      graphqlOperation(listUserRelationships)
    )) as GraphQLResult<ListUserRelationshipsQuery>;
    */

    userArray.forEach((item) => {
      async function GetRelationships({ item }) {
        const {
          data: {
            relationshipsBySenderDate: { items: relationshipsBySenderArray },
          },
        } = (await API.graphql(
          graphqlOperation(relationshipsBySenderDate, {
            sendercognitosub: item.cognitosub,
          })
        )) as GraphQLResult<RelationshipsBySenderDateQuery>;

        relationshipsBySenderArray.forEach((element) => {
          async function UpdateRelationships({ element, item }) {
            const relationshipUpdate = {
              id: element.id,
              senderID: item.id,
              receiverID: element.usersID,
            };

            const updatedRelationship = await API.graphql(
              graphqlOperation(updateUserRelationships, {
                input: relationshipUpdate,
              })
            );
            console.log(
              "\nupdatedRelationship: " + JSON.stringify(updatedRelationship)
            );
          }
          UpdateRelationships({ element, item });
        });
      }

      GetRelationships({ item });
    });
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default TemporaryRelationalShenanigans;
