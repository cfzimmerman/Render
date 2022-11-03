import { deleteComments } from "../../../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { CommentType } from "../../../../global/CommonTypes";
import { exciseComment, setDeleteComment } from "../../../../redux/socialmain";
import { DispatchType } from "../../../../redux";

interface DeleteCommentPropsType {
  commentItem: CommentType;
  dispatch: DispatchType;
  commentsdata: CommentType[];
}

async function DeleteComment({ commentID, dispatch, commentsdata }) {
  try {
    await API.graphql(
      graphqlOperation(deleteComments, { input: { id: commentID } })
    );
    const targetIndex = commentsdata.findIndex(
      (item: CommentType) => item.id === commentID
    );
    if (targetIndex > -1) {
      dispatch(exciseComment(targetIndex));
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
  dispatch(setDeleteComment({ active: false, commentID: null }));
}

export default DeleteComment;
