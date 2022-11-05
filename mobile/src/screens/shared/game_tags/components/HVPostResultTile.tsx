import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { DispatchType } from "../../../../redux";
import { PostType } from "../../../../global/CommonTypes";
import { Colors, Environment, GlobalStyles, Icons } from "../../../../global";
import ExternalVaultTileInfo from "../../../home_vault/components/ExternalVaultTileInfo";
import {
  FindIsSelected,
  LongPressAction,
  ShortPressAction,
} from "../../../home_vault/operations/SectionGridItemActions";

interface InputTypes {
  item: PostType;
  index: number;
  navigation: any;
  selectedPosts: string[];
  multiSelectActive: boolean;
  dispatch: DispatchType;
}

const HVPostResultTile = ({
  item,
  index,
  navigation,
  selectedPosts,
  multiSelectActive,
  dispatch,
}: InputTypes) => {
  const isSelected = FindIsSelected({
    postID: item.id,
    multiSelectActive,
    selectedPosts,
  });

  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.imageWrapper]}
      onPress={() => {
        ShortPressAction({
          multiSelectActive,
          postID: item.id,
          vaultfeeddata: null,
          navigation,
          isSelected,
          dispatch,
          selectedPostsLength: selectedPosts.length,
          origin: "HVGameSearch",
          index,
        });
      }}
      onLongPress={() =>
        LongPressAction({ dispatch, multiSelectActive, postID: item.id })
      }
    >
      <Image
        source={{
          uri:
            item.contenttype === "image" ? item.signedurl : item.thumbnailurl,
        }}
        style={styles.image}
      />
      <ExternalVaultTileInfo item={item} origin="sectionitem" />
      <View
        style={[
          styles.checkedTileBackground,
          { opacity: isSelected ? 0.5 : 0 },
        ]}
      >
        <Icons.OriginalSize.Checkmark
          style={styles.checkmarkStyle}
          stroke={Colors.Primary}
          height={3 * Environment.IconSize}
          width={3 * Environment.IconSize}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    height: Environment.HalfBar,
    width: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
    marginBottom: Environment.StandardPadding,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  image: {
    height: Environment.HalfBar,
    width: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
  },
  checkedTileBackground: {
    backgroundColor: Colors.AccentOn,
    height: Environment.HalfBar,
    width: Environment.HalfBar,
    position: "absolute",
    borderRadius: Environment.StandardRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkStyle: {
    opacity: 1,
  },
});

export default HVPostResultTile;
