import { API, graphqlOperation } from "aws-amplify";
import { UpdateUsersInput } from "../../../API";
import { updateUsers } from "../../../graphql/mutations";
import { CurrentUserType } from "../../../resources/CommonTypes";

interface InputTypes {
  navigation: any;
  currentUser: CurrentUserType;
}

async function ExitGetStarted({ navigation, currentUser }: InputTypes) {
  try {
    navigation.goBack();

    if (
      typeof currentUser.fullyonboarded != "undefined" &&
      currentUser.fullyonboarded != true
    ) {
      const userUpdate: UpdateUsersInput = {
        id: currentUser.id,
        fullyonboarded: true,
      };
      API.graphql(graphqlOperation(updateUsers, { input: userUpdate }));
    }
  } catch (error) {
    console.log(error);
  }
}

export default ExitGetStarted;
