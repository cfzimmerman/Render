import TransitionToFullView from "./TransitionToFullView";
import {
  removeSelectedPost,
  addSelectedPost,
  activateMultiSelect,
} from "../../../redux/homevaultmain";
import * as Haptics from "expo-haptics";
import { PostType } from "../../../global/CommonTypes";
import { DispatchType } from "../../../redux";

// This file contains shared helper functions for VaultSectionHeader.tsx and VaultSectionItem.tsx

interface ShortPressActionPropsType {
  multiSelectActive: boolean;
  postID: string;
  vaultfeeddata: PostType[] | null;
  navigation: any;
  isSelected: boolean;
  dispatch: DispatchType;
  selectedPostsLength: number;
  origin: "vault" | "HVGameSearch";
  index: number | null;
}

export const ShortPressAction = ({
  multiSelectActive,
  vaultfeeddata,
  navigation,
  isSelected,
  postID,
  dispatch,
  selectedPostsLength,
  origin,
  index,
}: ShortPressActionPropsType) => {
  if (multiSelectActive === false) {
    if (origin === "vault") {
      TransitionToFullView({
        id: postID,
        navigation,
        data: vaultfeeddata,
        usecase: origin,
      });
    } else if (origin === "HVGameSearch") {
      navigation.navigate("VaultPostFullView", {
        startindex: index,
        usecase: "HVGameSearch",
      });
    }
  } else {
    if (isSelected === true) {
      dispatch(removeSelectedPost(postID));
    } else if (isSelected === false) {
      dispatch(addSelectedPost(postID));
    }
  }
};

interface LongPressActionPropsType {
  dispatch: DispatchType;
  multiSelectActive: boolean;
  postID: string;
}

export const LongPressAction = ({
  dispatch,
  multiSelectActive,
  postID,
}: LongPressActionPropsType) => {
  if (multiSelectActive === false) {
    dispatch(activateMultiSelect(postID));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
};

interface FindIsSelectedPropsType {
  postID: string;
  multiSelectActive: boolean;
  selectedPosts: string[];
}

export const FindIsSelected = ({
  postID,
  multiSelectActive,
  selectedPosts,
}: FindIsSelectedPropsType) => {
  // Only performing the .includes operation if multi select is active cuts out a huge number of unnecessary array operations
  if (multiSelectActive === false) {
    return false;
  } else {
    return selectedPosts.includes(postID);
  }
};
