import { API, graphqlOperation } from "aws-amplify";
import { changeAddedMeRelationship } from "../../../redux/shared/relationships";
import { removeAddBackUser } from "../../../redux/profilemain";
import { setOtherUserRelationship } from "../../../redux/shared/otheruserprofile";

import {
  createUserRelationships,
  updateUsers,
  deleteUserRelationships,
} from "../../../graphql/mutations";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CheckAddedUserQuery, GetUsersQuery } from "../../../API";
import AddNewNotification, {
  AddNewNotificationPropTypes,
} from "../../shared/notifications/operations/AddNewNotification";
import { Code3001PayloadType } from "../../shared/notifications/operations/NotificationLibrary";
import CreateCode3001Notification from "../../shared/notifications/operations/NotificationActions/CreateCode3001Notification";

const UpdateOtherUserProfile = ({ action, dispatch }) => {
  const addeduser = {
    relationship: true,
    increment: 1,
  };

  const removeduser = {
    relationship: false,
    increment: -1,
  };

  if (action === "add") {
    dispatch(setOtherUserRelationship(addeduser));
  } else if (action === "remove") {
    dispatch(setOtherUserRelationship(removeduser));
  }
};

const UpdateAddedMeUsers = ({ dispatch, index, addbackusersindex }) => {
  dispatch(changeAddedMeRelationship(index));
  if (addbackusersindex != null) {
    dispatch(removeAddBackUser(addbackusersindex));
  }
};

const UpdateAddBackUsers = ({ dispatch, index, addedmeusersindex }) => {
  if (addedmeusersindex != null) {
    dispatch(changeAddedMeRelationship(addedmeusersindex));
  }
  dispatch(removeAddBackUser(index));
};

async function AddUser({
  currentuser,
  targetuser,
  dispatch,
  existingrelationship,
}) {
  if (existingrelationship.length > 0) {
    return console.log("Already following this user");
  }

  const newrelationship = {
    senderID: currentuser.id,
    receiverID: targetuser.id,
  };

  const newcurrentuser = {
    id: currentuser.id,
    addedcount: currentuser.addedcount + 1,
  };

  const newtargetuser = {
    id: targetuser.id,
    addedmecount: targetuser.addedmecount + 1,
  };

  const notificationPayload: Code3001PayloadType = {
    ouID: currentuser.id,
  };

  try {
    await Promise.all([
      API.graphql(
        graphqlOperation(createUserRelationships, { input: newrelationship })
      ),
      API.graphql(graphqlOperation(updateUsers, { input: newcurrentuser })),
      API.graphql(graphqlOperation(updateUsers, { input: newtargetuser })),
    ]);
    CreateCode3001Notification({
      targetUserID: targetuser.id,
      code: 3001,
      payloadString: JSON.stringify(notificationPayload),
      postsID: null,
      currentUserID: currentuser.id,
    });
  } catch (error) {
    console.log(`\nError: ${JSON.stringify(error)}`);
  }

  console.log("Successfully added");
}

async function RemoveUser({
  currentuser,
  targetuser,
  dispatch,
  existingrelationship,
}) {
  // Remove targetuser from currentuser added
  // Remove currentuser from targetuser add back (if applicable)

  if (existingrelationship.length === 0) {
    return console.log("Not following this user");
  }

  const newcurrentuser = {
    id: currentuser.id,
    addedcount: currentuser.addedcount - 1,
  };

  const newtargetuser = {
    id: targetuser.id,
    addedmecount: targetuser.addedmecount - 1,
  };

  try {
    await Promise.all([
      API.graphql(
        graphqlOperation(deleteUserRelationships, {
          input: { id: existingrelationship[0].id },
        })
      ),
      API.graphql(graphqlOperation(updateUsers, { input: newcurrentuser })),
      API.graphql(graphqlOperation(updateUsers, { input: newtargetuser })),
    ]);
  } catch (error) {
    console.log(`\nError: ${error}`);
  }

  // ReplaceAdded({ dispatch: dispatch, updatedcurrentuser: updatedcurrentuser, })

  console.log("Successfully removed");
}

async function ChangeUserRelationship({
  index,
  action,
  dispatch,
  currentuserid,
  targetuserid,
  origin,
  addbackusersindex,
  addedmeusersindex,
}) {
  try {
    // Current supported origins: 'otheruserprofile', 'AddedMeUsers', 'ProfileLanding'
    // Supported actions: 'add', 'remove', 'approve', 'unrequest', 'reject'
    // FriendStatus options: true, false, 'incomingpending', 'outgoingpending', 'user', 'unauthenticated'

    // @ts-ignore
    const [existingresult, currentuserresult, targetuserresult] =
      (await Promise.all([
        API.graphql(
          graphqlOperation(`
            query CheckAddedUser {
              checkAddedUser (
                    limit: 1,
                    senderID: "${currentuserid}",
                    receiverID: { 
                        eq: "${targetuserid}"
                    }
                ) {
                    items {
                        id
                    }
                }
            }
        `)
        ) as GraphQLResult<CheckAddedUserQuery>,

        API.graphql(
          graphqlOperation(`
            query GetUsers {
                getUsers (
                    id: "${currentuserid}"
                ) {
                    id
                    cognitosub
                    addedcount
                    addedmecount
                }
            }
        `)
        ) as GraphQLResult<GetUsersQuery>,

        API.graphql(
          graphqlOperation(`
            query GetUsers {
                getUsers (
                    id: "${targetuserid}"
                ) {
                    id
                    cognitosub
                    addedcount
                    addedmecount
                }
            }
        `)
        ),
      ])) as GraphQLResult<GetUsersQuery>;

    const existingrelationship = existingresult.data.checkAddedUser.items;
    const currentuser = currentuserresult.data.getUsers;
    const targetuser = targetuserresult.data.getUsers;

    if (action === "add") {
      AddUser({
        dispatch,
        existingrelationship,
        currentuser,
        targetuser,
      });
    } else if (action === "remove") {
      RemoveUser({
        dispatch,
        existingrelationship,
        currentuser,
        targetuser,
      });
    }

    if (origin === "otheruserprofile") {
      UpdateOtherUserProfile({ dispatch, action });
    }
    /* 
    // Addback profile functionality is tempoarily disabled
    else if (origin === "AddedMeUsers") {
      // 'index' in this situation is the index of the Redux addedme users array
      UpdateAddedMeUsers({
        dispatch,
        index,
        addbackusersindex,
      });
    } else if (origin === "ProfileLanding") {
      // 'index' in this situation is the index of the Redux addback users array
      UpdateAddBackUsers({
        dispatch,
        index,
        addedmeusersindex,
      });
    }
    */
  } catch (error) {
    console.log("error: " + error);
  }
}

export default ChangeUserRelationship;
