import TransitionToFullView from "../vault/TransitionToFullView";
import {
  removeSelectedPost,
  addSelectedPost,
  activateMultiSelect,
} from "../../../redux/homevault/homevaultmain";
import * as Haptics from "expo-haptics";
import { PostType } from "../../../resources/CommonTypes";
import { DispatchType } from "../../../redux/store";

// This file contains shared helper functions for VaultSectionHeader.tsx and VaultSectionItem.tsx

interface ShortPressActionPropsType {
  multiSelectActive: boolean;
  postID: string;
  vaultfeeddata: PostType[];
  navigation: any;
  isSelected: boolean;
  dispatch: DispatchType;
}

export const ShortPressAction = ({
  multiSelectActive,
  vaultfeeddata,
  navigation,
  isSelected,
  postID,
  dispatch,
}: ShortPressActionPropsType) => {
  if (multiSelectActive === false) {
    TransitionToFullView({
      id: postID,
      navigation,
      data: vaultfeeddata,
      usecase: "vault",
    });
  } else {
    if (isSelected === true) {
      dispatch(removeSelectedPost(postID));
    } else {
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
