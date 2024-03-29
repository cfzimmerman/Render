import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  CreateUsersInput,
  CreateUsersMutation,
  UpdateUsersInput,
  UpdateUsersMutation,
} from "../../../../API";
import {
  createUsers,
  updateUsers,
  deleteUsers,
} from "../../../../graphql/mutations";
import { setCognitoUser } from "../../../../redux/shared/onboarding";

async function AttemptSignup({ username, navigation, dispatch }) {
  const password = `${Math.floor(Math.random() * 100000000)}#Rr`;
  let createdUserID = null;
  let createdCognitoSub = null;

  try {
    const userObject: CreateUsersInput = {
      email: username,
      fullyauthenticated: false,
      fullyonboarded: false,
      setpassword: false,
    };

    const newUser = (await API.graphql(
      graphqlOperation(createUsers, { input: userObject })
    )) as GraphQLResult<CreateUsersMutation>;

    const newUserID = newUser.data.createUsers.id;
    createdUserID = newUserID;

    const createdUser = await Auth.signUp({
      username,
      password,
      attributes: {
        "custom:userID": newUserID,
      },
    });

    createdCognitoSub = createdUser.userSub;

    const updateUser: UpdateUsersInput = {
      id: newUserID,
      cognitosub: createdUser.userSub,
    };

    (await API.graphql(
      graphqlOperation(updateUsers, { input: updateUser })
    )) as GraphQLResult<UpdateUsersMutation>;

    const signInResponse = await Auth.signIn(username);

    dispatch(setCognitoUser(signInResponse));

    navigation.navigate("LoginCode", {
      email: username,
    });
  } catch (error) {
    // If something failed, backtrack and delete the created user
    if (createdUserID != null && createdCognitoSub === null) {
      await API.graphql(
        graphqlOperation(deleteUsers, { input: { id: createdUserID } })
      );
    }
    console.log(`Error: ${error}`);
  }
}

async function InitiateAuthFlow({ username, navigation, dispatch }) {
  try {
    const signInResponse = await Auth.signIn(username);

    dispatch(setCognitoUser(signInResponse));

    navigation.navigate("LoginCode", {
      email: username,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    AttemptSignup({ username, navigation, dispatch });
  }
}

export default InitiateAuthFlow;
