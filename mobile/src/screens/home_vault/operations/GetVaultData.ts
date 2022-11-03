import * as FileSystem from "expo-file-system";
import { setFetchingData } from "../../../redux/shared/vaultpostdata";
import { Environment } from "../../../global";
import CreateNewMonth from "./CreateNewMonth";
import AddToCurrentMonth from "./AddToCurrentMonth";
import AddToFullviewList from "./AddToFullViewList";
import ChangeNextToken from "./ChangeNextToken";

import { Storage, API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { filteredPostsByContentDate } from "../../../graphql/customqueries";
import { PostsByContentDateQuery } from "../../../API";
import { LSLibraryItemType } from "../../../redux/shared/localsync";
import GetDate from "../../shared/general/operations/GetDate";

import { DispatchType } from "../../../redux";
import { PostHeaderType } from "../../../global/CommonTypes";
import LSAddItem from "../../shared/local_sync/operations/LSAddItem";

interface GetVaultDataProps {
  dispatch: DispatchType;
  vaultpostdata: PostHeaderType[];
  limit: number | undefined;
  cognitosub: string;
  nextToken: string | null;
  syncPreference: "All" | "Partial" | "None";
  localLibrary: {} | Record<string, LSLibraryItemType>;
}

interface GetPostsReturnType {
  id: string | null;
  contenttype?: string | null;
  aspectratio?: number | null;
  contentkey?: string | null;
  publicpost?: boolean | null;
  cognitosub: string | null;
  contentdate?: string | null;
  thumbnailkey?: string | null;
  posttext?: string | null;
  publicpostdate?: string | null;
  createdAt: string | null;
  usersID: string | null;
  updatedAt: string | null;
  Games?: null | {
    id: string;
    coverID?: string;
    title?: string;
  };
}

export interface CreateNewMonthPropsType {
  dispatch: DispatchType;
  item: GetPostsReturnType;
  signedurl: string | null;
  thumbnailurl: string | null;
}

export interface AddToFullViewListPropsType {
  dispatch: DispatchType;
  item: GetPostsReturnType;
  signedurl: string | null;
  thumbnailurl: string | null;
  header: boolean | null;
}

export interface AddToCurrentMonthPropsType {
  dispatch: DispatchType;
  item: GetPostsReturnType;
  signedurl: string | null;
  thumbnailurl: string | null;
}

export interface ChangeNextTokenPropsType {
  dispatch: DispatchType;
  nextToken: string | null;
}

async function GetVaultData({
  dispatch,
  vaultpostdata,
  limit,
  cognitosub,
  nextToken,
  syncPreference,
  localLibrary,
}: GetVaultDataProps) {
  if (nextToken === null && vaultpostdata.length > 0) {
    console.log("Caught");
    return;
  } else {
    // console.log("GetVaultData")
    const loadlimit = [Environment.GetVaultDataLimit];

    if (typeof limit != "undefined") {
      loadlimit.unshift(limit);
      loadlimit.pop();
    }

    const result = (await API.graphql(
      graphqlOperation(filteredPostsByContentDate, {
        limit: loadlimit[0],
        cognitosub: cognitosub,
        sortDirection: "DESC",
        nextToken: nextToken,
      })
    )) as GraphQLResult<PostsByContentDateQuery>;
    const userposts = result.data.postsByContentDate.items;
    const token = result.data.postsByContentDate.nextToken;

    const activemonth = ["unspecified"];

    if (
      vaultpostdata.length > 0 &&
      typeof vaultpostdata[vaultpostdata.length - 1].header.title != "undefined"
    ) {
      activemonth.unshift(vaultpostdata[vaultpostdata.length - 1].header.title);
      activemonth.pop();
    } else {
      activemonth.unshift("empty");
      activemonth.pop();
    }

    userposts.forEach((item) => {
      const simpleDate = GetDate(item.contentdate);

      // This if - else chain actually started pretty small (def isn't anymore).
      // However, refactoring so that the "video" | "image" if-else condition sits on top only brought the total number of lines down by 28 (183 to 155 for that specific section). It also introduced a bug, so I'll keep this structure until we can optimize vault fetch more completely.
      // UPDATE: When this is fixed, the best alternative seems to be the structure used in '../homevault/GameTags/HVGetGamePosts.ts

      if (
        activemonth[0] === "empty" ||
        activemonth[0] != GetDate(item.contentdate)
      ) {
        // Add new month to section list
        async function GetUrl({ item }: { item: GetPostsReturnType }) {
          if (item.contenttype === "video") {
            const thumbnailAddress =
              FileSystem.documentDirectory + "LocalSync/" + item.thumbnailkey;
            const contentExists = await FileSystem.getInfoAsync(
              thumbnailAddress
            );
            if (contentExists.exists === true) {
              const signedurl = null;
              const thumbnailurl = thumbnailAddress;

              AddToFullviewList({
                dispatch,
                item,
                signedurl,
                thumbnailurl,
                header: true,
              });
              CreateNewMonth({ dispatch, item, signedurl, thumbnailurl });
            } else {
              const signedurl = null;
              const thumbnailurl = await Storage.get(item.thumbnailkey, {
                expires: 86400,
              });

              AddToFullviewList({
                dispatch,
                item,
                signedurl,
                thumbnailurl,
                header: true,
              });
              CreateNewMonth({ dispatch, item, signedurl, thumbnailurl });

              if (syncPreference === "All" || syncPreference === "Partial") {
                // Add to local storage so it can be retrieved next time (if that's what the user wants)
                LSAddItem({
                  contentkey: item.thumbnailkey,
                  signedurl: thumbnailurl,
                  localLibrary,
                  dispatch,
                });
              }
            }
          } else {
            const contentAddress =
              FileSystem.documentDirectory + "LocalSync/" + item.contentkey;
            const contentExists = await FileSystem.getInfoAsync(contentAddress);

            if (contentExists.exists === true) {
              const signedurl = contentAddress;
              const thumbnailurl = null;

              AddToFullviewList({
                dispatch,
                item,
                signedurl,
                thumbnailurl,
                header: true,
              });
              CreateNewMonth({ dispatch, item, signedurl, thumbnailurl });
            } else {
              const signedurl = await Storage.get(item.contentkey, {
                expires: 86400,
              });
              const thumbnailurl = null;

              AddToFullviewList({
                dispatch,
                item,
                signedurl,
                thumbnailurl,
                header: true,
              });
              CreateNewMonth({ dispatch, item, signedurl, thumbnailurl });

              if (syncPreference === "All" || syncPreference === "Partial") {
                LSAddItem({
                  contentkey: item.contentkey,
                  signedurl,
                  localLibrary,
                  dispatch,
                });
              }
            }
          }
        }

        GetUrl({ item });
        activemonth.push(simpleDate);
        activemonth.shift();
      } else {
        // Add data to current month

        async function GetUrl({ item }) {
          if (item.contenttype === "video") {
            const thumbnailAddress =
              FileSystem.documentDirectory + "LocalSync/" + item.thumbnailkey;
            const contentExists = await FileSystem.getInfoAsync(
              thumbnailAddress
            );

            if (contentExists.exists === true) {
              const signedurl = null;
              const thumbnailurl = thumbnailAddress;
              AddToFullviewList({
                dispatch,
                item,
                signedurl,
                thumbnailurl,
                header: false,
              });
              AddToCurrentMonth({ dispatch, item, signedurl, thumbnailurl });
            } else {
              const signedurl = null;
              const thumbnailurl = await Storage.get(item.thumbnailkey, {
                expires: 86400,
              });
              AddToFullviewList({
                dispatch,
                item,
                signedurl,
                thumbnailurl,
                header: false,
              });
              AddToCurrentMonth({ dispatch, item, signedurl, thumbnailurl });

              if (syncPreference === "All" || syncPreference === "Partial") {
                LSAddItem({
                  contentkey: item.thumbnailkey,
                  signedurl: thumbnailurl,
                  localLibrary,
                  dispatch,
                });
              }
            }
          } else {
            const contentAddress =
              FileSystem.documentDirectory + "LocalSync/" + item.contentkey;
            const contentExists = await FileSystem.getInfoAsync(contentAddress);

            if (contentExists.exists === true) {
              const signedurl = contentAddress;
              const thumbnailurl = null;
              AddToFullviewList({
                dispatch,
                item,
                signedurl,
                thumbnailurl,
                header: false,
              });
              AddToCurrentMonth({ dispatch, item, signedurl, thumbnailurl });
            } else {
              const signedurl = await Storage.get(item.contentkey, {
                expires: 86400,
              });
              const thumbnailurl = null;
              AddToFullviewList({
                dispatch,
                item,
                signedurl,
                thumbnailurl,
                header: false,
              });
              AddToCurrentMonth({ dispatch, item, signedurl, thumbnailurl });

              if (syncPreference === "All" || syncPreference === "Partial") {
                LSAddItem({
                  contentkey: item.contentkey,
                  signedurl: signedurl,
                  localLibrary,
                  dispatch,
                });
              }
            }
          }
        }
        GetUrl({ item });
      }

      if (
        typeof userposts[loadlimit[0] - 1] === "undefined" ||
        item.id === userposts[loadlimit[0] - 1].id
      ) {
        ChangeNextToken({ dispatch, nextToken: token });
        dispatch(setFetchingData(false));
      }
    });
  }
}

export default GetVaultData;
