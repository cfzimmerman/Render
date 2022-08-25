import { API, graphqlOperation } from "aws-amplify";
import { compareAsc } from "date-fns";
import ModifyVaultData from "./ModifyVaultData";
import { updatePosts } from "../../../graphql/mutations";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { GetPostsQuery, UpdatePostsInput } from "../../../API";
import { PostHeaderType, PostType } from "../../../resources/CommonTypes";
import { DispatchType } from "../../../redux/store";

interface InputTypes {
  date: Date;
  navigation: any;
  dispatch: DispatchType;
  item: PostType;
  vaultfeeddata: PostType[];
  vaultpostdata: PostHeaderType[];
  vaultnexttoken: string | null;
}

const GetCorrectDate = ({ inputDate }: { inputDate: Date }): string => {
  // There's no way users have content from before the Harvard Mark 1 computer. This date is currently used as a minimum in a composite posts query key
  const floorDate = "1944-08-07T05:00:00.000Z";
  const comparison = compareAsc(inputDate, new Date(floorDate));

  if (comparison === 1) {
    return inputDate.toISOString();
  } else {
    return floorDate;
  }
};

async function ChangeVaultPostDate({
  date,
  navigation,
  dispatch,
  item,
  vaultfeeddata,
  vaultpostdata,
  vaultnexttoken,
}: InputTypes) {
  const newContentDate = GetCorrectDate({ inputDate: date });

  try {
    const updatedpost: UpdatePostsInput = {
      id: item.id,
      contentdate: newContentDate,
      gamesID: item.gamesID,
    };

    await API.graphql(graphqlOperation(updatePosts, { input: updatedpost }));
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  try {
    ModifyVaultData({
      action: "remove",
      vaultfeeddata,
      vaultpostdata,
      post: item,
      dispatch,
      vaultnexttoken,
      newPostID: item.id,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  const post: PostType = {
    id: item.id,
    contenttype: item.contenttype,
    contentkey: item.contentkey,
    publicpost: item.publicpost,
    posttext: item.posttext,
    contentdate: newContentDate,
    signedurl: item.signedurl,
    aspectratio: item.aspectratio,
    thumbnailurl: item.thumbnailurl,
    gamesID: item.gamesID,
    title: item.title,
    coverID: item.coverID,
  };

  try {
    ModifyVaultData({
      action: "add",
      vaultfeeddata,
      vaultpostdata,
      post,
      dispatch,
      vaultnexttoken,
      newPostID: item.id,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  navigation.navigate("TabNav", { screen: "HomeVaultLanding" });
}

export default ChangeVaultPostDate;
