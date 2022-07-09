import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { GetUsersQuery } from "../../../../API";
import { setOtherUser } from "../../../../redux/explore/otheruserprofile";
import { DispatchType } from "../../../../redux/store";
import { CurrentUserType } from "../../../../resources/CommonTypes";
import GetFullUserRelationship from "../../explore/GetFullUserRelationship";
import {
  Code3001PayloadType,
  NotificationDataItem,
} from "../NotificationLibrary";
import Icons from "../../../../resources/project/Icons";

interface Code3001PropTypes {
  code: number;
  payload: string;
  dispatch: DispatchType;
  navigation: any;
  currentuser: CurrentUserType;
  createdAt: string;
}

async function Code3001({
  code,
  payload,
  createdAt,
  dispatch,
  navigation,
  currentuser,
}: Code3001PropTypes) {
  const payloadObject: Code3001PayloadType = JSON.parse(payload);

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

  const notificationObject: NotificationDataItem = {
    code,
    unread: true,
    createdAt,
    front: {
      title: "New follower",
      message: `${user.displayname} added you. Would you like to add back?`,
    },
    back: {
      rightIcon: Icons.OriginalSize.AddUser,
      rightTitle: "Visit profile",
    },
  };
}

export default Code3001;
