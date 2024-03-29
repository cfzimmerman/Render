import { DispatchType } from "../../../../redux";
import {
  updateHeaderGame,
  updateNonHeaderGame,
} from "../../../../redux/shared/vaultpostdata";
import { PostHeaderType, PostType } from "../../../../global/CommonTypes";
import GetDate from "../../general/operations/GetDate";
import { GameCoverTileType } from "../components/GameCoverTile";

interface InputTypes {
  item: GameCoverTileType;
  vaultPostData: PostHeaderType[];
  vaultFeedData: PostType[];
  dispatch: DispatchType;
  postID: string;
}

export interface UpdateNonHeaderGameInput {
  feedIndex: number;
  sectionIndex: number;
  sectionDataIndex: number;
  gamesID: string;
  coverID: string;
  title: string;
}

export interface UpdateHeaderGameInput {
  feedIndex: number;
  sectionIndex: number;
  gamesID: string;
  coverID: string;
  title: string;
}

async function ModifyPostGame({
  item,
  vaultPostData,
  vaultFeedData,
  dispatch,
  postID,
}: InputTypes) {
  try {
    const feedIndex = vaultFeedData.findIndex(
      (element: PostType) => element.id === postID
    );
    const post: PostType = vaultFeedData[feedIndex];
    const headerTitle = GetDate(post.contentdate);
    const sectionIndex = vaultPostData.findIndex(
      (element: PostHeaderType) => element.header.title === headerTitle
    );

    if (post.header != true) {
      const sectionDataIndex = vaultPostData[sectionIndex].data.findIndex(
        (element: PostType) => element.id === postID
      );

      const updateNonHG: UpdateNonHeaderGameInput = {
        feedIndex,
        sectionIndex,
        sectionDataIndex,
        gamesID: item.id,
        coverID: item.coverID,
        title: item.title,
      };

      dispatch(updateNonHeaderGame(updateNonHG));
    } else {
      const updateHG: UpdateHeaderGameInput = {
        feedIndex,
        sectionIndex,
        gamesID: item.id,
        coverID: item.coverID,
        title: item.title,
      };
      dispatch(updateHeaderGame(updateHG));
    }
  } catch (error) {
    console.log(error);
    throw new Error("ModifyPostGame Error: " + error);
  }
}

export default ModifyPostGame;
