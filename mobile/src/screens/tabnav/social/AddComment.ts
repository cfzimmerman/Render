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

interface AddCommentProps {
  item: PostType;
  dispatch: DispatchType;
  usecase:
    | "gallery"
    | "otherusergallery"
    | "stories"
    | "addedfeed"
    | "publicfeed";
  index: number;
  commentText: string;
  currentuser: CurrentUserType;
}

async function AddComment({
  item,
  dispatch,
  usecase,
  index,
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
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default AddComment;
