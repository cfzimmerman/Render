import { API, graphqlOperation } from "aws-amplify";
import { UpdateUsersInput } from "../../../API";
import { updateUsers } from "../../../graphql/mutations";
import { setUserOnboarded } from "../../../../redux/profilemain";
import { DispatchType } from "../../../../redux";
import { CurrentUserType } from "../../../../global/CommonTypes";

interface InputTypes {
  navigation: any;
  currentUser: CurrentUserType;
  dispatch: DispatchType;
}

async function ExitGetStarted({
  navigation,
  currentUser,
  dispatch,
}: InputTypes) {
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
      dispatch(setUserOnboarded());
    }
  } catch (error) {
    console.log(error);
  }
}

export default ExitGetStarted;
