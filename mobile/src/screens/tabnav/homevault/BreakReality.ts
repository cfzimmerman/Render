import { API, graphqlOperation } from "aws-amplify";

async function BreakReality() {
  const userID = "67caff7a-841a-45c6-9902-85813297e59b";
  try {
    const value = await API.graphql(
      graphqlOperation(`
    query GetUser {
        getUsers (
            id: "${userID}" 
        ) {
            id
            Notifications {
                query byUsers {
                    byUsers (
                        sortDirection: DESC
                    ) {
                        items {
                            id
                            createdAt
                        }
                        nextToken
                    }
                }
            }
        }
    }
  `)
    );
    console.log("value: " + JSON.stringify(value));
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default BreakReality;
