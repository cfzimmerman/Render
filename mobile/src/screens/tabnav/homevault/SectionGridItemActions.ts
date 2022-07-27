import TransitionToFullView from "../vault/TransitionToFullView";
import {
  removeSelectedPost,
  addSelectedPost,
  activateMultiSelect,
} from "../../../redux/homevault/homevaultmain";
import * as Haptics from "expo-haptics";
import { PostType } from "../../../resources/CommonTypes";
import { DispatchType } from "../../../redux/store";

interface ShortPressActionPropsType {
  multiSelectActive: boolean;
  item: PostType;
  vaultfeeddata: PostType[];
  navigation: any;
  isSelected: boolean;
  dispatch: DispatchType;
}

export const ShortPressAction = ({
  multiSelectActive,
  item,
  vaultfeeddata,
  navigation,
  isSelected,
  dispatch,
}: ShortPressActionPropsType) => {
  if (multiSelectActive === false) {
    TransitionToFullView({
      id: item.id,
      navigation,
      data: vaultfeeddata,
      usecase: "vault",
    });
  } else {
    if (isSelected === true) {
      dispatch(removeSelectedPost(item.id));
    } else {
      dispatch(addSelectedPost(item.id));
    }
  }
};

interface LongPressActionPropsType {
  dispatch: DispatchType;
  multiSelectActive: boolean;
  item: PostType;
}

export const LongPressAction = ({
  dispatch,
  multiSelectActive,
  item,
}: LongPressActionPropsType) => {
  if (multiSelectActive === false) {
    dispatch(activateMultiSelect(item.id));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
};
