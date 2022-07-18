import { DispatchType } from "../../../redux/store";
import { graphqlOperation, API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CreateCommentsMutation } from "../../../API";
import { createComments } from "../../../graphql/mutations";
import { injectComment } from "../../../redux/social/socialmain";
import {
  CurrentUserType,
  PostHeaderType,
  PostType,
} from "../../../resources/CommonTypes";
import { VaultPostFullViewUsecaseTypes } from "../vault/VaultPostFullView";
import CreateCode3003Notification from "../homevault/NotificationActions/CreateCode3003Notification";
import CreateCode3002Notification from "../homevault/NotificationActions/CreateCode3002Notification";

interface AddCommentProps {
  item: PostType;
  dispatch: DispatchType;
  commentText: string;
  currentuser: CurrentUserType;
}

async function AddComment({
  item,
  dispatch,
  commentText,
  currentuser,
}: AddCommentProps) {
  if (commentText.length < 1) {
    return;
  }

  interface NewCommentType {
    commenttext: string;
    postsID: string;
    usersID: string;
  }

  const newComment: NewCommentType = {
    commenttext: commentText,
    postsID: item.id,
    usersID: currentuser.id,
  };

  try {
    const { data } = (await API.graphql(
      graphqlOperation(createComments, { input: newComment })
    )) as GraphQLResult<CreateCommentsMutation>;
    const commentObject = {
      id: data.createComments.id,
      commenttext: data.createComments.commenttext,
      postsID: data.createComments.postsID,
      usersID: data.createComments.usersID,
      createdAt: data.createComments.createdAt,
      displayname: data.createComments.Users.displayname,
    };
    dispatch(injectComment(commentObject));
    CreateCode3002Notification({
      postID: item.id,
      currentuser,
      postUserID: item.userid,
    });
    CreateCode3003Notification({
      postID: item.id,
      lastCommentUserID: currentuser.id,
    });
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default AddComment;
