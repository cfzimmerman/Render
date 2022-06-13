import { format } from "date-fns";

import { setFetchingData } from "../../../redux/vault/vaultpostdata";
import { Environment } from "../../../resources/project";
import CreateNewMonth from "./CreateNewMonth";
import AddToCurrentMonth from "./AddToCurrentMonth";
import AddToFullviewList from "./AddToFullViewList";
import ChangeNextToken from "./ChangeNextToken";

import { Storage, API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { filteredPostsByContentDate } from "../../../graphql/customqueries";
import { PostsByContentDateQuery } from "../../../API";

import { DispatchType } from "../../../redux/store";
import { PostHeaderType } from "../../../resources/CommonTypes";

const GetDate = (contentdate: string): string => {
  const awsdate = new Date(contentdate);
  const simpledate = format(awsdate, "MMMM yyyy");
  return simpledate;
};

// Eliminate GetUserInfo element
// Error check: [Unhandled promise rejection: TypeError: undefined is not an object (evaluating 'vaultpostdata[vaultpostdata.length - 1].data.length')]
// If token === null and length of vaultpostdata > 0, return

interface GetVaultDataProps {
  dispatch: DispatchType;
  vaultpostdata: PostHeaderType[];
  limit: number | undefined;
  cognitosub: string;
  nextToken: string | null;
}

interface GetPostsReturnType {
  id: string | null;
  contenttype: string | null;
  aspectratio: number | null;
  contentkey: string | null;
  publicpost: boolean | null;
  cognitosub: string | null;
  contentdate: string | null;
  thumbnailkey: string | null;
  posttext: string | null;
  publicpostdate: string | null;
  createdAt: string | null;
  usersID: string | null;
  updatedAt: string | null;
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

      if (
        activemonth[0] === "empty" ||
        activemonth[0] != GetDate(item.contentdate)
      ) {
        // Add new month to section list
        async function GetUrl({ item }) {
          if (item.contenttype === "video") {
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
          }
        }

        GetUrl({ item });
        activemonth.push(simpleDate);
        activemonth.shift();
      } else {
        // Add data to current month

        async function GetUrl({ item }) {
          if (item.contenttype === "video") {
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
