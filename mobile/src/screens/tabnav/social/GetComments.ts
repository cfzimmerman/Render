import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CommentsByCreatedDateQuery } from "../../../API";
import {
  addCommentsDataItem,
  setCommentsNextToken,
  setFetchingComments,
} from "../../../redux/social/socialmain";
import { API, graphqlOperation } from "aws-amplify";
import { CommentType } from "../../../resources/CommonTypes";

async function GetComments({ postItem, dispatch, commentsnexttoken }) {
  const commentsFetchLimit = 40;

  try {
    const commentsResult = (await API.graphql(
      graphqlOperation(`
          query CommentsByCreatedDate {
            commentsByCreatedDate (
                  postsID: "${postItem.id}",
                  limit: ${commentsFetchLimit},
                  nextToken: ${commentsnexttoken},
                  sortDirection: DESC
              ) {
                items {
                  id
                  commenttext
                  postsID
                  usersID
                  createdAt
                  Users {
                    displayname
                  }
                }
                nextToken
              }
          }
        `)
    )) as GraphQLResult<CommentsByCreatedDateQuery>;

    const commentsArray = commentsResult.data.commentsByCreatedDate.items;

    if (commentsArray.length > 0) {
      const lastItemID = commentsArray[commentsArray.length - 1].id;

      commentsArray.forEach((element) => {
        const newComment: CommentType = {
          id: element.id,
          commenttext: element.commenttext,
          postsID: element.postsID,
          usersID: element.usersID,
          createdAt: element.createdAt,
          // @ts-ignore
          displayname: element.Users.displayname,
        };
        dispatch(addCommentsDataItem(newComment));
        // Checks if we've reached the last item in the list. If so, update nextToken
        if (lastItemID === element.id) {
          dispatch(
            setCommentsNextToken(
              commentsResult.data.commentsByCreatedDate.nextToken
            )
          );
          dispatch(setFetchingComments(false));
        }
      });
    } else {
      dispatch(setFetchingComments(false));
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default GetComments;
