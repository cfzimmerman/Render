import * as FileSystem from "expo-file-system";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { differenceInDays } from "date-fns";
import { it } from "date-fns/locale";
import { PostsByDeletedDateQuery } from "../../../API";
import LSRemoveItem from "../profile/LSRemoveItem";
import { Environment } from "../../../resources/project";
import ExecutePost from "./ExecutePost";

const directoryAddress = FileSystem.documentDirectory + "LocalSync/";

async function DeleteIfExists({ address, key, dispatch, localLibrary }) {
  // address is the filepath to the piece of content
  // key is either thumbnailkey or contentkey
  const contentExists = await FileSystem.getInfoAsync(address);
  if (contentExists.exists === true) {
    LSRemoveItem({ dispatch, contentkey: key, localLibrary });
  }
}

async function CheckDeletedPosts({ userID, dispatch, localLibrary }) {
  console.log("CheckDeletedPosts: ");
  // Get deleted posts
  // If any are in local ibrary or /ContentSync, delete them
  const postsResult = (await API.graphql(
    graphqlOperation(`
          query PostsByDeletedDate {
              postsByDeletedDate (
                  usersID: "${userID}"
                  sortDirection: DESC,
                  
              ) {
                  items {
                      id
                      deleteddate
                      contentkey
                      contenttype
                      thumbnailkey
                  }
              }
          }
      `)
  )) as GraphQLResult<PostsByDeletedDateQuery>;

  const postsArray = postsResult.data.postsByDeletedDate.items;

  postsArray.forEach((item) => {
    if (item.contenttype === "video") {
      const contentAddress = directoryAddress + item.contentkey;
      const thumbnailAddress = directoryAddress + item.contentkey;

      DeleteIfExists({
        address: contentAddress,
        key: item.contentkey,
        dispatch,
        localLibrary,
      });
      DeleteIfExists({
        address: thumbnailAddress,
        key: item.thumbnailkey,
        dispatch,
        localLibrary,
      });
    } else if (item.contenttype === "image") {
      const contentAddress = directoryAddress + item.contentkey;
      DeleteIfExists({
        address: contentAddress,
        key: item.contentkey,
        dispatch,
        localLibrary,
      });
    }

    const daysToNow = differenceInDays(new Date(), new Date(item.deleteddate));

    if (daysToNow > Environment.DeletedBufferInDays) {
      ExecutePost({ postID: item.id });
    }
  });
}

export default CheckDeletedPosts;
