import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { PostType } from "../../../../resources/CommonTypes";
import { Environment, GlobalStyles } from "../../../../resources/project";
import ExternalVaultTileInfo from "../../vault/ExternalVaultTileInfo";

interface InputTypes {
  item: PostType;
  index: number;
  navigation: any;
}

//   navigation.navigate("VaultPostFullView", { startindex, usecase });

const HVPostResultTile = ({ item, index, navigation }: InputTypes) => {
  return (
    <TouchableOpacity
      style={[GlobalStyles.shadow, styles.imageWrapper]}
      onPress={() =>
        navigation.navigate("VaultPostFullView", {
          startindex: index,
          usecase: "HVGameSearch",
        })
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    height: Environment.HalfBar,
    width: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
    marginBottom: 12,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  image: {
    height: Environment.HalfBar,
    width: Environment.HalfBar,
    borderRadius: Environment.StandardRadius,
  },
});

export default HVPostResultTile;
