import GetFullUserRelationship from "../../../../explore/operations/GetFullUserRelationship";
import { setOtherUser } from "../../../../../redux/shared/otheruserprofile";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { GetUsersQuery } from "../../../../API";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { Code3001PayloadType } from "../NotificationLibrary";
import { DispatchType } from "../../../../../redux";
import { CurrentUserType } from "../../../../../global/CommonTypes";

async function EnterProfileFromNotifications({
  dispatch,
  navigation,
  currentuser,
  user,
}) {
  GetFullUserRelationship({
    targetID: user.id,
    dispatch,
    currentuser,
  });

  const pfpurl = await Storage.get(user.pfp, { expires: 86400 });

  const otheruser = {
    id: user.id,
    displayname: user.displayname,
    gamertag: user.gamertag,
    cognitosub: user.cognitosub,
    pfpurl: pfpurl,
    addedmecount: user.addedmecount,
  };

  dispatch(setOtherUser(otheruser));

  navigation.navigate("Explore", {
    screen: "OtherUserProfileLanding",
    initial: false,
  });
}

interface Code3001ActionPropsType {
  payloadObject: Code3001PayloadType;
  dispatch: DispatchType;
  navigation: any;
  currentuser: CurrentUserType;
}

async function Code3001Action({
  payloadObject,
  dispatch,
  navigation,
  currentuser,
}: Code3001ActionPropsType) {
  try {
    const {
      data: { getUsers: user },
    } = (await API.graphql(
      graphqlOperation(`
              query GetUsers {
                  getUsers (
                      id: "${payloadObject.ouID}"
                  ) {
                      id
                      displayname
                      gamertag
                      cognitosub
                      pfp
                      addedmecount
                  }
              }
            `)
    )) as GraphQLResult<GetUsersQuery>;

    EnterProfileFromNotifications({ dispatch, navigation, currentuser, user });
  } catch (error) {
    console.log("error: " + error);
  }
}

export default Code3001Action;
