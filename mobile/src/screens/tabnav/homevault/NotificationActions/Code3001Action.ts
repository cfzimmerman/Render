import GetFullUserRelationship from "../../explore/GetFullUserRelationship";
import { setOtherUser } from "../../../../redux/explore/otheruserprofile";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { GetUsersQuery } from "../../../../API";
import { Storage, API, graphqlOperation } from "aws-amplify";

async function EnterProfileFromNotifications({
  ouID,
  dispatch,
  navigation,
  currentuser,
  user,
}) {
  GetFullUserRelationship({
    targetID: ouID,
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

async function Code3001Action({ payloadObject }) {
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
}
